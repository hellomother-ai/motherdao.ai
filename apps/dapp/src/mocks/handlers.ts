import { graphql, HttpResponse } from "msw";
import { stubGetAuctionLotsQuery } from "./stubs/get-auction-lots-query";
import { stubGetBatchAuctionLotQuery } from "./stubs/get-batch-auction-lot-query";
import { extractChainName } from "./utils";
import { getChainById } from "utils/chain";

export const handlers = [
  graphql.query("getAuctionLots", ({ variables }) => {
    try {
      const chain = getChainById(variables?.chainId);
      if (!chain) {
        return HttpResponse.json(
          { errors: [{ message: "Invalid chain ID" }] },
          { status: 400 },
        );
      }

      const chainName = chain.name?.replace(/ /g, "-").toLowerCase();
      return HttpResponse.json({
        data: stubGetAuctionLotsQuery({ chain: chainName }),
      });
    } catch (error) {
      console.error("Error in getAuctionLots handler:", error);
      return HttpResponse.json(
        { errors: [{ message: "Internal server error" }] },
        { status: 500 },
      );
    }
  }),

  graphql.query("getBatchAuctionLot", ({ variables }) => {
    try {
      if (!variables?.id) {
        return HttpResponse.json(
          { errors: [{ message: "Missing ID parameter" }] },
          { status: 400 },
        );
      }

      const chain = extractChainName(variables.id);
      const lotId = variables.id.substring(variables.id.lastIndexOf("-") + 1);

      return HttpResponse.json({
        data: stubGetBatchAuctionLotQuery({ id: variables.id, lotId, chain }),
      });
    } catch (error) {
      console.error("Error in getBatchAuctionLot handler:", error);
      return HttpResponse.json(
        { errors: [{ message: "Internal server error" }] },
        { status: 500 },
      );
    }
  }),
];
