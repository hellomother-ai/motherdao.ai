import { TickMath } from "@uniswap/v3-sdk";
import JSBI from "jsbi";

export const getTickAtPrice = (
  price: number,
  decimals0: number,
  decimals1: number,
): number => {
  // Adjust the price for token decimals
  const adjustedPrice = price * 10 ** (decimals1 - decimals0);

  // Convert price to sqrt price
  const sqrtPriceX96 = Math.sqrt(adjustedPrice) * 2 ** 96;

  // Use TickMath to get the tick
  return TickMath.getTickAtSqrtRatio(JSBI.BigInt(Math.floor(sqrtPriceX96)));
};
