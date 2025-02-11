import { useCallback } from "react";
import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useIsCacheStale } from "./use-is-cache-stale";

/**
 * Refetches the query if the query is stale.
 *
 * @param queryKey The react-query query key to check if the cache is stale
 * @returns A function which refetches the query if the cache is stale
 * @description Prevents refetching if the cache isn't stale yet (due to optimistic updates)
 */
const useSafeRefetch = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();
  const isCacheStale = useIsCacheStale(queryKey);

  return useCallback(() => {
    if (!isCacheStale) return;

    queryClient.invalidateQueries({
      queryKey,
      refetchType: "all",
    });
  }, [queryKey, queryClient, isCacheStale]);
};

export { useSafeRefetch };
