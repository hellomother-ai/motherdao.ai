import type { Auction, BatchAuctionBid } from "@axis-finance/types";
import { Tooltip, useToggle } from "@repo/ui";
import { trimCurrency } from "utils/currency";
import { ToggledUsdAmount } from "../toggled-usd-amount";
import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";

type PriceCellProps = {
  value: number;
  bid: BatchAuctionBid & { auction: Auction };
};

export function PriceCell({ value, bid }: PriceCellProps) {
  const auction = bid.auction;
  //@ts-expect-error update type
  const amountOut = bid.amountOut;

  const toggle = useToggle();

  const isUserBid = amountOut && ["live", "concluded"].includes(auction.status); //Only show on live and concluded states

  if (isUserBid) {
    value = Number(bid.amountIn) / amountOut;
  }

  let display = value ? (
    <>
      <ToggledUsdAmount token={auction.quoteToken} amount={value} format />
      {!toggle.isToggled && " " + bid.auction.quoteToken.symbol}
      <LockOpen1Icon />
    </>
  ) : (
    <>
      ████████ <LockClosedIcon />
    </>
  );

  if (!bid.rawSubmittedPrice && Number(bid.settledAmountInRefunded)) {
    display = <span className="text-feedback-alert">Cancelled</span>;
  }

  return (
    <Tooltip
      content={
        isUserBid ? (
          <>
            Your estimate payout out at this price is {trimCurrency(amountOut)}{" "}
            {bid.auction.quoteToken.symbol}.<br />
            Only you can see your bid price until the auction concludes and
            settles.
          </>
        ) : (
          <>
            Other users&apos; bid prices are private until the auction concludes
            and settles.
          </>
        )
      }
    >
      <div className="flex items-center gap-x-1">{display}</div>
    </Tooltip>
  );
}
