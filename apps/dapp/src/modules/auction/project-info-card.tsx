import { Metric, cn } from "@repo/ui";
import { PropsWithAuction } from "@axis-finance/types";
import { getLinkUrl } from "./utils/auction-details";
import { AuctionMetric } from "./auction-metric";
import { getCurator } from "modules/app/curators";

import ExternalLink from "components/external-link";
import { ReferrerPopover } from "modules/referral/referrer-popover";
import { SocialRow } from "components/social-row";

type ProjectInfoCardProps = PropsWithAuction &
  React.HTMLAttributes<HTMLDivElement> & {
    canRefer?: boolean;
  };

export function ProjectInfoCard({
  auction,
  children,
  ...props
}: ProjectInfoCardProps) {
  const description =
    auction.info?.description ?? "No description found for this project.";

  const website = getLinkUrl("website", auction);
  const twitter = getLinkUrl("twitter", auction);
  const discord = getLinkUrl("discord", auction);
  const farcaster = getLinkUrl("farcaster", auction);
  const curator = getCurator(auction.curator?.toLowerCase() ?? "");
  const canRefer = parseFloat(auction.referrerFee) > 0;

  return (
    <div
      className={cn(props.className, "flex h-full flex-col justify-between")}
      title={``}
    >
      <div className="flex justify-between">{children}</div>
      <div className="mb-4 flex">{description}</div>
      <div className="flex items-end justify-between space-x-4">
        {auction.curatorApproved && (
          <div className="mt-8 flex gap-x-[68px]">
            <AuctionMetric
              className="mt-8"
              size="s"
              id="curator"
              auction={auction}
            />
            {curator?.reportURL && (
              <Metric size="s" label={"Report"}>
                <ExternalLink href={curator.reportURL}>
                  Read more here
                </ExternalLink>
              </Metric>
            )}
          </div>
        )}

        {canRefer && <ReferrerPopover auction={auction} />}
        <SocialRow
          iconClassName="size-10"
          twitter={twitter}
          discord={discord}
          website={website}
          farcaster={farcaster}
        />
      </div>
    </div>
  );
}
