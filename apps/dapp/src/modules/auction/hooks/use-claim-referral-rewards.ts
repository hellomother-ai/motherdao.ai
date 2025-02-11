import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
  type UseSimulateContractReturnType,
  type UseWriteContractReturnType,
  type UseWaitForTransactionReceiptReturnType,
} from "wagmi";
import { getAuctionHouse } from "utils/contracts";
import type { PropsWithAuction } from "@axis-finance/types";
import { abis } from "@axis-finance/abis";

type UseClaimRerralRewardsTxn = {
  transact: () => void;
  simulation: UseSimulateContractReturnType<
    typeof abis.batchAuctionHouse,
    "claimRewards"
  >;
  transaction: UseWriteContractReturnType;
  receipt: UseWaitForTransactionReceiptReturnType;
  isWaiting: boolean;
  error:
    | UseSimulateContractReturnType["error"]
    | UseWriteContractReturnType["error"]
    | UseWaitForTransactionReceiptReturnType["error"];
};

export function useClaimReferralRewards({
  auction,
}: PropsWithAuction): UseClaimRerralRewardsTxn {
  const chainId = auction.chainId;
  const rewardTokenAddress = auction.quoteToken.address;
  const auctionType = auction.auctionType;

  const auctionHouseAddress = getAuctionHouse({ chainId, auctionType }).address;

  const simulation = useSimulateContract({
    abi: abis.batchAuctionHouse,
    address: auctionHouseAddress,
    chainId,
    functionName: "claimRewards",
    args: [rewardTokenAddress!],
    query: { enabled: rewardTokenAddress != null },
  }) satisfies UseSimulateContractReturnType<
    typeof abis.batchAuctionHouse,
    "claimRewards"
  >;

  const transaction = useWriteContract();
  const receipt = useWaitForTransactionReceipt({
    hash: transaction.data,
  });

  const transact = () => {
    if (simulation.data) {
      transaction.writeContract(simulation.data.request!);
    }
  };

  const isWaiting =
    simulation.isPending ||
    simulation.isLoading ||
    transaction.isPending ||
    receipt.isLoading;

  const error = simulation.error || transaction.error || receipt.error || null;

  return {
    transact,
    simulation,
    transaction,
    receipt,
    isWaiting,
    error,
  };
}
