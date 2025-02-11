import type { Address, Curator } from "@axis-finance/types";

export const allowedCurators: Curator[] = [
  {
    id: "baseline",
    name: "Baseline Markets",
    type: "platform",
    address: [
      "0x93d2f6a92af6add436df7ba185dd736ec13f0aaa",
      "0x32f33a14e36cb75b3f58e1822418599e3f075ffb",
      "0x82A22117b8A0AD72628Bf4b01BF822aeea88B9b3",
    ].map((s) => s.toLowerCase() as Address),
    twitter: "baselinemarkets",
    website: "https://www.baseline.markets/",
    avatar: "/images/baseline-markets.png",
    banner:
      "https://pbs.twimg.com/profile_banners/1617681275791486976/1732350035/1500x500",
    description:
      "Baseline creates tokens with programmatic liquidity and rising floor prices. Their innovative tokenomics system combines automated market-making with built-in protections to ensure sustainable value growth through all market conditions.",
  },
  {
    id: "alea",
    name: "Alea Research",
    type: "curator",
    address: "0x63c4fC41B61853997d51b73419a5Cf41C4be1A6F",
    twitter: "AleaResearch",
    website: "https://alearesearch.io/",
    avatar:
      "https://pbs.twimg.com/profile_images/1869342428425326592/iR5wmV-L_400x400.jpg",
    banner:
      "https://pbs.twimg.com/profile_banners/1555515751267811328/1734522223/1500x500",
    description:
      "Unbiased research for a decisive edge in crypto. Trusted by 10,000+ serious investors.",
    reportURL:
      "https://revelointel.com/wp-content/uploads/2024/08/Aurelius-Finance-Overview-by-Revelo-Intel.pdf",
    options: {
      hideName: true,
    },
  },
];

export const allowedCuratorAddresses: string[] = allowedCurators
  .flatMap((c) => c.address)
  .map((c) => c.toLowerCase());

export const getCurator = (address: Address | string) => {
  const targetAddress = address.toLowerCase();

  return allowedCurators.find((c) => {
    if (Array.isArray(c.address)) {
      return c.address
        .map((a: Address) => a.toLowerCase())
        .includes(targetAddress);
    }
    return c.address.toLowerCase() === targetAddress;
  });
};
