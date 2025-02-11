import { PropsWithAuction } from "@axis-finance/types";
import { AuctionPurchase } from "../auction-purchase";

export function AuctionBaselineLive(props: PropsWithAuction) {
  return (
    <div className="auction-action-container">
      <AuctionPurchase auction={props.auction} />
    </div>
  );
}
