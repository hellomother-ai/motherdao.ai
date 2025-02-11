import {
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Area,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
  ReferenceDot,
  Line,
} from "recharts";
import { format } from "date-fns";
import type { Auction, BatchAuction } from "@axis-finance/types";
import { shorten } from "utils/number";
import { formatDate, getTimestamp } from "utils/date";
import { useGetToggledUsdAmount } from "./hooks/use-get-toggled-usd-amount";
import { SettledAuctionChartOverlay } from "./settled-auction-chart-overlay";
import {
  BID_OUTCOME,
  type SortedBid,
  useSortedBids,
} from "./hooks/use-sorted-bids";
import { OriginIcon } from "./origin-icon";

type BidTooltipProps = {
  auction?: Auction;
} & TooltipProps<number, "timestamp" | "price" | "amountIn">;

type FormatterProps = {
  dataKey: string;
  name: "timestamp" | "price" | "amountIn";
  value: number;
};

const formatter = (value: unknown, _name: string, props: FormatterProps) => {
  if (props.dataKey === "timestamp" && typeof value == "number") {
    return format(new Date(value), "yyyy-MM-dd HH:mm:ss");
  }

  return value;
};

/*
  Recharts <Legend> component renders the legend text the same color as the legend icon color.
  This formatter renders default text color, without affecting the colored icons.
*/
const plainTextFormatter = (value: string) => (
  <span className="text-foreground">{value}</span>
);

const BidTooltip = (props: BidTooltipProps) => {
  const auctionEndTimestamp = props?.auction?.formatted
    ? getTimestamp(props.auction.formatted.endDate)
    : undefined;

  const { getToggledUsdAmount } = useGetToggledUsdAmount(
    props.auction?.quoteToken,
    auctionEndTimestamp,
  );

  const payload = props.payload?.[0]?.payload;

  // Ignore data points used for drawing the corners of first & last bid
  if (
    payload === undefined ||
    payload.price === 0 ||
    payload.cumulativeAmountIn === 0
  ) {
    return null;
  }

  const { timestamp, price, amountIn, settledAmountOut } = payload;

  return (
    <div className="bg-surface border-surface-outline text-foreground rounded-sm border p-4">
      <div>Amount: {getToggledUsdAmount(amountIn)}</div>
      <div>Price: {getToggledUsdAmount(price)}</div>
      <div>
        Settled: {shorten(settledAmountOut)} {props.auction?.baseToken.symbol}
      </div>
      <div>At: {formatDate.fullLocal(new Date(timestamp ?? 0))}</div>
    </div>
  );
};

const filterWinningBids = (bids: SortedBid[]) => {
  return bids.filter(
    (bid) =>
      bid.outcome === BID_OUTCOME.WON ||
      bid.outcome === BID_OUTCOME.PARTIAL_FILL,
  );
};

export const SettledAuctionChart = ({ auction }: { auction: BatchAuction }) => {
  /* Recharts doesn't support classNames, so we obtain the colors from the stylesheet */
  const primary500 = `hsl(var(--primary-500))`;
  const red500 = `hsl(var(--red-500))`;
  const textSecondary = `hsl(var(--text-secondary))`;
  const textTertiary = `hsl(var(--text-tertiary))`;
  const neutral400 = `hsl(var(--neutral-400))`;

  const batchAuction = auction as BatchAuction;
  const auctionEndTimestamp = auction?.formatted
    ? getTimestamp(auction.formatted.endDate)
    : undefined;

  const { getToggledUsdAmount } = useGetToggledUsdAmount(
    auction?.quoteToken,
    auctionEndTimestamp,
  );

  const bids = useSortedBids(auction);
  const clearingPrice = Number(
    batchAuction.encryptedMarginalPrice?.marginalPrice ?? 0,
  );
  const amountRaised = Number(auction?.sold) * clearingPrice;
  const winning = filterWinningBids(bids);

  return (
    <div className="relative h-[504px] w-[100%]">
      {auction && <SettledAuctionChartOverlay auction={auction} />}
      <ResponsiveContainer className="font-mono">
        <ComposedChart data={bids}>
          <CartesianGrid
            stroke={neutral400}
            strokeDasharray="0"
            strokeWidth={0.5}
            vertical={false}
          />
          <XAxis
            dataKey="cumulativeAmountIn"
            type="number"
            tick={{ fill: textTertiary, fontSize: 14 }}
            tickFormatter={(value) => shorten(value, 0)}
            tickLine={false}
          />
          <YAxis
            dataKey="price"
            type="number"
            tick={{ fill: textTertiary, fontSize: 14 }}
            tickFormatter={(value) => getToggledUsdAmount(value, false)}
            tickLine={false}
          />
          <Area
            data={winning}
            type="stepBefore"
            dataKey="price"
            dot={false}
            fill={neutral400}
            stroke="none"
          />
          <Line
            data={bids}
            type="stepBefore"
            dataKey="price"
            stroke={primary500}
            dot={false}
            strokeWidth={2}
          />
          {bids?.map(
            (bid, index) =>
              bid.outcome !== BID_OUTCOME.PARTIAL_FILL && (
                <ReferenceLine
                  key={index}
                  segment={[
                    { x: bid.cumulativeAmountIn, y: 0 },
                    {
                      x: bid.cumulativeAmountIn,
                      y: bids[index + 1]?.price || bid.price,
                    },
                  ]}
                  stroke={textSecondary}
                  strokeWidth={1}
                />
              ),
          )}
          <ReferenceLine
            x={amountRaised}
            stroke={textSecondary}
            strokeDasharray="8 8"
            strokeWidth={2}
          />
          <ReferenceLine
            segment={[
              { x: 0, y: clearingPrice },
              { x: amountRaised, y: clearingPrice },
            ]}
            stroke={red500}
            strokeDasharray="8 8"
            strokeWidth={2}
          />
          <ReferenceDot
            x={amountRaised}
            y={clearingPrice}
            isFront={true}
            shape={(props) => <OriginIcon cx={props.cx} cy={props.cy} />}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            // @ts-expect-error TODO
            formatter={formatter}
            content={(props) => <BidTooltip {...props} auction={auction} />}
          />
          <Legend
            align="left"
            wrapperStyle={{ position: "relative", padding: 0, margin: 0 }}
            formatter={plainTextFormatter}
            payload={[
              {
                value: "Bid price (y) and Amount (x)",
                type: "plainline",
                color: primary500,
                payload: { strokeDasharray: "1 0" },
              },
              {
                value: `${auction.quoteToken.symbol} raised`,
                type: "plainline",
                color: textTertiary,
                payload: { strokeDasharray: "8 8" },
              },
              {
                value: `Clearing price`,
                type: "plainline",
                color: red500,
                payload: { strokeDasharray: "8 8" },
              },
            ]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
