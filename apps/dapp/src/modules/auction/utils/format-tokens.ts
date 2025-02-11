import type { Address, Auction, Token, TokenBase } from "@axis-finance/types";
import { Token as SubgraphToken } from "@axis-finance/subgraph-client";
import { getChainId } from "utils/chain";
import { formatUnits } from "viem";
import { getLinkUrl } from "./auction-details";

type InputToken = Omit<SubgraphToken, "id" | "decimals" | "totalSupply"> & {
  decimals: number | string;
  totalSupply?: bigint | string | undefined;
};

type PartialAuction = Pick<Auction, "info" | "chain"> & {
  quoteToken?: InputToken;
  baseToken?: InputToken;
};

export function formatAuctionTokens(
  auction: PartialAuction,
  getToken: (token: TokenBase) => Token | undefined,
) {
  if (auction.quoteToken == null || auction.baseToken == null) return;

  const chainId = getChainId(auction.chain);

  const quoteToken =
    getToken({ address: auction.quoteToken.address as Address, chainId }) ??
    auction.quoteToken;

  const baseToken = {
    ...auction.baseToken,
    logoURI: getLinkUrl("payoutTokenLogo", auction),
  };

  return {
    baseToken: parseToken(baseToken, chainId),
    quoteToken: parseToken(quoteToken, chainId),
  };
}

export function parseToken(
  token: InputToken & {
    logoURI?: string | undefined;
  },
  chainId: number,
): Token {
  const totalSupply = token.totalSupply?.toString();

  return {
    ...token,
    totalSupply: totalSupply
      ? formatUnits(BigInt(totalSupply ?? ""), Number(token.decimals))
      : undefined,
    decimals: Number(token.decimals),
    address: token.address as Address,
    chainId,
  };
}
