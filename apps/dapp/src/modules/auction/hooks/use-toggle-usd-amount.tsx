import { useToggle } from "@repo/ui";
import type { Token } from "@axis-finance/types";
import { shorten } from "utils/number";
import { useGetUsdAmount } from "./use-get-usd-amount";
import { parseUnits } from "viem";

type ToggleUsdAmountProps = {
  token: Token;
  amount: number;
  timestamp?: number | undefined;
};

const useToggleUsdAmount = ({
  token,
  amount,
  timestamp,
}: ToggleUsdAmountProps) => {
  const { isToggled: isUsdToggled } = useToggle();
  const { getUsdAmount } = useGetUsdAmount(token, timestamp);

  if (amount === undefined) return undefined;

  const formattedAmount = `${shorten(Number(amount))} ${token.symbol}`;

  if (!isUsdToggled) {
    return formattedAmount;
  }

  const usdAmount = getUsdAmount(parseUnits(amount.toString(), token.decimals));
  return usdAmount || formattedAmount;
};

export { useToggleUsdAmount };
