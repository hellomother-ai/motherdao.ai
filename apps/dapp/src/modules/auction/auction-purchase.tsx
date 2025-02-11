import { Button, Card, Link, Metric, Text, Tooltip, cn } from "@repo/ui";
import { formatUnits, parseUnits } from "viem";
import { AuctionBidInput } from "./auction-bid-input";
import { Auction, AuctionType, PropsWithAuction } from "@axis-finance/types";
import { TransactionDialog } from "modules/transaction/transaction-dialog";
import { LoadingIndicator } from "modules/app/loading-indicator";
import { ChevronLeft, LockIcon } from "lucide-react";
import { trimCurrency } from "utils";
import { useBidAuction } from "./hooks/use-bid-auction";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RequiresChain } from "components/requires-chain";
import React, { useEffect, useState } from "react";
import { AuctionBidInputSingle } from "./auction-bid-input-single";
import { UseWriteContractReturnType, useAccount, useChainId } from "wagmi";
import { useAllowlist } from "./hooks/use-allowlist";
import useERC20Balance from "loaders/use-erc20-balance";
import { getDeployment } from "@axis-finance/deployments";
import {
  PopupTokenWrapper,
  isQuoteAWrappedGasToken,
} from "modules/token/popup-token-wrapper";
import ConnectButton from "components/connect-button";

const schema = z.object({
  baseTokenAmount: z.string(),
  quoteTokenAmount: z.string(),
  bidPrice: z.string().optional(), // Only used for bids that require the bid price to be specified
});

export type BidForm = z.infer<typeof schema>;

type AuctionPurchaseProps = PropsWithAuction & {
  hideInfo?: boolean;
  showMetrics?: boolean;
  handleShowMetrics?: () => void;
};

