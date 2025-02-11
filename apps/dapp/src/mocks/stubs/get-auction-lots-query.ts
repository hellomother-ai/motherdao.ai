import type { GetAuctionLotsQuery } from "@axis-finance/subgraph-client";
import { allowedCurators } from "modules/app/curators";

const allowedCurator = allowedCurators[0].address[0];

export const stubGetAuctionLotsQuery = (
  overrides: Pick<GetAuctionLotsQuery["batchAuctionLots"][0], "chain">,
): GetAuctionLotsQuery => {
  const { chain } = overrides;

  return {
    batchAuctionLots: [
      {
        id: `${chain}-0xba00000d23a0793d5601d1e8e7b32ae88642cbef-0`,
        chain: chain,
        auctionHouse: "0xba00000d23a0793d5601d1e8e7b32ae88642cbef",
        aborted: null,
        cancelled: null,
        lotId: "0",
        createdBlockNumber: "9622971",
        createdBlockTimestamp: "1720790615",
        createdDate: "2024-07-12T13:23:35.000Z",
        createdTransactionHash:
          "0x2ebbd4610b702225fe47949345cbd43d4e0a432cba1365008908d1a2ab50b919",
        capacityInitial: "1111",
        start: "1720790700",
        info: {
          key: null,
          name: `${chain} dao 1`,
          description: "We are the 1st dao",
          tagline: "First the best, second the worst.",
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
              url: "http://google.com",
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
        derivativeType: "01LIV",
        wrapDerivative: false,
        callbacks: "0x0000000000000000000000000000000000000000",
        curator: allowedCurator,
        curatorApproved: false,
        curatorFee: "0",
        protocolFee: "0",
        referrerFee: "0.005",
        capacity: "1111",
        sold: "0",
        purchased: "0",
        lastUpdatedBlockNumber: "9622971",
        lastUpdatedBlockTimestamp: "1720790615",
        lastUpdatedDate: "2024-07-12T13:23:35.000Z",
        lastUpdatedTransactionHash:
          "0x2ebbd4610b702225fe47949345cbd43d4e0a432cba1365008908d1a2ab50b919",
        linearVesting: {
          id: `${chain}-0x16d5aab9d35f8b3ac7bd086eedcce5343682d5f0-84601328808694331776221266022476873063549915229000078117390856895594016393249`,
          startDate: "2024-07-13T13:30:00.000Z",
          expiryDate: "2024-07-14T13:30:00.000Z",
          startTimestamp: "1720877400",
          expiryTimestamp: "1720963800",
          redemptions: [],
        },
        baseToken: {
          totalSupply: "10000000000000000000000",
          address: "0xc83696ec858e370fb9e109ce141c4c86cb705a73",
          decimals: "18",
          symbol: "WETH",
          name: "WETH",
        },
        quoteToken: {
          address: "0x831b513392cd10d7720380f877383ee8ed543f0f",
          decimals: "18",
          symbol: "USDC",
          name: "USDC",
        },
        created: {
          infoHash: "QmTrXE3Lc2nNBCgSE5JP5yhkHkxc2vrws46EWdNyiz3bhF",
        },
        curated: null,
        maxBidId: "0",
        bids: [],
        bidsDecrypted: [],
        bidsClaimed: [],
        bidsRefunded: [],
        encryptedMarginalPrice: {
          id: `${chain}-0xba00000d23a0793d5601d1e8e7b32ae88642cbef-0`,
          status: "created",
          settlementSuccessful: false,
          minPrice: "1",
          minFilled: "277.75",
          minBidSize: "2",
          marginalPrice: null,
          hasPartialFill: null,
        },
        fixedPrice: null,
        settled: null,
      },
      {
        id: `${chain}-0xba00000d23a0793d5601d1e8e7b32ae88642cbef-1`,
        chain: chain,
        auctionHouse: "0xba00000d23a0793d5601d1e8e7b32ae88642cbef",
        aborted: null,
        cancelled: null,
        lotId: "1",
        createdBlockNumber: "9629949",
        createdBlockTimestamp: "1720804571",
        createdDate: "2024-07-12T17:16:11.000Z",
        createdTransactionHash:
          "0x4117463a5bdb4401244c0fb41a01eacffa9811ed2f9f6c8217026acf76db44d1",
        capacityInitial: "111",
        start: "1720805024",
        info: {
          key: null,
          name: `${chain} dao 2`,
          description: "We are the 2nd dao",
          tagline: "First the worst, second the best.",
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
              url: "https://google.com",
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
        auctionType: "01FPBA",
        seller: "0xc4a209cf95b9d6aca011aa37b5cfd6f40d29890f",
        derivativeType: "01LIV",
        wrapDerivative: false,
        callbacks: "0x0000000000000000000000000000000000000000",
        curator: allowedCurator,
        curatorApproved: false,
        curatorFee: "0",
        protocolFee: "0",
        referrerFee: "0.005",
        capacity: "111",
        sold: "0",
        purchased: "0",
        lastUpdatedBlockNumber: "9629949",
        lastUpdatedBlockTimestamp: "1720804571",
        lastUpdatedDate: "2024-07-12T17:16:11.000Z",
        lastUpdatedTransactionHash:
          "0x4117463a5bdb4401244c0fb41a01eacffa9811ed2f9f6c8217026acf76db44d1",
        linearVesting: {
          id: `${chain}-0x16d5aab9d35f8b3ac7bd086eedcce5343682d5f0-84417514182300441706473291024949819949834023725031054102740652292628703704288`,
          startDate: "2024-07-13T19:00:00.000Z",
          expiryDate: "2024-07-14T19:00:00.000Z",
          startTimestamp: "1720897200",
          expiryTimestamp: "1720983600",
          redemptions: [],
        },
        baseToken: {
          totalSupply: "10000000000000000000000",
          address: "0x831b513392cd10d7720380f877383ee8ed543f0f",
          decimals: "18",
          symbol: "USDC",
          name: "USDC",
        },
        quoteToken: {
          address: "0x831b513392cd10d7720380f877383ee8ed543f0f",
          decimals: "18",
          symbol: "USDC",
          name: "USDC",
        },
        created: {
          infoHash: "QmVNHnvSMjeDos3MKXV2ZzwpDYfdcFHhrvYf9Em1r14d1m",
        },
        curated: null,
        maxBidId: "0",
        bids: [],
        bidsDecrypted: [],
        bidsClaimed: [],
        bidsRefunded: [],
        encryptedMarginalPrice: null,
        fixedPrice: {
          id: `${chain}-0xba00000d23a0793d5601d1e8e7b32ae88642cbef-1`,
          status: "created",
          settlementSuccessful: false,
          price: "1",
          minFilled: "55.5",
          hasPartialFill: null,
          partialBidId: null,
        },
        settled: null,
      },
    ],
  };
};
