import type { PropsWithAuction } from "@axis-finance/types";
import { useVestingTokenId } from "modules/auction/hooks/use-vesting-tokenid";
import { useDerivativeModule } from "modules/auction/hooks/use-derivative-module";
import { useVestingRedeem } from "modules/auction/hooks/use-vesting-redeem";
import { TransactionDialog } from "modules/transaction/transaction-dialog";

type RedeemVestedTokensTxnProps = {
  onClose: () => void;
  onSuccess?: () => void;
} & PropsWithAuction;

export function RedeemVestedTokensTxn({
  auction,
  onClose,
  onSuccess,
}: RedeemVestedTokensTxnProps) {
  const { data: vestingModuleAddress } = useDerivativeModule({
    lotId: auction.lotId,
    chainId: auction.chainId,
    auctionType: auction.auctionType,
  });

  const { data: vestingTokenId } = useVestingTokenId({
    linearVestingStartTimestamp: Number(auction?.linearVesting?.startTimestamp),
    linearVestingExpiryTimestamp: Number(
      auction?.linearVesting?.expiryTimestamp,
    ),
    baseToken: auction.baseToken,
    derivativeModuleAddress: vestingModuleAddress,
  });

  const redeemVestedTokensTxn = useVestingRedeem({
    vestingTokenId,
    derivativeModuleAddress: vestingModuleAddress,
    auction,
    onSuccess,
  });

  return (
    <TransactionDialog
      open={true}
      signatureMutation={redeemVestedTokensTxn.redeemTx}
      error={
        redeemVestedTokensTxn.redeemCall.error ||
        redeemVestedTokensTxn.redeemTx.error
      }
      onConfirm={redeemVestedTokensTxn.handleRedeem}
      mutation={redeemVestedTokensTxn.redeemReceipt}
      chainId={auction.chainId}
      onOpenChange={(open: boolean) => {
        if (!open) {
          onClose();
        }
      }}
      hash={redeemVestedTokensTxn.redeemTx.data}
      disabled={redeemVestedTokensTxn.isWaiting}
      screens={{
        idle: {
          Component: () => (
            <div className="text-center">
              You&apos;re redeeming all of your redeemable vesting tokens from
              this auction.
            </div>
          ),
          title: `Claim ${auction.baseToken.symbol}`,
        },
        success: {
          Component: () => (
            <div className="flex justify-center text-center">
              <p>Vested tokens redeemed successfully!</p>
            </div>
          ),
          title: "Transaction Confirmed",
        },
      }}
    />
  );
}
