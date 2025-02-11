import {
  AuctionType,
  BatchAuction,
  PropsWithAuction,
} from "@axis-finance/types";
import { Card, Metric } from "@repo/ui";
import { BlockExplorerLink } from "components/blockexplorer-link";
import { AuctionMetricsContainer } from "./auction-metrics-container";
import { AuctionMetric } from "./auction-metric";

export function AuctionCoreMetrics(
  props: PropsWithAuction & { className?: string },
) {
  const auction = props.auction as BatchAuction;

  const isSealedBid = auction.auctionType === AuctionType.SEALED_BID;
  const isFixedPriceBatch =
    auction.auctionType === AuctionType.FIXED_PRICE_BATCH;
  const isSuccessful =
    isSealedBid && auction.encryptedMarginalPrice?.settlementSuccessful;
  const isVested = !!auction.linearVesting;

  return (
    <Card
      className={props.className}
      title={`About ${auction.info?.name}`} //TODO: About didnt feel right, open to suggestions on this one
      headerRightElement={
        <div className="flex gap-x-8">
          <Metric size="s" label="Token Address">
            <BlockExplorerLink
              trim
              chainId={auction.chainId}
              address={auction.baseToken.address}
            />
          </Metric>
        </div>
      }
    >
      <div className="flex flex-col justify-between ">
        <AuctionMetricsContainer auction={auction}>
          <AuctionMetric id="targetRaise" />
          <AuctionMetric id="minRaise" />
          {isSealedBid && <AuctionMetric id="minPrice" />}
          {isSealedBid && <AuctionMetric id="minPriceFDV" />}
          {isFixedPriceBatch && <AuctionMetric id="fixedPrice" />}
          {isFixedPriceBatch && <AuctionMetric id="fixedPriceFDV" />}

          <AuctionMetric id="totalSupply" />
          <AuctionMetric id="tokensAvailable" />

          {isSuccessful && (
            <>
              {/* TODO: review if we need these metrics somewhere */}
              {/* <AuctionMetric auction={auction} id="totalRaised" /> */}
              {/* <AuctionMetric auction={auction} id="clearingPrice" />*/}
              <AuctionMetric auction={auction} id="tokensLaunched" />
            </>
          )}

          {isVested && <AuctionMetric id="vestingDuration" auction={auction} />}
          {/*isDTL && <AuctionMetric id="dtlProceeds" />*/}
        </AuctionMetricsContainer>
      </div>
    </Card>
  );
}
