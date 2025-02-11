import { Variables } from "graphql-request";
import type { QueryKey } from "@tanstack/react-query";
import { environment } from "utils/environment";
import {
  type AxisDeployment,
  mainnetDeployments,
  testnetDeployments,
} from "@axis-finance/deployments";
import { request } from "./request";
import { useIsCacheStale } from "modules/auction/hooks/use-is-cache-stale";

const isTestnet = environment.isTestnet;
const endpoints = isTestnet ? testnetDeployments : mainnetDeployments;

type QueryKeyFn = (deployment: AxisDeployment) => QueryKey;

type QueryAllEndpointsParams = {
  document: string;
  variables?: Variables;
  queryKeyFn?: QueryKeyFn;
};

export function queryAllEndpoints<TQuery>({
  document,
  variables = {},
  queryKeyFn,
}: QueryAllEndpointsParams) {
  return endpoints.map((deployment) => {
    const { subgraphURL: url } = deployment;
    const queryKey = queryKeyFn
      ? queryKeyFn(deployment)
      : [url, document, variables];

    const enabled = useIsCacheStale(queryKey);

    return {
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey,
      queryFn: () =>
        request<TQuery>(url, document, {
          ...variables,
          deploymentName: deployment.name,
        }),
      enabled,
    };
  });
}

export type { QueryKeyFn, QueryKey };
