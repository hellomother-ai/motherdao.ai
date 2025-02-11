import { axisContracts } from "@axis-finance/deployments";
import { Address, CallbacksType } from "@axis-finance/types";
import { getCallbacks } from "utils/contracts";
import { toBasisPoints } from "utils/number";
import { formatUnits, parseUnits } from "viem";
import { useReadContract } from "wagmi";

type LotConfigurationStruct = {
  recipient: Address;
  lotCapacity: number;
  lotCuratorPayout: number;
  proceedsUtilisationPercent: number;
  vestingStart: number;
  vestingExpiry: number;
  linearVestingModule: Address;
  active: boolean;
  implParams: string;
};

const parseDTLParams = (
  baseTokenDecimals: number,
  data: readonly [
    `0x${string}`,
    bigint,
    bigint,
    number,
    number,
    number,
    `0x${string}`,
    boolean,
    `0x${string}`,
  ],
): LotConfigurationStruct => {
  return {
    recipient: data[0],
    lotCapacity: Number(formatUnits(data[1], baseTokenDecimals)),
    lotCuratorPayout: Number(formatUnits(data[2], baseTokenDecimals)),
    proceedsUtilisationPercent: toBasisPoints(data[3]),
    vestingStart: data[4],
    vestingExpiry: data[5],
    linearVestingModule: data[6],
    active: data[7],
    implParams: data[8],
  };
};

export function useBaseDTLCallback({
  chainId,
  lotId,
  baseTokenDecimals,
  callback,
}: {
  chainId?: number;
  lotId?: string;
  baseTokenDecimals: number;
  callback?: Address;
}) {
  // No point in calling lotConfiguration if it is not a base DTL callback
  const callbackLower = (callback || "").toLowerCase();
  const uniV2Dtl = getCallbacks(
    chainId || 0,
    CallbacksType.UNIV2_DTL,
  ).address.map((address: string) => address.toLowerCase());
  const uniV3Dtl = getCallbacks(
    chainId || 0,
    CallbacksType.UNIV3_DTL,
  ).address.map((address: string) => address.toLowerCase());

  const uniV3DtlWithAllowlist = getCallbacks(
    chainId || 0,
    CallbacksType.UNIV3_DTL_WITH_ALLOCATED_ALLOWLIST,
  ).address.map((address: string) => address.toLowerCase());

  const isBaseDTLCallback =
    uniV3DtlWithAllowlist.includes(callbackLower) ||
    uniV2Dtl.includes(callbackLower) ||
    uniV3Dtl.includes(callbackLower);

  const response = useReadContract({
    abi: axisContracts.abis.uniV2Dtl, // We can use this for all DTL callbacks, since the Uniswap V2 DTL does not have additional parameters
    address: callback,
    chainId,
    functionName: "lotConfiguration",
    args: [lotId ? parseUnits(lotId, 0) : BigInt(0)],
    query: {
      enabled: !!callback && !!lotId && !!chainId && isBaseDTLCallback,
    },
  });

  return {
    ...response,
    data: response.isSuccess
      ? parseDTLParams(baseTokenDecimals, response.data)
      : undefined,
  };
}
