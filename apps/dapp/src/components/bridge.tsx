import { Widget } from "@xyfinance/widget";
import { useTokenLists } from "state/tokenlist";
import { environment } from "utils/environment";

const disabledChains = [
  //disable smol L2's for now
  25, 108, 321, 592, 1285, 8217, 10507, 196, 167000, 6699, 388,
].map((c) => c.toString());

const defaultConfig = {
  disabledChains,
};

type BridgeProps = {
  targetChainId?: string;
  order?: BridgeOrder;
};

type BridgeableToken = {
  address: string;
  chainId: string;
};

type BridgeOrder = {
  fromToken?: BridgeableToken;
  toToken: BridgeableToken;
};

export function Bridge({ targetChainId, order }: BridgeProps) {
  const { lists } = useTokenLists();

  if (environment.isTestnet) {
    return (
      <div className="text-center">Bridge is not available on testnets</div>
    );
  }

  //Feature tokens from our tokenlist for specified chain
  const tokens = lists
    .flatMap((l) =>
      l.tokens.map(({ address, chainId }) => ({
        address,
        chainId: chainId.toString(),
      })),
    )
    .filter((t) => t.chainId === targetChainId);

  const config = {
    ...defaultConfig,
    ...order,
    featuredTokens: tokens,
  };

  const theme = {
    colors: {
      primary: "5783db",
    },
    components: {
      button: {
        variant: "filled" as const,
      },
    },
  };

  return <Widget config={config} theme={theme} />;
}
