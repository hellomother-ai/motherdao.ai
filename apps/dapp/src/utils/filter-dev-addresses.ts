import { NonNullSubgraphAuction } from "@axis-finance/types";
import { environment } from "utils/environment";

const devAddresses = [
  "0xb47c8e4beb28af80ede5e5bf474927b110ef2c0e",
  "0x62A665d3f9fc9a968dC35a789122981d9109349a",
].map((a) => a.toLowerCase());

export function filterDevAddressesOnTestnet(a: NonNullSubgraphAuction) {
  return (
    environment.isDevelopment || !devAddresses.includes(a.seller.toLowerCase())
  );
}
