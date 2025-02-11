import type { Token } from "@axis-finance/types";
import { useTokenPrice } from "./use-token-price";
import { formatUsdValue } from "../utils/format-usd-amount";
import { formatUnits, parseUnits } from "viem";
import { trimCurrency } from "utils/currency";

const useUsdAmount = ({
  amount,
  token,
  timestamp,
}: {
  amount: number;
  token: Token | undefined;
  timestamp: number | undefined;
}) => {
  if (token === undefined) throw new Error("token cannot be undefined");
  const price = useTokenPrice(token, timestamp);
  const decimals = token.decimals;

  if (
    price === null ||
    price === undefined ||
    amount === undefined ||
    decimals === undefined
  )
    return {};

  // Multiply the price and amount by the token decimals to get a bigint, so we get a precise number at the end
  const priceBigInt = parseUnits(price.toString(), decimals);
  const amountBigInt = parseUnits(amount.toString(), decimals);

  // Convert USD amount in USD decimals as a string
  const usdAmount = (amountBigInt * priceBigInt) / parseUnits("1", decimals);
  const decimal = formatUnits(usdAmount, decimals);
  const short = formatUsdValue(Number(decimal));

  return { decimal: trimCurrency(decimal), short };
};

export { useUsdAmount };
