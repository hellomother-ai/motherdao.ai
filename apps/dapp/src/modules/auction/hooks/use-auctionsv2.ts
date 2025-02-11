import type { Auction, GetAuctionLots } from "@axis-finance/types";
import {
  useLaunchByAddressQuery,
  useLaunchesQuery,
} from "@axis-finance/sdk/react";
import { getAuctionStatus } from "modules/auction/utils/get-auction-status";
import { sortAuction } from "modules/auction/utils/sort-auctions";
import { formatAuctionTokens } from "modules/auction/utils/format-tokens";
import { getAuctionType } from "modules/auction/utils/get-auction-type";
import { getChainId } from "src/utils/chain";
import { useTokenLists } from "state/tokenlist";
import { useQueryAll } from "loaders/use-query-all";
import { useSafeRefetch } from "./use-safe-refetch";
import { environment } from "utils/environment";
import {
  AUCTION_CHAIN_ID,
  AUCTION_TOKEN_ADDRESS,
} from "../../../../../../app-config";

export type AuctionsResult = {
  data: Auction[];
  refetch: () => void;
  isMultiple: boolean;
} & Pick<
  ReturnType<typeof useQueryAll>,
  "isSuccess" | "isLoading" | "isRefetching"
>;

export const getAuctionsQueryKey = (chainId: number) =>
  ["auctions", chainId] as const;

export function useAuctionsV2(): AuctionsResult {
  const { data, isLoading, isSuccess, isRefetching } = useLaunchByAddressQuery(
    AUCTION_CHAIN_ID,
    AUCTION_TOKEN_ADDRESS,
  );
  console.log({ data, isLoading });

  // Refetch auctions if the cache is stale
  const refetch = useSafeRefetch(["auctions"]);

  // Filter out cancelled auctions
  const filteredAuctions =
    data?.batchAuctionLots.filter(
      (auction) => getAuctionStatus(auction) !== "cancelled",
    ) ?? [];

  const { getToken } = useTokenLists();

  const auctions = filteredAuctions
    .map((auction) => {
      const type = getAuctionType(auction.auctionType);
      if (!type) {
        throw new Error(`Type not found for auction ${auction.auctionType}`);
      }

      const chainId = getChainId(auction.chain);

      const preparedAuction = {
        ...auction,
        auctionType: type,
        ...formatAuctionTokens(auction, getToken),
        status: getAuctionStatus(auction),
        chainId,
      };

      return preparedAuction as Auction;
    })
    .sort(sortAuction);

  return {
    data: auctions as Auction[],
    isLoading,
    refetch,
    isRefetching,
    isSuccess,
    isMultiple: auctions.length > 1,
  };
}
