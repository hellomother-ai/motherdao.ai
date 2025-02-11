import AuctionListPage from "./auction-list-page";
import AuctionPage, { AuctionPageLoading } from "./auction-page";
import { useAuctionsV2 } from "modules/auction/hooks/use-auctionsv2";

export function PageBrancher() {
  const auctionQuery = useAuctionsV2();

  if (auctionQuery.isLoading) return <AuctionPageLoading />;

  if (auctionQuery.isMultiple) {
    return <AuctionListPage />;
  }

  const auction = auctionQuery.data[0];

  return <AuctionPage _auction={auction} />;
}
