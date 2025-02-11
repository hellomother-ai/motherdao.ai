import type { QueryClient, QueryKey } from "@tanstack/react-query";

/**
 * Takes an object and returns a new one with a timestamp property added.
 * This timestamp is used to determine when the optimistic update should be considered stale.
 * When its considered stale, the query client will refetch the data, instead of using the optimistic data.
 */
const attachTimestamp = (optimisticData: object) => {
  return { ...optimisticData, _lastOptimisticUpdateTimestamp: Date.now() };
};

/**
 * Updates the cached data of a query with optimistic data.
 *
 * @param queryClient The QueryClient instance
 * @param queryKey The query key of the data to update
 * @param updateFn The function that will update the current cached data
 */
const optimisticUpdate = async <TCachedData extends object>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  updateFn: (cachedData: TCachedData) => TCachedData,
) => {
  // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries({ queryKey });

  // Update and timestamp the new data to be included in the cache
  queryClient.setQueryData(queryKey, (cachedData: TCachedData) =>
    attachTimestamp(updateFn(cachedData)),
  );

  // The timestamp is referenced in subsequent queries to determine whether to refetch or use the optimistic data
};

export { optimisticUpdate };
