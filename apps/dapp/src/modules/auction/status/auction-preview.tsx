import { PropsWithAuction } from "@axis-finance/types";
import { AuctionCoreMetrics } from "../auction-core-metrics";

//TODO: create a preview auction type to avoid mismatches
export function AuctionLivePreview({ auction }: PropsWithAuction) {
  return (
    <div className="flex w-[1024px] items-center justify-center gap-y-8">
      <AuctionCoreMetrics auction={auction} className="" />
    </div>
  );
}
