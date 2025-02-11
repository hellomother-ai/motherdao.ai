//@ts-nocheck
import { AuctionType, type BatchAuction } from "@axis-finance/types";
import { getSettledAuctionPartialFillBidsMock } from "./bids-partial-fill";

const getSettledBatchAuctionMock = (
  overrides: Partial<BatchAuction> = {},
): BatchAuction =>
  ({
    auctionHouse: "0xba00001bd857efd2df10da01dfe3a97cfa836cc9",
    info: {
      description:
        "First. Just like all those annoying trolls on the internet.",
      links: [
        {
          linkId: "payoutTokenLogo",
          url: "https://www.logolynx.com/images/logolynx/68/68feadd5125aba3db46f1e4d77d54cfa.jpeg",
        },
        {
          linkId: "projectLogo",
          url: "https://img.freepik.com/free-vector/flat-number-one-winner-label-design_1017-32244.jpg?w=740&t=st=1715185386~exp=1715185986~hmac=f9630e845779292d5039214949a642ec96bbabd08f1da2bff8226e2c75124a43",
        },
        {
          linkId: "website",
          url: "https://numba.one",
        },
      ],
      name: "First Auction",
    },
    auctionType: AuctionType.SEALED_BID,
    baseToken: {
      address: "0xe4ea1b4d26211e4d8b6ad5bd3d9ead0bd79cf094",
      chainId: 168587773,
      decimals: 18,
      logoURI:
        "https://www.logolynx.com/images/logolynx/68/68feadd5125aba3db46f1e4d77d54cfa.jpeg",
      name: "First Token",
      symbol: "1ST",
      totalSupply: "100000",
    },
    bids: getSettledAuctionPartialFillBidsMock(),
    bidsClaimed: [
      {
        id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0-1",
      },
      {
        id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0-2",
      },
      {
        id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0-3",
      },
      {
        id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0-4",
      },
    ],
    bidsDecrypted: [
      {
        id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0-1",
      },
      {
        id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0-2",
      },
      {
        id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0-3",
      },
      {
        id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0-4",
      },
    ],
    bidsRefunded: [],
    capacity: "100000",
    capacityInitial: "100000",
    chain: "blast-sepolia",
    chainId: 168587773,
    conclusion: "1715274000",
    created: {
      infoHash: "QmSRziANpsUiBSqkWLyxTDeXMeND5SDzXPoZCdTJjtirJa",
    },
    createdBlockNumber: "5249677",
    createdBlockTimestamp: "1715186042",
    createdDate: "2024-05-08T16:34:02.000Z",
    createdTransactionHash:
      "0xbd13f3357d42d5281e984aa94914af37b8a2bf2e7c0e69125c9b5d94c5c60657",
    curated: null,
    curator: "0xb2cb64453632ed836876ff77b1dae40762f878a1",
    curatorApproved: false,
    curatorFee: "0.025",
    derivativeType: "01LIV",
    encryptedMarginalPrice: {
      hasPartialFill: true,
      id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0",
      marginalPrice: "1.111111111111111112",
      minBidSize: "0.01",
      minFilled: "50000",
      minPrice: "1",
      settlementSuccessful: true,
      status: "Settled",
    },
    formatted: {
      capacity: "100,000.00",
      cleared: true,
      endDate: new Date("2024-05-09T17:00:00.000Z"),
      endDistance: "6 days",
      endFormatted: "2024.05.09 - 18:00 GMT+1",
      marginalPrice: "1.11",
      minBidSize: "0.01",
      minPrice: "1.00",
      purchased: "111,111.11",
      rate: "1.11",
      sold: "100,000.00",
      startDate: new Date("2024-05-08T16:35:00.000Z"),
      startDistance: "7 days",
      startFormatted: "2024.05.08 - 17:35 GMT+1",
      tokenPairSymbols: "USDB/1ST",
      totalBidAmountFormatted: "202,467.80",
      totalBids: 4,
      totalBidsClaimed: 4,
      totalBidsDecrypted: 0,
      totalSupply: "100,000.00",
      uniqueBidders: 1,
    },
    id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0",
    lastUpdatedBlockNumber: "5295563",
    lastUpdatedBlockTimestamp: "1715277814",
    lastUpdatedDate: "2024-05-09T18:03:34.000Z",
    lastUpdatedTransactionHash:
      "0x33efebc3e3b2c54ca8d04c033f449ae7b604ea5cd8d411bcaf3c24814b5c7632",
    linearVesting: {
      expiryDate: "2024-05-11T17:00:00.000Z",
      expiryTimestamp: "1715446800",
      id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0",
      startDate: "2024-05-09T17:00:00.000Z",
      startTimestamp: "1715274000",
    },
    lotId: "0",
    maxBidId: "4",
    protocolFee: "0",
    purchased: "111111.111111111111200001",
    quoteToken: {
      address: "0x47F12ccE28D1A2ac9184777fa8a993C6067Df728",
      chainId: 168587773,
      decimals: 18,
      logoURI:
        "https://assets-global.website-files.com/65a6baa1a3f8ed336f415cb4/65c67eafd3569b7e2f834b8d_usdb-icon-yellow.svg",
      mintable: true,
      name: "Blast USD",
      symbol: "USDB",
    },
    referrerFee: "0.01",
    seller: "0x1409892e38974dd531be1a8fd6e31200358a8c5a",
    settled: {
      id: "blast-sepolia-0xba00001bd857efd2df10da01dfe3a97cfa836cc9-0",
    },
    sold: "100000",
    start: "1715186100",
    status: "settled",
    wrapDerivative: false,
    ...overrides,
  }) satisfies BatchAuction;

export { getSettledBatchAuctionMock };
