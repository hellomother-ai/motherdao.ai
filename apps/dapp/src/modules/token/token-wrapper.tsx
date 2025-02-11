import React from "react";
import { Button, Text } from "@repo/ui";
import { TokenAmountInput } from "./token-amount-input";
import { useAccount, useBalance, useChainId } from "wagmi";
import { getDeployment } from "@axis-finance/deployments";
import { Chain, Token } from "@axis-finance/types";
import { ArrowDownUpIcon } from "lucide-react";
import useWrapperContract from "./use-wrap-token";
import { formatUnits, parseUnits } from "viem";
import useERC20Balance from "loaders/use-erc20-balance";
import { Format } from "./format";

/** Swap-style native currency wrapping and unwrapping on the connected chain */
export function TokenWrapper() {
  const { address: userAddress } = useAccount();
  const chainId = useChainId();
  const deployment = getDeployment(chainId);
  const chain = deployment?.chain;
  const [amount, setAmount] = React.useState<string>();
  const [isWrapping, setWrapping] = React.useState(true);
  const wrapperContractAddress = chain?.nativeCurrency.wrapperContract;

  const wrapper = useWrapperContract({
    contractAddress: wrapperContractAddress,
    amount: parseUnits(amount ?? "0", chain?.nativeCurrency.decimals ?? 0),
    isWrapping,
  });

  const { data: nativeBalance, refetch: refetchNativeBalance } = useBalance({
    address: userAddress,
    chainId,
  });

  const { balance: wrapperBalance, refetch: refetchWrapperBalance } =
    useERC20Balance({
      chainId,
      tokenAddress: wrapperContractAddress,
      balanceAddress: userAddress,
    });

  React.useEffect(() => {
    if (wrapper.currentReceipt.isSuccess) {
      refetchNativeBalance();
      refetchWrapperBalance();
    }
  }, [wrapper.currentReceipt.isSuccess]);

  if (!chain || !chain.nativeCurrency.wrapperContract) {
    return (
      <Text className="text-center">
        {" "}
        Wrapping is not currently available on this chain
      </Text>
    );
  }

  const nativeToken = chain.nativeCurrency;
  const wrapperToken = getWrappedTokenDetails(chain);
  const decimals = chain.nativeCurrency.decimals;

  const method = isWrapping ? wrapper.wrap : wrapper.unwrap;

  const inputToken = isWrapping ? nativeToken : wrapperToken;
  const outputToken = isWrapping ? wrapperToken : nativeToken;

  const inputTokenBalance =
    (isWrapping ? nativeBalance?.value : wrapperBalance) ?? 0n;
  const outputTokenBalance =
    (isWrapping ? wrapperBalance : nativeBalance?.value) ?? 0n;

  const inputLabel = `${isWrapping ? "Wrap" : "Unwrap"} ${inputToken.symbol}`;
  const outputLabel = `Get ${outputToken.symbol}`;

  const amountInWei = parseUnits(amount ?? "0", decimals);

  const gasCost = wrapper.gasEstimate ?? 0n;

  const insufficientGas =
    isWrapping &&
    amountInWei <= inputTokenBalance &&
    amountInWei > inputTokenBalance - gasCost;

  const disableButton =
    !isFinite(Number(amount)) ||
    inputTokenBalance <= 0n ||
    amountInWei > inputTokenBalance ||
    insufficientGas;

  const cost = formatUnits(wrapper.gasEstimate, decimals);

  return (
    <div className="flex flex-col items-center justify-center gap-y-3">
      <TokenAmountInput
        balance={formatUnits(inputTokenBalance ?? 0n, decimals)}
        label={inputLabel}
        value={amount}
        onChange={(value) => setAmount(value as string)}
        token={inputToken as Token}
        showUsdPrice={false}
        disableMaxButton
      />
      <ArrowDownUpIcon
        size="24"
        className="text-primary cursor-pointer"
        onClick={() => setWrapping((prev) => !prev)}
      />

      <TokenAmountInput
        balance={formatUnits(outputTokenBalance ?? 0n, decimals)}
        label={outputLabel}
        value={amount}
        onChange={() => {}}
        token={outputToken as Token}
        showUsdPrice={false}
        type="text"
        disableMaxButton
      />
      <Button
        className="mx-4 w-[80%]"
        onClick={method}
        disabled={disableButton}
      >
        {isWrapping ? "Wrap" : "Unwrap"}
      </Button>
      <Text className="text-center">
        {insufficientGas && (
          <>
            You&apos;ll need at least <Format value={cost} />{" "}
            {nativeToken.symbol} to execute the transaction.
          </>
        )}
        {wrapper.currentTx.isPending && "Confirm transaction in your wallet."}
        {wrapper.currentReceipt.isLoading && "Waiting for confirmation"}
        {wrapper.currentReceipt.isSuccess && "Transaction successful!"}
      </Text>
    </div>
  );
}

function getWrappedTokenDetails(chain: Chain) {
  return {
    decimals: chain.nativeCurrency.decimals,
    address: chain.nativeCurrency.wrapperContract!,
    symbol: `W${chain.nativeCurrency.symbol}`,
    name: `Wrapped ${chain.nativeCurrency.name}`,
    chainId: chain.id,
  };
}
