import { encodeAbiParameters } from "viem";

const VestingParamsAbiType = [
  {
    name: "VestingParams",
    type: "tuple",
    components: [
      { name: "start", type: "uint48" },
      { name: "expiry", type: "uint48" },
    ],
  },
] as const;

type VestingParams = {
  start: number;
  expiry: number;
};

export function getLinearVestingParams(params: VestingParams) {
  return encodeAbiParameters(VestingParamsAbiType, [params]);
}
