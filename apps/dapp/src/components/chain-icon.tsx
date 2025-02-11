import { Avatar } from "@repo/ui";
import { chains } from "@axis-finance/env";

import { environment } from "utils/environment";

const activeChains = chains.activeChains(environment.isTestnet);

type ChainIconProps = {
  chainId: number;
};

export function ChainIcon(props: ChainIconProps) {
  const chain = activeChains.find((c) => c.id === props.chainId);
  const icon = typeof chain?.iconUrl === "string" ? chain?.iconUrl : "";

  return <Avatar src={icon} alt={chain?.name + " Logo"} />;
}
