import { graphql, HttpResponse } from "msw";
import { stubGetAuctionLotsQuery } from "./stubs/get-auction-lots-query";
import { stubGetBatchAuctionLotQuery } from "./stubs/get-batch-auction-lot-query";
import { extractChainName } from "./utils";
import { getChainById } from "utils/chain";

export const handlers = [
  graphql.query("getAuctionLots", ({ variables }) => {
    const chain = getChainById(variables?.chainId);
    const chainName = chain?.name?.replace(/ /g, "-").toLowerCase();

    return HttpResponse.json({
      data: stubGetAuctionLotsQuery({ chain: chainName }),
    });
  }),
  graphql.query("getBatchAuctionLot", ({ variables }) => {
    const id = variables?.id;
    const chain = extractChainName(id);
    const lotId = id.substring(id.lastIndexOf("-") + 1);

    return HttpResponse.json({
      data: stubGetBatchAuctionLotQuery({ id, lotId, chain }),
    });
  }),
];
