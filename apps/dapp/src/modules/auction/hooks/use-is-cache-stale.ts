import { useMemo } from "react";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import type { MaybeOptimistic } from "@axis-finance/types";
import { isCacheStale } from "modules/auction/utils/is-cache-stale";

/**
 * Hook to check if the cache is stale for a given query key.
 *
 * @param queryKey The react-query query key to check if the cache is stale
 * @returns boolean Whether the cache is stale or not
 * @description
 * Don't fetch the auction if an optimistic update (e.g. a bid) is still fresh.
 * This allows the subgraph time to update before refetching.
 */
const useIsCacheStale = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();
  return useMemo(() => {
    const cachedAuctionData =
      queryClient.getQueryData<MaybeOptimistic>(queryKey);

    return isCacheStale(cachedAuctionData);
  }, [queryKey, queryClient]);
};

export { useIsCacheStale };
