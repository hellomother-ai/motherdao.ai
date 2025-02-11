import type { Token } from "@axis-finance/types";
import { useTokenPrice } from "./use-token-price";
import { formatUsdValue } from "../utils/format-usd-amount";
import { formatUnits, parseUnits } from "viem";

const useGetUsdAmount = (
  token: Token | undefined,
  timestamp: number | undefined,
) => {
  if (token === undefined) throw new Error("token cannot be undefined");
  const price = useTokenPrice(token, timestamp);
  const decimals = token.decimals;

  const getUsdAmount = (amount: bigint): string | undefined => {
    if (
      price === null ||
      price === undefined ||
      amount === undefined ||
      decimals === undefined
    ) {
      return undefined;
    }

    // Multiply the price by the token decimals to get a bigint
    const priceBigInt = parseUnits(price.toString(), decimals);

    // Multiply the amount by the price and divide by the token decimals to get the USD amount in token decimals
    const usdAmount = (amount * priceBigInt) / parseUnits("1", decimals);

    // Convert USD amount in USD decimals as a string
    const usdAmountString = formatUnits(usdAmount, decimals);

    // Return the formatted USD amount
    return formatUsdValue(Number(usdAmountString));
  };

  return { getUsdAmount };
};

export { useGetUsdAmount };
