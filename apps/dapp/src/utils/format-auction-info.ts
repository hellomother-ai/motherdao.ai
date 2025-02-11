import { Auction } from "@axis-finance/types";

//Formats the links in the expected format
export function formatAuctionInfo(info: Auction["info"]) {
  if (!info?.links) return info;

  const links = Object.entries(info?.links).map(([key, value]) => ({
    linkId: key,
    url: value,
  }));

  return { ...info, links };
}
