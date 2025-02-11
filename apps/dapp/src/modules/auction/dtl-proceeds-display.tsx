import { PropsWithAuction } from "@axis-finance/types";
import { useBaseDTLCallback } from "./hooks/use-base-dtl-callback";
import { useBaselineDTLCallback } from "./hooks/use-baseline-dtl-callback";

export function DtlProceedsDisplay({ auction }: PropsWithAuction) {
  const { data: dtlCallbackConfiguration } = useBaseDTLCallback({
    chainId: auction.chainId,
    lotId: auction.lotId,
    baseTokenDecimals: auction.baseToken.decimals,
    callback: auction.callbacks,
  });
  const { data: baselineCallbackConfiguration } = useBaselineDTLCallback({
    chainId: auction.chainId,
    lotId: auction.lotId,
    callback: auction.callbacks,
  });

  const utilizationAmount =
    dtlCallbackConfiguration?.proceedsUtilisationPercent ??
    baselineCallbackConfiguration?.poolPercent ??
    0;

  return `${utilizationAmount * 100}%`;
}
