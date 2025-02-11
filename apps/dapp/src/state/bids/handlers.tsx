import { useAtom } from "jotai";
import { StorageBid, UserStoredBids, userBidsAtom } from "./state";

/**
 * Stores an address' bids per auction
 * @see UserStoredBids
 * @see userBidsAtom
 */
export const useStoreBid = () => {
  const [addressMap, setAddressMap] = useAtom<UserStoredBids>(userBidsAtom);

  const storeBid = ({ address, auctionId, ...bid }: StorageBid) => {
    //Initializes each property
    const bidsPerAddress = addressMap[address] ?? {};
    const existingBids = bidsPerAddress[auctionId] ?? [];

    //Updates and stores the bid info
    bidsPerAddress[auctionId] = [...existingBids, bid];
    setAddressMap({
      ...addressMap,
      [address]: bidsPerAddress,
    });
  };

  return storeBid;
};

/** Gets the bids for a specific address and auction from storage */
export const useStorageBids = (
  info: Partial<Pick<StorageBid, "address" | "auctionId">>,
) => {
  const [addressMap] = useAtom(userBidsAtom);

  if (!info.address || !info.auctionId) return [];

  const bids = addressMap[info.address]?.[info.auctionId];

  return bids ?? [];
};
