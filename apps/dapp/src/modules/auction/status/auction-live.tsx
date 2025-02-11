import { PropsWithAuction } from "@axis-finance/types";
import { AuctionCoreMetrics } from "../auction-core-metrics";
import { AuctionPurchase } from "../auction-purchase";
import React from "react";
import { cn } from "@repo/ui";

export function AuctionLive({ auction }: PropsWithAuction) {
  const [showMetrics, setShowMetrics] = React.useState(false);

  return (
    <div className="auction-action-container relative gap-y-4 transition-all ">
      <div
        className={cn(
          "transition-all duration-500 lg:w-2/3 lg:-translate-x-[220%]",
          showMetrics && "lg:translate-x-0",
        )}
      >
        <AuctionCoreMetrics auction={auction} />
      </div>

      <div
        className={cn(
          "transition-all duration-500 lg:w-1/3 lg:-translate-x-full",
          showMetrics && "lg:translate-x-0",
        )}
      >
        <AuctionPurchase
          handleShowMetrics={() => setShowMetrics((prev) => !prev)}
          showMetrics={showMetrics}
          auction={auction}
        />
      </div>
    </div>
  );
}
