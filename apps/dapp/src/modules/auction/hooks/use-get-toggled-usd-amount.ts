import { useToggle } from "@repo/ui";
import type { Token } from "@axis-finance/types";
import { shorten } from "utils/number";
import { useGetUsdAmount } from "./use-get-usd-amount";
import { parseUnits } from "viem";

const useGetToggledUsdAmount = (
  token: Token | undefined,
  timestamp: number | undefined,
) => {
  if (token === undefined) throw new Error("token cannot be undefined");

  const { isToggled: isUsdToggled } = useToggle();
  const { getUsdAmount } = useGetUsdAmount(token, timestamp);

  const getToggledUsdAmount = (
    amount: number,
    showTokenSymbol: boolean = true,
  ): string => {
    const formattedAmount = `${shorten(Number(amount))} ${
      showTokenSymbol ? token.symbol : ""
    }`;

    if (!isUsdToggled) {
      return formattedAmount;
    }

    const usdAmount = getUsdAmount(
      parseUnits(amount.toString(), token.decimals),
    );
    return usdAmount || formattedAmount;
  };

  return {
    getToggledUsdAmount,
  };
};

export { useGetToggledUsdAmount };
