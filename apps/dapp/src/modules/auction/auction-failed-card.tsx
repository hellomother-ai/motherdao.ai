import { useState } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { ArrowRightIcon } from "lucide-react";

import { Badge, Button, Card, Metric, Text } from "@repo/ui";
import type { Auction, PropsWithAuction } from "@axis-finance/types";
import { RequiresChain } from "components/requires-chain";
import { TransactionDialog } from "modules/transaction/transaction-dialog";
import { shorten } from "utils/number";
import { useClaimBids } from "modules/auction/hooks/use-claim-bids";
import { getMinFilled } from "./utils/auction-details";

const getFailReason = (auction: Auction) => {
  // Auction was cancelled by the auction creator
  if (auction.status === "cancelled") {
    return "The auction was cancelled by the creator";
  }

  // Auction was aborted by someone
  if (auction.status === "aborted") {
    return "The auction was aborted";
  }

  // The raised amount was below the minimum fill
  const minFilled = getMinFilled(auction) ?? 0;
  if (Number(auction.sold) < minFilled) {
    return "The auction did not raise the minimum amount";
  }

  // Unknown reason. RFC: should this condition ever trigger? I don't think it should.
  return "The auction did not settle successfully";
};

export function AuctionFailedCard({ auction }: PropsWithAuction) {
  const { address } = useAccount();
  const [isTxnDialogOpen, setTxnDialogOpen] = useState(false);
  const claimBidsTxn = useClaimBids(auction);

  const userBids = auction.bids.filter(
    (bid) => bid.bidder.toLowerCase() === address?.toLowerCase(),
  );

  const userTotalBidAmount = userBids.reduce(
    (acc, bid) => acc + Number(bid.amountIn ?? 0),
    0,
  );

  const userHasClaimedFullRefund = userBids.every(
    (bid) => bid.status === "refunded" || bid.status === "claimed",
  );

  const userTotalRefundClaimed = userBids.reduce(
    (acc, bid) => acc + Number(bid.settledAmountInRefunded ?? 0),
    0,
  );

  const failReason = getFailReason(auction);

  return (
    <div className="gap-y-md flex flex-col">
      <Card
        title="Claim"
        className="lg:w-[496px]"
        headerRightElement={<Badge color="alert">Auction Failed</Badge>}
      >
        <RequiresChain chainId={auction.chainId}>
          <div className="gap-y-md flex flex-col">
            <div className="bg-surface-tertiary p-sm rounded">
              <Metric size="l" label="You Bid">
                {shorten(userTotalBidAmount)} {auction.quoteToken.symbol}
              </Metric>
            </div>

            {userTotalRefundClaimed > 0 && (
              <div className="bg-surface-tertiary p-sm rounded">
                <Metric size="l" label="You Refunded">
                  {shorten(userTotalRefundClaimed)} {auction.quoteToken.symbol}
                </Metric>
              </div>
            )}

            <div className="bg-surface-tertiary p-sm rounded">
              <Metric size="l" label="You Get">
                0 {auction.baseToken.symbol}
              </Metric>
              <Text size="sm" className="text-red-500">
                {failReason}
              </Text>
            </div>

            {!userHasClaimedFullRefund && (
              <Button
                size="lg"
                className="w-full"
                onClick={() => setTxnDialogOpen(true)}
              >
                Claim refund
              </Button>
            )}
            {userHasClaimedFullRefund && (
              <Link to="/auctions">
                <Button size="lg" variant="secondary" className="w-full">
                  View live auctions <ArrowRightIcon className="size-6" />
                </Button>
              </Link>
            )}
          </div>
        </RequiresChain>

        <TransactionDialog
          open={isTxnDialogOpen}
          signatureMutation={claimBidsTxn.claimTx}
          error={claimBidsTxn.error}
          onConfirm={claimBidsTxn.handleClaim}
          mutation={claimBidsTxn.claimReceipt}
          chainId={auction.chainId}
          onOpenChange={(open: boolean) => {
            if (!open) {
              claimBidsTxn.claimTx.reset();
            }
            setTxnDialogOpen(open);
          }}
          hash={claimBidsTxn.claimTx.data}
          disabled={claimBidsTxn.isWaiting}
          screens={{
            idle: {
              Component: () => (
                <div className="text-center">
                  You&apos;re about to claim all of your outstanding refunds for
                  this auction.
                </div>
              ),
              title: `Confirm refund`,
            },
            success: {
              Component: () => (
                <div className="flex justify-center text-center">
                  <p>Bids refunded successfully!</p>
                </div>
              ),
              title: "Transaction Confirmed",
            },
          }}
        />
      </Card>
    </div>
  );
}
