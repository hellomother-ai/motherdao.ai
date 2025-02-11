export type AuctionPathParams = {
  chainId: string | number;
  lotId: string | number;
};

/** Contructs the URL path to an auction*/
export function getAuctionPath(auctionParams: AuctionPathParams) {
  return `/${auctionParams.chainId}/${auctionParams.lotId}`;
}
