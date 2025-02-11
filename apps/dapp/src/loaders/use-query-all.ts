import {
  RefetchOptions,
  UseQueryResult,
  useQueries,
} from "@tanstack/react-query";
import { Variables } from "graphql-request";
import {
  type QueryKeyFn,
  queryAllEndpoints,
} from "utils/subgraph/query-all-endpoints";

/** Queries all configured endpoints */
export function useQueryAll<TQuery>({
  document,
  variables,
  fields,
  queryKeyFn,
}: {
  document: string;
  variables?: Variables;
  queryKeyFn?: QueryKeyFn;
  fields: Array<QueryResultKey<TQuery>>;
}) {
  const queries = useQueries({
    queries: queryAllEndpoints<TQuery>({
      document,
      variables,
      queryKeyFn,
    }),
    combine: (responses) => {
      const filteredResponses = responses.filter(
        (response): response is UseQueryResult<TQuery> =>
          response?.data !== undefined,
      );

      return {
        data: concatSubgraphQueryResultArrays<TQuery, QueryResultKey<TQuery>>(
          filteredResponses,
          fields,
        ),
        queries: responses,
        refetch: (args?: RefetchOptions) =>
          responses.flatMap((r) => r.refetch(args)),
        isSuccess: responses.some((r) => r.isSuccess),
        isRefetching: responses.some((r) => r.isFetching),
        isLoading: responses.some((r) => r.isLoading),
        isError: responses.some((r) => r.isError),
        errors: responses.filter((r) => r.isError).map(({ error }) => error),
      };
    },
  });
  return queries;
}

type QueryResultKey<T> = keyof Omit<T, "__typename">;

export const concatSubgraphQueryResultArrays = <T, K extends QueryResultKey<T>>(
  queries: UseQueryResult<T, unknown>[],
  fieldNames: K[],
): Record<K, NonNullable<T[K]>[]> => {
  const result: Record<K, NonNullable<T[K]>[]> = {} as Record<
    K,
    NonNullable<T[K]>[]
  >;

  // Initialize each field with an empty array
  fieldNames.forEach((fieldName) => {
    result[fieldName] = [];
  });

  fieldNames.forEach((fieldName) => {
    const fieldArray = queries
      .filter((query) => !query.isError && query.data)
      .map((query) => (query.data as T)[fieldName])
      .filter(
        (item): item is NonNullable<T[K]> =>
          item !== undefined && item !== null,
      )
      .flat(); // Flatten the arrays

    result[fieldName] = fieldArray as NonNullable<T[K]>[];
  });

  return result;
};
