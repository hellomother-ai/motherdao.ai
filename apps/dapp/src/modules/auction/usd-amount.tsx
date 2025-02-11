import type { Token } from "@axis-finance/types";
import { useUsdAmount } from "./hooks/use-usd-amount";

type UsdAmountProps = {
  token: Token;
  amount: number;
  timestamp?: number;
  decimal?: boolean;
};

function UsdAmount({
  token,
  amount,
  timestamp,
  decimal: inDecimal,
}: UsdAmountProps) {
  const { decimal, short } = useUsdAmount({ token, amount, timestamp });
  if (!short) return undefined;

  return inDecimal ? decimal : short;
}

export { UsdAmount };
export type { UsdAmountProps };
