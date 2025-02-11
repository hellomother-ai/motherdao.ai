import type { Chain } from "viem";

const lowerDashify = (str: string) => str.toLowerCase().replace(/ /g, "-");

const formatChainName = (chain: Chain) => {
  return lowerDashify(chain.name);
};

export { formatChainName, lowerDashify };
