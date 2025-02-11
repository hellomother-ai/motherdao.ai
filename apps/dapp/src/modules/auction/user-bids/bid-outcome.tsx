import { useAccount } from "wagmi";
import { Metric } from "@repo/ui";
import type { PropsWithAuction } from "@axis-finance/types";
import { shorten } from "utils/number";

export function BidOutcome({ auction }: PropsWithAuction) {
  const { address } = useAccount();

  const userBids = auction.bids.filter(
    (bid) => bid.bidder.toLowerCase() === address?.toLowerCase(),
  );

  const userTotalBidAmount = userBids.reduce(
    (acc, bid) => acc + Number(bid.amountIn ?? 0),
    0,
  );

  const userTotalUnsuccessfulBidAmount = userBids.reduce(
    (acc, bid) => acc + Number(bid.settledAmountInRefunded ?? 0),
    0,
  );

  const userTotalTokensWon = userBids.reduce(
    (acc, bid) => acc + Number(bid.settledAmountOut ?? 0),
    0,
  );

  return (
    <>
      <div className="bg-surface-tertiary p-sm rounded">
        <Metric size="l" label="You Bid">
          {shorten(userTotalBidAmount)} {auction.quoteToken.symbol}
        </Metric>
      </div>

      <div className="flex gap-x-2 *:w-full">
        {userTotalUnsuccessfulBidAmount > 0 && (
          <div className="bg-surface-tertiary p-sm rounded">
            <Metric size="l" label="Your Refund">
              {shorten(userTotalUnsuccessfulBidAmount)}{" "}
              {auction.quoteToken.symbol}
            </Metric>
          </div>
        )}

        <div className="bg-surface-tertiary p-sm rounded">
          <Metric size="l" label="You Get">
            {shorten(userTotalTokensWon)} {auction.baseToken.symbol}
          </Metric>
        </div>
      </div>
    </>
  );
}
