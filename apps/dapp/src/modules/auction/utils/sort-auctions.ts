import { AuctionStatus, Auction } from "@axis-finance/types";

const status: { [key in AuctionStatus]: number } = {
  registering: 0,
  live: 1,
  created: 2,
  concluded: 3,
  decrypted: 4,
  settled: 5,
  cancelled: 6,
  aborted: 7,
};

/** Required fields for an auction to be comparable */
type SortableAuction = Pick<Auction, "status" | "start">;

/** Sorts an auction by status */
export function sortAuction(a: SortableAuction, b: SortableAuction) {
  if (a.status === b.status) return +b.start - +a.start;

  return status[a.status] - status[b.status];
}
