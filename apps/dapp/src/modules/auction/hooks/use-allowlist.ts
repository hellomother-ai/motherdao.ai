import {
  encodeAbiParameters,
  parseAbiParameters,
  formatUnits,
  parseUnits,
  toHex,
  zeroAddress,
  erc20Abi,
} from "viem";
import { UseQueryResult } from "@tanstack/react-query";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import {
  GetAuctionAllowlistQuery,
  useGetAuctionAllowlistQuery,
} from "@axis-finance/subgraph-client";
import { Auction, CallbacksType } from "@axis-finance/types";
import { axisContracts, deployments } from "@axis-finance/deployments";
import { fetchParams } from "utils/fetch";
import { getCallbacksType } from "../utils/get-callbacks-type";
import { isAllowlistCallback } from "../utils/auction-details";

export type AllowlistResult = {
  canBid: boolean;
  amountLimited: boolean;
  limit: bigint; // number of quote tokens as a formatted string
  criteria: string;
  callbackData: `0x${string}`;
  allocation?: string;
};

export function useAllowlist(auction: Auction): AllowlistResult {
  // Load the currently connected wallet address
  const account = useAccount();
  const user = account.address ?? zeroAddress;

  // If the auction has a custom callback it could be an allowlist so give it the benefit of the doubt
  const callbacksType = getCallbacksType(auction);
  const isCustomCallback = callbacksType === CallbacksType.CUSTOM;
  // Determine if the allowlist is defined in the external data
  const shouldFetchAllowList =
    isAllowlistCallback(callbacksType) || isCustomCallback;

  // Fetch allow list for this auction from the subgraph
  const {
    data: auctionWithAllowlist,
  }: UseQueryResult<GetAuctionAllowlistQuery> = useGetAuctionAllowlistQuery(
    {
      endpoint: deployments[auction.chainId!].subgraphURL,
      fetchParams,
    },
    { id: auction.id! },
    {
      enabled: !!auction?.chainId && !!auction?.id && shouldFetchAllowList,
    },
  );
  const allowlist =
    auctionWithAllowlist?.batchAuctionLot?.info?.allowlist.map(
      (list) => list.values,
    ) ?? [];

  // Check if the callback type is an allowlist, if not return default values
  const isMerkle =
    callbacksType === CallbacksType.MERKLE_ALLOWLIST ||
    callbacksType === CallbacksType.CAPPED_MERKLE_ALLOWLIST ||
    callbacksType === CallbacksType.ALLOCATED_MERKLE_ALLOWLIST ||
    callbacksType === CallbacksType.UNIV3_DTL_WITH_ALLOCATED_ALLOWLIST ||
    callbacksType === CallbacksType.BASELINE_ALLOWLIST ||
    callbacksType === CallbacksType.BASELINE_ALLOCATED_ALLOWLIST ||
    callbacksType === CallbacksType.BASELINE_CAPPED_ALLOWLIST;

  const hasLimit =
    callbacksType === CallbacksType.CAPPED_MERKLE_ALLOWLIST ||
    callbacksType === CallbacksType.UNIV3_DTL_WITH_ALLOCATED_ALLOWLIST ||
    callbacksType === CallbacksType.ALLOCATED_MERKLE_ALLOWLIST;

  const hasLimitBaseline =
    callbacksType === CallbacksType.BASELINE_ALLOCATED_ALLOWLIST ||
    callbacksType === CallbacksType.BASELINE_CAPPED_ALLOWLIST;

  const isBaseline =
    callbacksType === CallbacksType.BASELINE_ALLOWLIST ||
    callbacksType === CallbacksType.BASELINE_ALLOCATED_ALLOWLIST ||
    callbacksType === CallbacksType.BASELINE_CAPPED_ALLOWLIST ||
    callbacksType === CallbacksType.BASELINE_TOKEN_ALLOWLIST;

  // Set default values for the return variables
  let canBid = false;
  let amountLimited = false;
  let limit = BigInt(0);
  let userAllocation = "";
  let criteria = "";
  let callbackData = toHex("");

  // Use hooks before conditional logic

  // Obtain the lotId for the baseline allowlist
  const { data: baselineLotId } = useReadContract({
    abi: axisContracts.abis.baselineAllowlist,
    address: auction.callbacks,
    functionName: "lotId",
    args: [],
    query: { enabled: isBaseline },
  });
  const baselineLotIdMatches = baselineLotId == parseUnits(auction.lotId, 0);

  // Query the amount the user has already spent from the contract
  let { data: spent } = useReadContract({
    abi: axisContracts.abis.cappedMerkleAllowlist, // we can use this ABI for both capped and allocated allowlists since they have the same function signature
    address: auction.callbacks,
    functionName: "lotBuyerSpent",
    args: [parseUnits(auction.lotId, 0), user],
    query: { enabled: hasLimit },
  });
  const { data: spentBaseline } = useReadContract({
    abi: axisContracts.abis.baselineAllocatedAllowlist,
    address: auction.callbacks,
    functionName: "buyerSpent",
    args: [user],
    query: { enabled: hasLimitBaseline && baselineLotIdMatches },
  });
  spent = spent ?? spentBaseline ?? BigInt(0);

  // For capped allowlists, the global per user limit is also on the contract
  let { data: cap } = useReadContract({
    abi: axisContracts.abis.cappedMerkleAllowlist,
    address: auction.callbacks,
    functionName: "lotBuyerLimit",
    args: [parseUnits(auction.lotId, 0)],
    query: {
      enabled: callbacksType === CallbacksType.CAPPED_MERKLE_ALLOWLIST,
    },
  });
  const { data: capBaseline } = useReadContract({
    abi: axisContracts.abis.baselineCappedAllowlist,
    address: auction.callbacks,
    functionName: "buyerLimit",
    args: [],
    query: {
      enabled:
        callbacksType === CallbacksType.BASELINE_CAPPED_ALLOWLIST &&
        baselineLotIdMatches,
    },
  });
  cap = cap ?? capBaseline ?? BigInt(0);

  // Get the token contract and balance threshold from the callback contract
  const { data: callbackResponse } = useReadContract({
    abi: axisContracts.abis.tokenAllowlist,
    address: auction.callbacks,
    functionName: "lotChecks",
    args: [parseUnits(auction.lotId, 0)],
    query: { enabled: callbacksType === CallbacksType.TOKEN_ALLOWLIST },
  });
  const { data: callbackResponseBaseline } = useReadContract({
    abi: axisContracts.abis.baselineTokenAllowlist,
    address: auction.callbacks,
    functionName: "tokenCheck",
    args: [],
    query: {
      enabled:
        callbacksType === CallbacksType.BASELINE_TOKEN_ALLOWLIST &&
        baselineLotIdMatches,
    },
  });
  const [tokenAddress, threshold] = callbackResponse ??
    callbackResponseBaseline ?? [zeroAddress, BigInt(0)];

  const tokenContract = {
    address: tokenAddress,
    abi: erc20Abi,
  };

  const { data } = useReadContracts({
    contracts: [
      {
        ...tokenContract,
        functionName: "balanceOf",
        args: [user],
      },
      {
        ...tokenContract,
        functionName: "decimals",
      },
      {
        ...tokenContract,
        functionName: "symbol",
      },
    ],
    query: {
      select: (data) => data.map((r) => r.result) as [bigint, bigint, string],
      enabled: callbacksType === CallbacksType.TOKEN_ALLOWLIST,
    },
  });

  const [balance, decimals, symbol] = data ?? [BigInt(0), BigInt(0), ""];

  // Set values based on conditional logic

  // For merkle allowlists, we need to check if the user is on the allowlist
  // These expect that the allowlist has been stored in JSON stored in IPFS
  if (isMerkle) {
    // Check if the account is on the allowlist
    canBid =
      allowlist
        .map((entry: string[]) => entry[0].toLowerCase() === user.toLowerCase())
        .reduce((acc: boolean, curr: boolean) => acc || curr, false) ?? false;

    criteria = "users that are on the allowlist provided by the seller";

    // Get the merkle proof and limit for the user if they can bid
    if (canBid) {
      // Handle conditional logic for the different allowlist types and set the callback data
      switch (callbacksType) {
        case CallbacksType.MERKLE_ALLOWLIST:
        case CallbacksType.BASELINE_ALLOWLIST: {
          // Generate the proof for inclusion in callback data
          const tree = StandardMerkleTree.of(allowlist, ["address"]);
          const proof = tree.getProof([user]) as `0x${string}`[];
          callbackData = encodeAbiParameters(parseAbiParameters("bytes32[]"), [
            proof,
          ]);
          break;
        }
        case CallbacksType.CAPPED_MERKLE_ALLOWLIST:
        case CallbacksType.BASELINE_CAPPED_ALLOWLIST: {
          // For capped allowlists, the user's limit is the global limit minus what they've already spent
          amountLimited = true;
          limit = (cap ?? BigInt(0)) - spent;

          // Generate the proof for inclusion in callback data
          const tree = StandardMerkleTree.of(allowlist, ["address"]);
          const proof = tree.getProof([user]) as `0x${string}`[];
          callbackData = encodeAbiParameters(parseAbiParameters("bytes32[]"), [
            proof,
          ]);
          break;
        }
        case CallbacksType.UNIV3_DTL_WITH_ALLOCATED_ALLOWLIST:
        case CallbacksType.ALLOCATED_MERKLE_ALLOWLIST:
        case CallbacksType.BASELINE_ALLOCATED_ALLOWLIST: {
          // For allocated allowlists, the user's limit is in the allowlist
          amountLimited = true;

          // Get the allocation and calculate their remaining limit from that
          const allocation =
            allowlist.find(
              (entry: string[]) =>
                entry[0].toLowerCase() === user?.toLowerCase(),
            )?.[1] ?? "0";

          limit = BigInt(allocation) - spent;
          userAllocation = allocation;

          // Generate the proof for inclusion in callback data
          const tree = StandardMerkleTree.of(allowlist, ["address", "uint256"]);
          const proof = tree.getProof([user, allocation]) as `0x${string}`[];
          callbackData = encodeAbiParameters(
            parseAbiParameters("bytes32[] proof,uint256 allocation"),
            [proof, BigInt(allocation)],
          );
          break;
        }
        default: {
          // This should never happen
          break;
        }
      }
    }

    return {
      canBid,
      amountLimited,
      limit,
      criteria,
      callbackData,
      allocation: userAllocation,
    };
  }

  // For token allowlists, we need to check if the user has enough tokens to bid and set values
  if (
    callbacksType === CallbacksType.TOKEN_ALLOWLIST ||
    callbacksType === CallbacksType.BASELINE_TOKEN_ALLOWLIST
  ) {
    // Check if the user has enough tokens to bid
    canBid = balance >= threshold;

    criteria = `users that have at least ${formatUnits(
      threshold,
      Number(decimals),
    )} ${symbol} in their wallet`;

    return { canBid, amountLimited, limit: BigInt(0), criteria, callbackData };
  }

  // Auction is public and doesn't have an allowlist
  return {
    canBid: true,
    amountLimited,
    limit: BigInt(0),
    criteria,
    callbackData,
    allocation: userAllocation,
  };
}
