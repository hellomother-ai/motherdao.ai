import type { Address } from "viem";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
  useEstimateGas,
} from "wagmi";
import { abi as wrapperAbi } from "./wrapper-abi";

type UseWrapperContractArgs = {
  /** The wrapper address */
  contractAddress?: Address;
  /** The amount to operate on */
  amount: bigint;
  /** Whether is wrapping or unwrapping */
  isWrapping: boolean;
};

/** Exposes methods for wrapping and unwrapping a chain's native token */
export default function useWrapperContract({
  contractAddress,
  amount,
  isWrapping,
}: UseWrapperContractArgs) {
  const { address: userAddress } = useAccount();
  //WRAPPING
  const { data: wrapData, ...wrapCall } = useSimulateContract({
    functionName: "deposit",
    value: amount,
    address: contractAddress,
    account: userAddress,
    abi: wrapperAbi,
    query: { enabled: !!contractAddress && isWrapping },
  });

  const { data: wrapHash, ...wrapTx } = useWriteContract();

  const { data: gasEstimate } = useEstimateGas(wrapData?.request);

  const wrapReceipt = useWaitForTransactionReceipt({ hash: wrapHash });
  const wrap = () =>
    wrapData?.request && wrapTx.writeContract(wrapData.request!);

  // UNWRAPPING
  const { data: unwrapData, ...unwrapCall } = useSimulateContract({
    functionName: "withdraw",
    args: [amount],
    address: contractAddress,
    account: userAddress,
    abi: wrapperAbi,
    query: { enabled: !!contractAddress && !isWrapping },
  });

  const { data: unwrapHash, ...unwrapTx } = useWriteContract();
  const unwrapReceipt = useWaitForTransactionReceipt({ hash: unwrapHash });
  const unwrap = () =>
    unwrapData?.request && unwrapTx.writeContract(unwrapData.request!);

  const currentHandlers = isWrapping
    ? [wrapCall, wrapTx, wrapReceipt]
    : [unwrapCall, unwrapTx, unwrapReceipt];

  return {
    wrap,
    wrapCall,
    wrapTx,
    wrapReceipt,

    unwrap,
    unwrapCall,
    unwrapTx,
    unwrapReceipt,
    gasEstimate: gasEstimate ?? 0n,
    currentCall: isWrapping ? wrapTx : unwrapTx,
    currentTx: isWrapping ? wrapTx : unwrapTx,
    currentReceipt: isWrapping ? wrapReceipt : unwrapReceipt,
    currentHandlers,
  };
}
