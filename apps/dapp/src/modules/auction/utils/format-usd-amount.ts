import { shorten } from "utils/number";

const formatUsdValue = (amount: number | undefined) => {
  return amount !== undefined ? `$${shorten(amount)}` : undefined;
};

export { formatUsdValue };
