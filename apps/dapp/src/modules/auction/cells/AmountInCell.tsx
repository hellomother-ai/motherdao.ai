import { Auction, BatchAuctionBid } from "@axis-finance/types";
import { ToggledUsdAmount } from "../toggled-usd-amount";
import { useToggle } from "@repo/ui";

export function AmountInCell({
  bid,
  value,
}: {
  bid: BatchAuctionBid & { auction: Auction };
  value: number;
}) {
  const { isToggled } = useToggle();
  return (
    <>
      <ToggledUsdAmount format token={bid.auction.quoteToken} amount={value} />{" "}
      {!isToggled && bid.auction.quoteToken.symbol}
    </>
  );
}
