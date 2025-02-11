import { Link, cn, trimAddress } from "@repo/ui";
import { chains } from "@axis-finance/env";
import { ArrowUpRightIcon } from "lucide-react";

import { getBlockExplorer } from "src/utils/chain";
import { Address } from "viem";

import { environment } from "utils/environment";

const activeChains = chains.activeChains(environment.isTestnet);

/** Renders a link to an address or transaction hash on a blockexplorer */
export function BlockExplorerLink({
  chainId,
  address,
  hash,
  trim,
  icon = true,
  className,
  ...props
}: {
  chainId: number;
  address?: string | Address;
  hash?: string | Address;
  trim?: boolean;
  icon?: boolean;
  showName?: boolean;
  className?: string;
}) {
  const chain = activeChains.find((c) => c.id === chainId);

  if (!chain) return null;
  const blockExplorer = getBlockExplorer(chain);
  const target = hash ?? address ?? "";
  const path = hash ? "tx/" : "address/";

  return (
    <Link
      className={cn("text-md inline-flex items-center leading-none", className)}
      href={blockExplorer.url + path + target}
    >
      {trim
        ? trimAddress(target, 6)
        : props.showName
          ? blockExplorer.name
          : address}
      {icon && <ArrowUpRightIcon className="size-3" />}
    </Link>
  );
}
