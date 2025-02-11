import type { MaybeOptimistic } from "@axis-finance/types";

const STALE_DURATION_AFTER_OPTIMISTIC_UPDATE = 10_000; // 10k ms = 10 seconds

/**
 * Check if the optimistic stale time of the supplied cache has expired.
 */
const isCacheStale = (
  cache?: MaybeOptimistic,
  staleTime: number = STALE_DURATION_AFTER_OPTIMISTIC_UPDATE,
) => {
  // The cache may not have been optimistically updated - consider it stale
  if (
    !cache?._lastOptimisticUpdateTimestamp ||
    !Number.isInteger(cache._lastOptimisticUpdateTimestamp)
  ) {
    return true;
  }

  const timeSincePrevUpdate = Date.now() - cache._lastOptimisticUpdateTimestamp;

  return timeSincePrevUpdate >= staleTime;
};

export { isCacheStale };