export function AuctionPurchase({ auction, ...props }: AuctionPurchaseProps) {
  const [open, setOpen] = React.useState(false);
  const currentChainId = useChainId();
  const walletAccount = useAccount();
  const { allocation } = useAllowlist(auction);

  const isFixedPriceBatch =
    auction.auctionType === AuctionType.FIXED_PRICE_BATCH;
  const auctionFormatted = auction.formatted || undefined;

  const [maxBidAmount, setMaxBidAmount] = useState<bigint | undefined>();
  const deployment = getDeployment(auction.chainId);

  const totalUserBidAmount = auction.bids
    .filter(
      (b) => b.bidder.toLowerCase() === walletAccount.address?.toLowerCase(),
    )
    .reduce((total, b) => {
      total += BigInt(b.rawAmountIn);
      return total;
    }, 0n);

  const formattedUserBidAmount = formatUnits(
    totalUserBidAmount,
    auction.quoteToken.decimals,
  );

  const isEMP = auction.auctionType === AuctionType.SEALED_BID;

  // Cache the max bid amount
  useEffect(() => {
    // Only for FPB, since we don't know the amount out for each bid in EMP
    if (!isFixedPriceBatch || !auctionFormatted) {
      setMaxBidAmount(undefined);
      return;
    }

    // Calculate the remaining capacity in terms of quote tokens
    const capacityInQuoteTokens =
      (parseUnits(auction.capacityInitial, auction.baseToken.decimals) *
        parseUnits(
          (auctionFormatted.price ?? "0").replace(/,/g, ""),
          auction.quoteToken.decimals,
        )) /
      parseUnits("1", auction.baseToken.decimals);

    const remainingQuoteTokens =
      capacityInQuoteTokens -
      parseUnits(
        (auctionFormatted.totalBidAmountFormatted ?? "0").replace(/,/g, ""),
        auction.quoteToken.decimals,
      );

    setMaxBidAmount(remainingQuoteTokens);
  }, [
    auction.capacityInitial,
    auctionFormatted,
    auctionFormatted?.totalBidAmountFormatted,
    isFixedPriceBatch,
    auction.baseToken.decimals,
    auction.quoteToken.decimals,
  ]);
  // Allowlist callback support
  // Handles determining if an allowlist callback is being used
  // and provides variables for displaying on the UI and submitting the bid transaction
  const {
    canBid,
    amountLimited: allowlistLimitsAmount,
    limit: allowlistLimit,
    criteria,
    callbackData,
  } = useAllowlist(auction);

  const form = useForm<BidForm>({
    mode: "onChange",
    delayError: 600,
    resolver: zodResolver(
      schema
        .refine(
          (data) =>
            parseUnits(data.quoteTokenAmount, auction.quoteToken.decimals) >
            BigInt(0),
          {
            message: "Amount must be greater than 0",
            path: ["quoteTokenAmount"],
          },
        )
        .refine(
          (data) =>
            isFixedPriceBatch ||
            parseUnits(data.bidPrice ?? "0", auction.quoteToken.decimals) >
              BigInt(0),
          {
            message: "Bid price must be greater than 0",
            path: ["bidPrice"],
          },
        )
        .refine(
          (data) =>
            isFixedPriceBatch ||
            parseUnits(data.quoteTokenAmount, auction.quoteToken.decimals) >=
              parseUnits(
                auction.encryptedMarginalPrice?.minBidSize ?? "0",
                auction.quoteToken.decimals,
              ),
          {
            message: `Minimum bid is ${auction.formatted?.minBidSize}`,
            path: ["quoteTokenAmount"],
          },
        )
        .refine(
          (data) =>
            isFixedPriceBatch ||
            parseUnits(data.bidPrice ?? "0", auction.quoteToken.decimals) >=
              parseUnits(
                auction.encryptedMarginalPrice?.minPrice ?? "0",
                auction.quoteToken.decimals,
              ),
          {
            message: `Min rate is ${auction.formatted?.minPrice} ${auction.quoteToken.symbol}/${auction.baseToken.symbol}`,
            path: ["bidPrice"],
          },
        )
        .refine(
          (data) =>
            parseUnits(data.quoteTokenAmount, auction.quoteToken.decimals) <=
            (quoteTokenBalance ?? BigInt(0)),
          {
            message: `Insufficient balance`,
            path: ["quoteTokenAmount"],
          },
        )
        .refine(
          (data) =>
            parseUnits(data.baseTokenAmount, auction.baseToken.decimals) <=
            parseUnits(auction.capacity, auction.baseToken.decimals),
          {
            message: "Amount out exceeds capacity",
            path: ["baseTokenAmount"],
          },
        )
        .refine(
          (data) =>
            !allowlistLimitsAmount ||
            (allowlistLimitsAmount &&
              parseUnits(data.quoteTokenAmount, auction.quoteToken.decimals) <=
                allowlistLimit),
          {
            message: `Exceeds your remaining allocation of ${allowlistLimit} ${auction.quoteToken.symbol}`,
            path: ["quoteTokenAmount"],
          },
        )
        .refine(
          (data) =>
            !isFixedPriceBatch ||
            maxBidAmount === undefined ||
            parseUnits(data.quoteTokenAmount, auction.quoteToken.decimals) <=
              maxBidAmount,
          {
            message: `Exceeds remaining capacity of ${formatUnits(
              maxBidAmount ?? 0n,
              auction.quoteToken.decimals,
            )} ${auction.quoteToken.symbol}`,
            path: ["quoteTokenAmount"],
          },
        ),
    ),
  });

  const [amountIn, minAmountOut] = form.watch([
    "quoteTokenAmount",
    "baseTokenAmount",
  ]);

  const parsedAmountIn = amountIn
    ? parseUnits(amountIn, auction.quoteToken.decimals)
    : BigInt(0);

  const parsedMinAmountOut = minAmountOut
    ? parseUnits(minAmountOut, auction.baseToken.decimals)
    : BigInt(0);

  const { balance: quoteTokenBalance, refetch: refetchQuoteTokenBalance } =
    useERC20Balance({
      chainId: auction.chainId,
      tokenAddress: auction.quoteToken.address,
      balanceAddress: walletAccount.address,
    });

  const handleSuccessfulBid = () => {
    form.reset();
    refetchQuoteTokenBalance();
  };

  const { ...bid } = useBidAuction(
    auction.chainId,
    auction.lotId,
    parsedAmountIn,
    parsedMinAmountOut,
    callbackData,
    handleSuccessfulBid,
  );

  // TODO Permit2 signature
  const handleSubmit = () => {
    bid.isSufficientAllowance ? bid.handleBid() : bid.approveCapacity();
  };

  const isValidInput = form.formState.isValid;

  const shouldDisable =
    !isValidInput ||
    bid.approveReceipt.isLoading ||
    bid?.bidReceipt?.isLoading ||
    bid?.bidTx?.isPending ||
    !bid.isSimulationSuccess;

  const isWaiting = bid.approveReceipt.isLoading || bid.isWaiting;
  const isSigningApproval = bid.allowanceUtils.approveTx.isPending;
  const actionKeyword = "Bid";

  const amountInInvalid =
    parsedAmountIn > (quoteTokenBalance ?? BigInt(0)) || // greater than balance
    parsedAmountIn === undefined ||
    parsedAmountIn === BigInt(0); // zero or empty

  const amountOutInvalid =
    minAmountOut === undefined ||
    parsedMinAmountOut === BigInt(0) || // zero or empty
    parsedMinAmountOut >
      parseUnits(auction.capacity, auction.baseToken.decimals) || // exceeds capacity
    (isEMP &&
      (parsedAmountIn * parseUnits("1", auction.baseToken.decimals)) /
        parsedMinAmountOut <
        parseUnits(
          auction.encryptedMarginalPrice?.minPrice ?? "0",
          auction.quoteToken.decimals,
        )); // less than min price

  const isWalletChainIncorrect =
    auction.chainId !== currentChainId || !walletAccount.isConnected;

  // Calculate the limit for the user as the minimum of the allowlist limit (where applicable) and the max bid amount
  // Truth table
  // Allowlist limit | Max bid amount | Bid limit
  //      true      |     true       | min(allowlistLimit, maxBidAmount)
  //      true      |     false      | allowlistLimit
  //      false     |     true       | maxBidAmount
  //      false     |     false      | none (undefined)
  const bidLimit =
    allowlistLimitsAmount && maxBidAmount !== undefined
      ? allowlistLimit > maxBidAmount
        ? maxBidAmount
        : allowlistLimit
      : allowlistLimitsAmount
        ? allowlistLimit
        : maxBidAmount;

  // TODO display "waiting" in modal when the tx is waiting to be signed by the user

  return (
    <div className="mx-auto lg:min-w-[477px]">
      {canBid ? (
        <FormProvider {...form}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Card
              tooltip={
                isEMP
                  ? "Spend Amount is your total bid size and Bid Price is the maximum amount you’re willing to pay per token"
                  : undefined
              }
              title={
                isFixedPriceBatch
                  ? `Buy ${auction.baseToken.symbol}`
                  : `Place your bid`
              }
              headerRightElement={
                isQuoteAWrappedGasToken(auction) && (
                  <Tooltip
                    content={`Wrap ${deployment?.chain.nativeCurrency.symbol} into ${auction.quoteToken.symbol}`}
                  >
                    <PopupTokenWrapper auction={auction} />
                  </Tooltip>
                )
              }
            >
              {isFixedPriceBatch ? (
                <AuctionBidInputSingle
                  balance={quoteTokenBalance}
                  limit={bidLimit}
                  auction={auction}
                  disabled={isWalletChainIncorrect}
                />
              ) : (
                <AuctionBidInput
                  balance={quoteTokenBalance}
                  limit={bidLimit}
                  auction={auction}
                  disabled={isWalletChainIncorrect}
                />
              )}

              <div className={"gap-x-xl mx-auto mt-4 flex w-full"}>
                {allocation && +allocation > 0 && (
                  <Metric
                    childrenClassName={"text-primary"}
                    label={`Your Allocation`}
                  >
                    {trimCurrency(
                      formatUnits(
                        BigInt(allocation),
                        auction.quoteToken.decimals,
                      ),
                    )}{" "}
                    {auction.quoteToken.symbol}
                  </Metric>
                )}
                {totalUserBidAmount > 0n && (
                  <Metric
                    childrenClassName={"text-tertiary-300"}
                    label={`You ${isEMP ? "bid" : "spent"}`}
                  >
                    {trimCurrency(formattedUserBidAmount)}{" "}
                    {auction.quoteToken.symbol}
                  </Metric>
                )}
                {/* {!isEMP && totalUserBidAmount > 0n && (
                  <Metric
                    childrenClassName={"text-tertiary-300"}
                    label="You Receive"
                  >
                    {trimCurrency(minAmountOut)} {auction.baseToken.symbol}
                  </Metric>
                )} */}
              </div>
              <div className="mx-auto mt-4 w-full space-y-4">
                {isFixedPriceBatch && (
                  <Text size="sm" className="leading-none tracking-normal">
                    You&apos;re participating in a fixed-price sale. Bids are
                    first-come first-served and can be canceled before the sale
                    concludes.
                    <Link
                      target="_blank"
                      href="https://axis.finance/docs/origin/fps-overview"
                      className="text-primary ml-1 uppercase"
                    >
                      Learn More
                    </Link>
                  </Text>
                )}
              </div>

              <RequiresChain chainId={auction.chainId} className="mt-4">
                <div className="mt-4 w-full">
                  <Button
                    className="w-full"
                    disabled={
                      isWaiting ||
                      isSigningApproval ||
                      amountInInvalid ||
                      amountOutInvalid
                    }
                    onClick={() =>
                      bid.isSufficientAllowance
                        ? setOpen(true)
                        : bid.approveCapacity()
                    }
                  >
                    {bid.isSufficientAllowance &&
                      !isWaiting &&
                      actionKeyword.toUpperCase()}

                    {isWaiting && (
                      <div className="flex">
                        Waiting for confirmation...
                        <div className="w-1/2"></div>
                        <LoadingIndicator />
                      </div>
                    )}

                    {!bid.isSufficientAllowance &&
                      !isWaiting &&
                      `APPROVE TO ${actionKeyword.toUpperCase()}`}
                  </Button>
                </div>
              </RequiresChain>
              <Button
                variant="ghost"
                className="hidden w-full pb-0 lg:flex lg:pb-0"
                onClick={() => props.handleShowMetrics?.()}
              >
                {props.showMetrics ? "Hide" : "View"} Auction Info{" "}
                <ChevronLeft
                  className={cn(!props.showMetrics && "rotate-180")}
                />
              </Button>
            </Card>

            <TransactionDialog
              open={open}
              signatureMutation={bid.bidTx as UseWriteContractReturnType}
              error={bid.error}
              onConfirm={handleSubmit}
              mutation={bid.bidReceipt}
              chainId={auction.chainId}
              onOpenChange={(open) => {
                if (!open) {
                  bid.bidTx?.reset();
                }
                setOpen(open);
              }}
              hash={bid.bidTx.data}
              disabled={shouldDisable || isWaiting}
              screens={{
                idle: {
                  Component: () => (
                    <div className="text-center">
                      {getConfirmCardText(auction, amountIn, minAmountOut)}
                    </div>
                  ),
                  title: `Confirm ${actionKeyword}`,
                },
                success: {
                  Component: () => (
                    <div className="flex justify-center text-center">
                      {isEMP ? (
                        <>
                          <LockIcon className="mr-1" />
                          Bid encrypted and stored successfully!
                        </>
                      ) : (
                        <p>Bid stored successfully!</p>
                      )}
                    </div>
                  ),
                  title: "Transaction Confirmed",
                },
              }}
            />
          </form>
        </FormProvider>
      ) : (
        <Card title="Private Sale">
          <p>This sale is restricted to {criteria}.</p>
          {walletAccount.isConnected ? (
            <p>The connected wallet is not approved to bid.</p>
          ) : (
            <div>
              <p className="mt-2">Connect a wallet to check eligibility.</p>
              <ConnectButton className="mt-4" />
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

function getConfirmCardText(
  auction: Auction,
  amountIn: string,
  amountOut: string,
) {
  const isEMP = auction.auctionType === AuctionType.SEALED_BID;
  const empText = `You're about to place a bid of ${trimCurrency(amountIn)} ${
    auction.quoteToken.symbol
  }`;
  const fpText = `You're about to place a bid of ${trimCurrency(amountOut)} ${
    auction.baseToken.symbol
  } for ${trimCurrency(amountIn)} ${auction.quoteToken.symbol}`;
  return isEMP ? empText : fpText;
}
