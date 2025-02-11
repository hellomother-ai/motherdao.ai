import { deployments } from "@axis-finance/deployments";
import { chains } from "@axis-finance/env";
import { Chain } from "@axis-finance/types";

import { environment } from "utils/environment";

const activeChains = chains.activeChains(environment.isTestnet);

export const getBlockExplorer = (chain: Chain) => {
  return {
    name: chain.blockExplorers?.default.name,
    url: chain.blockExplorers?.default.url + "/",
    baseUrl: chain.blockExplorers?.default.url,
  };
};

/**
 * Map Rainbowkit chain names to their subgraph chain names.
 * Only used where there's discrepancies.
 */
const CHAIN_NAME_MAP = {
  arbitrum: "arbitrum-one",
  mode: "mode-mainnet",
  "mantle-sepolia": "mantle-sepolia-testnet",
} as const;

export function getChainId(chainName?: string): number {
  const lowerChainName =
    chainName?.toLowerCase() as keyof typeof CHAIN_NAME_MAP;
  const mappedName = CHAIN_NAME_MAP[lowerChainName] || lowerChainName;
  const name = mappedName?.replace(/-/g, " ");

  const chainId = activeChains.find(
    (c) => c.name.toLocaleLowerCase() === name?.toLocaleLowerCase(),
  )?.id;

  if (chainId === undefined) {
    throw new Error(`Chain ${chainName} is not supported`);
  }

  return chainId;
}

export function getChainById(chainId: number): Chain {
  const chain = activeChains.find((c) => c.id === chainId);

  if (!chain) throw new Error(`Unable to find chain ${chainId}`);

  return chain;
}

export function getDeploymentByChainId(chainId: number) {
  const deployment = deployments[chainId];

  if (!deployment)
    throw new Error(`Unable to find deployment for chainId ${chainId}`);

  return deployment;
}
