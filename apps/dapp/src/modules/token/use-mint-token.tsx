import { Token } from "@axis-finance/types";
import { parseUnits } from "viem";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

//const mintABI = testnetERC20.abi.find((e) => e.name === "mint")!;
const mintABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export function useMintToken(token: Token, amount: string) {
  const { address: userAddress } = useAccount();
  const parsedAmount = parseUnits(amount, token?.decimals);

  const mintCall = useSimulateContract({
    abi: mintABI,
    functionName: "mint",
    address: token.address,
    chainId: token?.chainId,
    args: [userAddress, parsedAmount],
  });

  const mintTx = useWriteContract();
  const mintReceipt = useWaitForTransactionReceipt({ hash: mintTx.data });

  const handleMint = () => {
    if (mintCall.isSuccess) {
      mintTx.writeContract(mintCall.data.request!);
    }
  };

  return {
    handleMint,
    mintCall,
    mintTx,
    mintReceipt,
  };
}
