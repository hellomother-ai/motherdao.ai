import {
  type BatchAuction,
  type Auction,
  type AuctionDerivativeTypes,
  type AuctionLinkId,
  AuctionType,
  CallbacksType,
} from "@axis-finance/types";

const getPrice = (auction: BatchAuction): number | undefined => {
  if (auction.auctionType === AuctionType.FIXED_PRICE_BATCH) {
    return Number(auction.fixedPrice?.price);
  }

  if (auction.auctionType === AuctionType.SEALED_BID) {
    return Number(auction.encryptedMarginalPrice?.minPrice);
  }

  return undefined;
};

const getMinFilled = (auction: BatchAuction): number | undefined => {
  if (auction.auctionType === AuctionType.FIXED_PRICE_BATCH) {
    return Number(auction.fixedPrice?.minFilled);
  }

  if (auction.auctionType === AuctionType.SEALED_BID) {
    return Number(auction.encryptedMarginalPrice?.minFilled);
  }

  return undefined;
};

type PartialAuction = Pick<Auction, "info">;

const getLinkUrl = (id: AuctionLinkId, auction: PartialAuction) => {
  return auction?.info?.links?.find?.((link) => link.linkId === id)?.url;
};

const hasDerivative = (
  derivativeType: AuctionDerivativeTypes,
  auction: BatchAuction,
): boolean => {
  if (typeof auction?.derivativeType !== "string") {
    return false;
  }

  const auctionDerivativeType = auction.derivativeType.slice(-3);
  return auctionDerivativeType.toLowerCase() === derivativeType.toLowerCase();
};

const isAllowlistCallback = (callback: CallbacksType) => {
  return callback.toLowerCase().includes("allowlist");
};

export {
  getPrice,
  getMinFilled,
  getLinkUrl,
  hasDerivative,
  isAllowlistCallback,
};
