import { useState } from "react";
import { useAccount } from "wagmi";
import type { PropsWithAuction } from "@axis-finance/types";
import { Button, Card, Metric } from "@/components";
import { useReferralRewards } from "./hooks/use-referral-rewards";
import { RequiresChain } from "components/requires-chain";
import { ClaimReferralRewardsTxn } from "./claim-referral-rewards-txn";

export function ReferralRewards({ auction }: PropsWithAuction) {
  const { address } = useAccount();
  const [isTxnDialogOpen, setIsTxnDialogOpen] = useState(false);

  const rewards = useReferralRewards({
    address,
    auction,
  });

  const hasRewards = rewards != null && rewards > 0;

  return (
    <Card title="Referral">
      <div className="gap-y-md flex flex-col">
        <div className="bg-surface-tertiary p-sm rounded">
          <Metric size="l" label="Claimable rewards">
            {rewards} {auction.quoteToken.symbol}
          </Metric>
        </div>

        {!hasRewards && (
          <p>
            You can claim your referral rewards as soon as the users you&apos;ve
            referred have successfully claimed their bids.
          </p>
        )}

        <RequiresChain chainId={auction.chainId}>
          <Button
            disabled={!hasRewards}
            className="w-full"
            onClick={() => setIsTxnDialogOpen(true)}
          >
            {hasRewards ? "Claim rewards" : "No rewards to claim"}
          </Button>
        </RequiresChain>
      </div>

      {isTxnDialogOpen && (
        <ClaimReferralRewardsTxn
          auction={auction}
          onClose={() => setIsTxnDialogOpen(false)}
        />
      )}
    </Card>
  );
}
