import { Address, encodeAbiParameters, isHex } from "viem";
const fixedPriceParams = [
  {
    name: "params_",
    internalType: "struct Router.PurchaseParams",
    type: "tuple",
    components: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "referrer", internalType: "address", type: "address" },
      { name: "lotId", internalType: "uint96", type: "uint96" },
      { name: "amount", internalType: "uint96", type: "uint96" },
      { name: "minAmountOut", internalType: "uint96", type: "uint96" },
      { name: "auctionData", internalType: "bytes", type: "bytes" },
      { name: "permit2Data", internalType: "bytes", type: "bytes" },
    ],
  },
];

export function getFixedPricePurchaseParams(params: {
  recipient: Address;
  referrer: Address;
  lotId: string | bigint;
  amount: bigint;
  minAmountOut: bigint;
  permit2Data?: string;
}) {
  return encodeAbiParameters(fixedPriceParams, [
    {
      recipient: params.recipient,
      referrer: params.referrer,
      lotId: BigInt(params.lotId),
      amount: params.amount,
      minAmountOut: params.minAmountOut,
      permit2Data: isHex(params.permit2Data) ? params.permit2Data : "0x",
      auctionData: "0x", //Not used in FPAM
    },
  ]);
}
