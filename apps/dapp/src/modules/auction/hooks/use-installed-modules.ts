import {
  GetInstalledModulesDocument,
  GetInstalledModulesQuery,
} from "@axis-finance/subgraph-client";
import { useQueryAll } from "loaders/use-query-all";
import { fromHex, isHex } from "viem";

/** Fetches information about the installed modules for all Auction Houses */
export function useInstalledModules() {
  const { data: result, ...status } = useQueryAll<GetInstalledModulesQuery>({
    document: GetInstalledModulesDocument,
    fields: ["auctionHouseModuleInstalleds"],
  });

  const data = result.auctionHouseModuleInstalleds
    .flat()
    .map(({ keycode, ...module }) => ({
      ...module,
      keycode: isHex(keycode) ? fromHex(keycode, "string") : keycode,
    }));

  return { data, ...status };
}
