import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, IconedLabel, Skeleton, cn } from "@repo/ui";
import {
  AuctionType,
  type Auction,
  type PropsWithAuction,
} from "@axis-finance/types";
import { AuctionMetricsContainer } from "./auction-metrics-container";
import { AuctionMetric } from "./auction-metric";
import { getAuctionPath } from "utils/router";
import { getLinkUrl } from "./utils/auction-details";
import { AuctionStatusBadge } from "./auction-status-badge";
import { CountdownChip } from "./countdown-chip";

type AuctionCardConditionalProps =
  | { loading: true; auction?: never }
  | { loading?: false; auction: Auction };

type AuctionCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Whether the card renders in list or grid view */
  isGrid?: boolean;
  /** Added to control the button in previews */
  disabledViewButton?: boolean;
} & AuctionCardConditionalProps;

export function AuctionParameterCard({ auction, ...props }: AuctionCardProps) {
  return (
    <Card
      className={cn(
        "border-surface-outline group size-full overflow-hidden ",
        props.className,
      )}
    >
      {props.loading || !auction ? (
        <Skeleton className="h-[332px] w-full" />
      ) : (
        <div className={cn("flex h-full gap-x-8")}>
          <AuctionCardDetails
            isGrid={props.isGrid}
            auction={auction}
            disabledViewButton={props.disabledViewButton}
          />
        </div>
      )}
    </Card>
  );
}

function AuctionCardDetails(
  props: PropsWithAuction & {
    isGrid?: boolean;
    disabledViewButton?: boolean;
  },
) {
  const isEMP = props.auction.auctionType === AuctionType.SEALED_BID;
  const isFPB = props.auction.auctionType === AuctionType.FIXED_PRICE_BATCH;
  const hasCurator = !!props.auction.curator && props.auction.curatorApproved;

  const isRegistrationLaunch = props.auction.status === "registering";

  let detailsPageUrl =
    getAuctionPath(props.auction) + (isRegistrationLaunch ? "/register" : "");

  const isLive = props.auction.status === "live";
  return (
    <div className={cn("flex w-full flex-col justify-between")}>
      <div>
        <div className={cn("mb-4 flex items-center justify-between ")}>
          <IconedLabel
            large
            alt={
              "baseToken" in props.auction ? props.auction.baseToken.symbol : ""
            }
            src={getLinkUrl("payoutTokenLogo", props.auction)}
          >
            {props.auction.baseToken?.symbol}
          </IconedLabel>

          {isLive ? (
            <CountdownChip auction={props.auction} />
          ) : (
            <AuctionStatusBadge status={props.auction.status} />
          )}
        </div>
      </div>

      {isEMP && (
        <AuctionMetricsContainer
          className="md:grid-cols-2"
          auction={props.auction}
        >
          <AuctionMetric id="targetRaise" />
          <AuctionMetric id="minRaise" />
          <AuctionMetric id="minPrice" size="s" />
          <AuctionMetric id="tokensAvailable" size="s" />
        </AuctionMetricsContainer>
      )}

      {isFPB && (
        <AuctionMetricsContainer
          className="md:grid-cols-2"
          auction={props.auction}
        >
          <AuctionMetric id="fixedPrice" size="s" />
          <AuctionMetric id="tokensAvailable" size="s" />
          <AuctionMetric id="start" size="s" />
          <AuctionMetric id="duration" size="s" />
        </AuctionMetricsContainer>
      )}

      <div className={cn("mt-4 flex items-end justify-center")}>
        <Link className={"flex self-end"} to={detailsPageUrl}>
          <Button
            disabled={props.disabledViewButton}
            size="lg"
            className={"self-end uppercase transition-all "}
          >
            View Launch
          </Button>
        </Link>
      </div>
    </div>
  );
}
