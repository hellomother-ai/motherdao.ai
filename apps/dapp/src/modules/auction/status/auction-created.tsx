import { PropsWithAuction } from "@axis-finance/types";
import { AuctionCoreMetrics } from "../auction-core-metrics";

export function AuctionCreated({ auction }: PropsWithAuction) {
  return (
    <div className="auction-action-container h-full items-stretch justify-center gap-x-4 lg:flex">
      <div className="space-y-4 lg:w-2/3">
        <AuctionCoreMetrics auction={auction} />
      </div>
    </div>
  );
}
