import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  BatchAuctionBid,
  Auction,
  PropsWithAuction,
  BatchAuction,
} from "@axis-finance/types";
import { BlockExplorerLink } from "components/blockexplorer-link";
import { Button, Card, Chip, DataTable, Text } from "@repo/ui";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { TransactionDialog } from "modules/transaction/transaction-dialog";
import { LoadingIndicator } from "modules/app/loading-indicator";
import React from "react";
import { useAuction } from "./hooks/use-auction";
import { getAuctionHouse } from "utils/contracts";
import { useBidIndex } from "./hooks/use-bid-index";
import { format } from "date-fns";
import { useStorageBids } from "state/bids/handlers";
import { CSVDownloader } from "components/csv-downloader";
import { arrayToCSV } from "utils/csv";
import { PriceCell } from "./cells/PriceCell";
import { AmountInCell } from "./cells/AmountInCell";

export const bidListColumnHelper = createColumnHelper<
  BatchAuctionBid & { auction: Auction }
>();

export const timestampCol = bidListColumnHelper.accessor("blockTimestamp", {
  header: "Date",
  enableSorting: true,
  cell: (info) => {
    // Convert to Date
    const date = new Date(Number(info.getValue()) * 1000);

    // Format to YYYY.MM.DD
    const dateString = format(date, "yyyy.MM.dd");
    const timeString = format(date, "HH:mm z");

    return (
      <div className="flex flex-col items-start">
        <Text size="sm">{dateString}</Text>
        <Text size="xs" color="secondary">
          {timeString}
        </Text>
      </div>
    );
  },
});
const priceCol = bidListColumnHelper.accessor("submittedPrice", {
  header: "Bid Price",
  enableSorting: true,

  cell: (info) => {
    return (
      <PriceCell bid={info.row.original} value={Number(info.getValue())} />
    );
  },
});

export const amountInCol = bidListColumnHelper.accessor("amountIn", {
  header: "Amount In",
  enableSorting: true,
  cell: (info) => (
    <AmountInCell bid={info.row.original} value={+info.getValue()} />
  ),
});
export const bidderCol = bidListColumnHelper.accessor("bidder", {
  header: "Bidder",
  enableSorting: true,
  cell: (info) => {
    // Define the outcome or status of the bid
    const bid = info.row.original;
    const bidStatus = bid.status;
    const bidOutcome = bid.outcome;
    const amountOut = bid.settledAmountOut;
    const isRefunded = bidStatus === "claimed" && !amountOut;
    const status = isRefunded ? "refunded" : bidOutcome;
    const statusColour =
      status === "won" || status === "won - partial fill"
        ? "text-green-500"
        : "text-red-500";
    const cancelledBid =
      !bid.rawSubmittedPrice && Number(bid.settledAmountInRefunded);

    return (
      <div className="flex flex-col">
        <BlockExplorerLink
          chainId={info.row.original.auction.chainId}
          address={info.getValue()}
          icon={true}
          trim
        />
        {!cancelledBid && (
          <Text size="xs" className={statusColour}>
            {status}
          </Text>
        )}
      </div>
    );
  },
});

const cols = [timestampCol, priceCol, amountInCol, bidderCol];

const screens = {
  idle: {
    title: "Refund Bid",
    Component: () => (
      <div className="text-center">
        Are you sure you want to refund this bid?
      </div>
    ),
  },
  success: {
    title: "Transaction Confirmed",
    Component: () => <div className="text-center">Bid refunded!</div>,
  },
};

type BidListProps = PropsWithAuction & {
  address?: `0x${string}`;
};

