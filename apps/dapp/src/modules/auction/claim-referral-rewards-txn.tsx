import type { PropsWithAuction } from "@axis-finance/types";
import { TransactionDialog } from "modules/transaction/transaction-dialog";
import { useClaimReferralRewards } from "./hooks/use-claim-referral-rewards";

type ClaimReferralRewardsTxnProps = PropsWithAuction & {
  onClose: () => void;
};

export function ClaimReferralRewardsTxn({
  auction,
  onClose,
}: ClaimReferralRewardsTxnProps) {
  const { transact, transaction, receipt, error, isWaiting } =
    useClaimReferralRewards({ auction });

  return (
    <TransactionDialog
      open={true}
      signatureMutation={transaction}
      error={error}
      onConfirm={transact}
      mutation={receipt}
      chainId={auction.chainId}
      onOpenChange={(open: boolean) => {
        if (!open) {
          onClose();
        }
      }}
      hash={transaction.data}
      disabled={isWaiting}
      screens={{
        idle: {
          Component: () => (
            <div className="text-center">
              <div>
                You&apos;re claiming all of your referral rewards from this
                auction.
              </div>
              {error != null && <div>{error.message}</div>}
            </div>
          ),
          title: `Claim referral rewards`,
        },
        success: {
          Component: () => (
            <div className="flex justify-center text-center">
              <p>Your referral rewards were successfully claimed!</p>
            </div>
          ),
          title: "Transaction Confirmed",
        },
      }}
    />
  );
}
