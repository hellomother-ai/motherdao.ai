import type { Chain, PropsWithAuction } from "@axis-finance/types";
import { Badge, cn } from "@repo/ui";
import { CountdownChip } from "./countdown-chip";

type AuctionCardBannerProps = PropsWithAuction & {
  chain: Chain;
  image?: string;
  curator?: {
    name: string;
    address: string;
    avatar: string;
  };
  isGrid?: boolean;
};

export function AuctionCardBanner(props: AuctionCardBannerProps) {
  return (
    <div
      className={cn(
        "flex justify-between rounded-sm bg-cover bg-center p-4 transition-all lg:flex-col",
        props.isGrid
          ? "mb-2 h-[192px] w-full p-2 group-hover:h-[64px]"
          : "h-[330px] w-[580px]",
      )}
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div className="flex justify-between">
        <Badge
          size={props.isGrid ? "s" : "m"}
          icon={props.chain?.iconUrl as string}
        >
          {props.chain.name}
        </Badge>
      </div>

      <div
        className={cn(
          "flex items-end justify-between",
          !props.curator && "justify-end",
        )}
      >
        {props.curator && (
          <Badge icon={props.curator?.avatar as string} className="normal-case">
            {props.curator.name}
          </Badge>
        )}

        <CountdownChip auction={props.auction} />
      </div>
    </div>
  );
}
