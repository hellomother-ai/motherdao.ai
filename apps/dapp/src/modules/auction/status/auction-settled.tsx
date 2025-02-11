import { AuctionType, type PropsWithAuction } from "@axis-finance/types";
import { SettledAuctionCard } from "modules/auction/settled-auction-card";
import { AuctionCoreMetrics } from "../auction-core-metrics";
import { UserBidsCardContainer } from "../user-bids";
import { ReferralRewards } from "../referral-rewards";
import { useAccount } from "wagmi";

export function AuctionSettled({ auction }: PropsWithAuction) {
  const { isConnected } = useAccount();
  const isEMP = auction.auctionType === AuctionType.SEALED_BID;

  return (
    <div className="auction-action-container">
      <div className="mt-4 space-y-4 lg:mt-0 lg:w-2/3">
        {isEMP && <SettledAuctionCard auction={auction} />}
        <AuctionCoreMetrics auction={auction} />
      </div>
      <div className="mt-4 space-y-4 lg:mt-0 lg:w-1/3">
        <UserBidsCardContainer auction={auction} />
        {isConnected && <ReferralRewards auction={auction} />}
      </div>
    </div>
  );
}
