import type {
  BatchAuctionLot,
  GetBatchAuctionLotQuery,
} from "@axis-finance/subgraph-client";

export const stubGetBatchAuctionLotQuery = (
  overrides: Pick<BatchAuctionLot, "id" | "lotId" | "chain">,
): GetBatchAuctionLotQuery => {
  const { id, lotId, chain } = overrides;

  return {
    batchAuctionLot: {
      id,
      chain,
      auctionHouse: "0xba0000ac450437406583980336fe93ab2752999f",
      aborted: null,
      cancelled: null,
      lotId,
      createdBlockNumber: "9567262",
      createdBlockTimestamp: "1723821212",
      createdDate: "2024-08-16T15:13:32.000Z",
      createdTransactionHash:
        "0x0638a2a2dce4de91bbe0572bc0ed8189900e72d6286fb0a5b909724886c7b9c9",
      capacityInitial: "1111",
      start: "1723821300",
      info: {
        allowlist: [],
        key: null,
        name: "DingDAO",
        description: "The sound we know and love",
        tagline: "Ding ding ding",
        links: [
          {
            linkId: "discord",
            url: "https://google.com",
          },
          {
            linkId: "farcaster",
            url: "https://google.com",
          },
          {
            linkId: "payoutTokenLogo",
            url: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_gradient_48px-512.png",
          },
          {
            linkId: "projectBanner",
            url: "https://blog.adobe.com/en/publish/2021/08/17/media_1faf68d6c67e20f5e45d65217e0d013dcfe537263.png?width=750&format=png&optimize=medium",
          },
          {
            linkId: "projectLogo",
            url: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_gradient_48px-512.png",
          },
          {
            linkId: "twitter",
            url: "https://google.com",
          },
          {
            linkId: "website",
            url: "https://google.com",
          },
        ],
      },
      conclusion: "3000000000",
      auctionType: "01EMPA",
      seller: "0xc4a209cf95b9d6aca011aa37b5cfd6f40d29890f",
      derivativeType: null,
      wrapDerivative: false,
      callbacks: "0x0000000000000000000000000000000000000000",
      curatorApproved: false,
      curatorFee: "0",
      protocolFee: "0",
      referrerFee: "0",
      capacity: "1111",
      sold: "0",
      purchased: "0",
      lastUpdatedBlockNumber: "9567262",
      lastUpdatedBlockTimestamp: "1723821212",
      lastUpdatedDate: "2024-08-16T15:13:32.000Z",
      lastUpdatedTransactionHash:
        "0x0638a2a2dce4de91bbe0572bc0ed8189900e72d6286fb0a5b909724886c7b9c9",
      linearVesting: null,
      baseToken: {
        totalSupply: "11000000000000000000000000",
        address: "0xb24d0b6ae015dc6fd279e330db101bb890d8060c",
        decimals: "18",
        symbol: "SLO",
        name: "Stormlight Orbs",
      },
      quoteToken: {
        address: "0x47f12cce28d1a2ac9184777fa8a993c6067df728",
        decimals: "18",
        symbol: "USDB",
        name: "USDB",
      },
      created: {
        infoHash: "QmfAj4n1CxG8BfkpsrQBa3cFbPuw4FveDS4ZYQxyEgV6WK",
      },
      curated: null,
      maxBidId: "0",
      bids: [],
      bidsDecrypted: [],
      bidsClaimed: [],
      bidsRefunded: [],
      encryptedMarginalPrice: {
        id,
        status: "created",
        settlementSuccessful: false,
        minPrice: "1",
        minFilled: "555.5",
        minBidSize: "10",
        marginalPrice: null,
        hasPartialFill: null,
      },
      fixedPrice: null,
      settled: null,
    },
  };
};