export function BidList(props: BidListProps) {
  const { address } = useAccount();

  const userBids = useStorageBids({
    auctionId: props.auction.id,
    address,
  });

  const auction = props.auction as BatchAuction;

  const auctionHouse = getAuctionHouse(props.auction);
  const encryptedBids = auction?.bids ?? [];

  const { refetch: refetchAuction } = useAuction(
    props.auction.chainId,
    props.auction.lotId,
  );

  const refund = useWriteContract();
  const refundReceipt = useWaitForTransactionReceipt({ hash: refund.data });
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [bidToRefund, setBidToRefund] = React.useState<BatchAuctionBid>();
  const [onlyUserBids, setOnlyUserBids] = React.useState(false);
  const { index: bidIndex } = useBidIndex(
    props.auction,
    BigInt(bidToRefund?.bidId ?? -1),
  );

  const mappedBids = React.useMemo(
    () =>
      encryptedBids
        .filter(
          (b) =>
            !onlyUserBids || address?.toLowerCase() === b.bidder.toLowerCase(),
        )
        .map((bid) => {
          //Checks if its a user bid and in local storage
          const storedBid =
            userBids.find(
              (storageBid) =>
                storageBid.bidId === bid.bidId &&
                bid.bidder.toLowerCase() === address?.toLowerCase(),
            ) ?? {};

          return {
            ...bid,
            ...storedBid,
            auction: props.auction,
          };
        }) ?? [],
    [props.auction, address, onlyUserBids],
  );

  const isLoading = refund.isPending || refundReceipt.isLoading;

  const handleRefund = (bidId?: string) => {
    if (bidId === undefined || bidIndex === undefined)
      throw new Error("Unable to get bidId for refund");

    refund.writeContract({
      abi: auctionHouse.abi,
      address: auctionHouse.address,
      functionName: "refundBid",
      args: [BigInt(props.auction.lotId), BigInt(bidId), BigInt(bidIndex)],
    });
  };

  // Add a refund button to the columns
  const columns = React.useMemo(
    () => [
      ...cols,
      bidListColumnHelper.display({
        id: "actions",
        cell: (info) => {
          const bid = info.row.original;
          const isLive = props.auction.status === "live";
          if (!address || !isLive) return;
          if (bid.bidder.toLowerCase() !== address.toLowerCase()) return;
          if (bid.status === "claimed" && !bid.settledAmountOut) return;
          // Can refund if the auction is live, other "refunds" are handled by claim bids after the auction ends

          const isCurrentBid = bidToRefund?.bidId === bid.bidId;

          if (isLive) {
            return (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setBidToRefund(bid);
                  setDialogOpen(true);
                }}
              >
                {isLoading && isCurrentBid ? (
                  <div className="flex items-center gap-x-1">
                    <p>Waiting</p>
                    <LoadingIndicator className="size-4 fill-black" />
                  </div>
                ) : (
                  "Refund"
                )}
              </Button>
            );
          }
        },
      }),
    ],
    [props.auction, address],
  );

  React.useEffect(() => {
    if (refund.isSuccess) {
      refetchAuction();
    }
  }, [refund.isSuccess]);

  //Format bids for CSV download
  const [headers, body] = React.useMemo(() => {
    const values = auction.bids.map((b) => ({
      date: b.date,
      amountIn: b.amountIn,
      settledAmountOut: b.settledAmountOut,
      submittedPrice: b.submittedPrice,
      bidder: b.bidder,
    }));

    return arrayToCSV(values ?? []);
  }, [auction]);

  return (
    <Card
      title={"Bid History"}
      headerRightElement={
        <div className="flex gap-x-3">
          <Chip
            variant={onlyUserBids ? "active" : "default"}
            className="cursor-pointer"
            onClick={() => setOnlyUserBids((prev) => !prev)}
          >
            {onlyUserBids ? "All" : "My"} Bids
          </Chip>
          <CSVDownloader
            tooltip="Download this bid history in CSV format."
            filename={`bids-${auction.auctionType}-${auction.id}`}
            headers={headers}
            data={body}
          />
        </div>
      }
    >
      <DataTable
        emptyText={
          props.auction.status == "created" || props.auction.status == "live"
            ? "No bids yet"
            : onlyUserBids
              ? "No bids from this address"
              : "No bids received"
        }
        columns={columns as ColumnDef<BatchAuctionBid>[]}
        data={mappedBids}
      />

      <TransactionDialog
        signatureMutation={refund}
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) refund.reset();
        }}
        onConfirm={() => handleRefund(bidToRefund?.bidId)}
        mutation={refundReceipt}
        chainId={props.auction.chainId}
        hash={refund.data}
        error={refundReceipt.error}
        disabled={isLoading}
        screens={screens}
      />
    </Card>
  );
}
