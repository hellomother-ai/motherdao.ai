import AuctionListPage from "./auction-list-page";
import AuctionPage, { AuctionPageLoading } from "./auction-page";
import { useAuctions } from "modules/auction/hooks/use-auctions";

export function PageBrancher() {
  const auctionQuery = useAuctions();

  if (auctionQuery.isLoading) return <AuctionPageLoading />;

  if (auctionQuery.isMultiple) {
    return <AuctionListPage />;
  }

  const auction = auctionQuery.data[0];

  return <AuctionPage _auction={auction} />;
}
