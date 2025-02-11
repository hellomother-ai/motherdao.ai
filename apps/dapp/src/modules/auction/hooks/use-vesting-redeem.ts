import { useEffect } from "react";
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import type { Address, Auction } from "@axis-finance/types";
import { abis } from "@axis-finance/abis";

export function useVestingRedeem({
  vestingTokenId,
  derivativeModuleAddress,
  auction,
  onSuccess,
}: {
  vestingTokenId?: bigint;
  auction: Auction;
  derivativeModuleAddress?: Address;
  onSuccess?: () => void;
}) {
  const redeemCall = useSimulateContract({
    abi: abis.batchLinearVesting,
    address: derivativeModuleAddress,
    chainId: auction?.chainId,
    functionName: "redeemMax",
    args: [vestingTokenId || 0n],
    query: {
      enabled:
        !!derivativeModuleAddress &&
        !!vestingTokenId &&
        Number.isInteger(auction?.chainId),
    },
  });

  const redeemTx = useWriteContract();
  const redeemReceipt = useWaitForTransactionReceipt({ hash: redeemTx.data });

  useEffect(() => {
    if (redeemReceipt.isSuccess && onSuccess) {
      redeemTx.reset();
      onSuccess();
    }
  }, [redeemReceipt.isSuccess, onSuccess]);

  const handleRedeem = () => {
    if (redeemCall.data) {
      redeemTx.writeContract(redeemCall.data.request!);
    }
  };

  const handleRedeemSelected = () => {
    if (!derivativeModuleAddress) {
      throw new Error("No derivative module address");
    }

    if (!vestingTokenId) {
      throw new Error("No vesting token id");
    }

    redeemTx.writeContract({
      abi: abis.batchLinearVesting,
      address: derivativeModuleAddress,
      chainId: auction.chainId,
      functionName: "redeemMax",
      args: [vestingTokenId],
    });
  };

  const isWaiting =
    redeemCall.isPending ||
    redeemCall.isLoading ||
    redeemTx.isPending ||
    redeemReceipt.isLoading;

  return {
    handleRedeem,
    handleRedeemSelected,
    redeemCall,
    redeemReceipt,
    redeemTx,
    isWaiting,
  };
}
