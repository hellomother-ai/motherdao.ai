import { Address, Auction, CallbacksType } from "@axis-finance/types";
import { getCallbacksType } from "../utils/get-callbacks-type";
import { useBaseDTLCallback } from "../hooks/use-base-dtl-callback";
import useERC20Balance from "loaders/use-erc20-balance";
import { formatUnits } from "viem";
import { trimCurrency } from "utils/currency";
import { Text } from "@repo/ui";
import { useEffect } from "react";

export function SettleAuctionDtlCallbackBalance({
  auction,
  setHasSufficientBalanceForCallbacks,
}: {
  auction: Auction;
  setHasSufficientBalanceForCallbacks: (hasSufficientBalance: boolean) => void;
}) {
  const { data: dtlCallbackConfiguration } = useBaseDTLCallback({
    chainId: auction.chainId,
    lotId: auction.lotId,
    baseTokenDecimals: auction.baseToken.decimals,
    callback: auction.callbacks,
  });
  // Get the balance of the base token
  // This is used as settlement may result in the seller transferring the base token to a DTL callback
  const { balance: sellerBaseTokenBalance, decimals: baseTokenDecimals } =
    useERC20Balance({
      chainId: auction.chainId,
      tokenAddress: auction.baseToken.address,
      balanceAddress: auction.seller as Address,
    });

  const sellerBaseTokenBalanceDecimal: number =
    sellerBaseTokenBalance && baseTokenDecimals
      ? Number(formatUnits(sellerBaseTokenBalance, baseTokenDecimals))
      : 0;
  const callbacksType = getCallbacksType(auction);
  const hasSufficientBalanceForCallbacks: boolean =
    // No callback
    callbacksType == CallbacksType.NONE ||
    // Not a DTL callback
    (callbacksType != CallbacksType.UNIV2_DTL &&
      callbacksType != CallbacksType.UNIV3_DTL) ||
    // Sufficient balance for the DTL callback
    (sellerBaseTokenBalanceDecimal > 0 &&
      dtlCallbackConfiguration !== undefined &&
      sellerBaseTokenBalanceDecimal >=
        Number(auction.capacity) *
          dtlCallbackConfiguration.proceedsUtilisationPercent);

  // Pass the result to the parent component
  useEffect(() => {
    setHasSufficientBalanceForCallbacks(hasSufficientBalanceForCallbacks);
  }, [hasSufficientBalanceForCallbacks]);

  return (
    !hasSufficientBalanceForCallbacks && (
      <div>
        <Text size="xs" className="text-feedback-alert">
          The seller has insufficient balance (
          {trimCurrency(sellerBaseTokenBalanceDecimal)}) of the payout token to
          settle the auction, since a Direct to Liquidity callback is enabled.
        </Text>
      </div>
    )
  );
}
