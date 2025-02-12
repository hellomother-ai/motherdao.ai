import {
  AuctionDerivativeTypes,
  AuctionType,
  CallbacksType,
  type Auction,
  type PropsWithAuction,
} from "@axis-finance/types";
import { Metric, MetricProps, useToggle } from "@repo/ui";
import { trimCurrency } from "utils/currency";
import { shorten, formatPercentage } from "utils/number";
import { getCallbacksType } from "./utils/get-callbacks-type";
import { getMinFilled, getPrice, hasDerivative } from "./utils/auction-details";
import { formatDate, getDaysBetweenDates } from "utils/date";
import { Format } from "modules/token/format";
import { UsdAmount } from "./usd-amount";
import { ToggledUsdAmount } from "./toggled-usd-amount";
import { DtlProceedsDisplay } from "./dtl-proceeds-display";

export const getTargetRaise = (
  auction: Auction,
  price?: number,
): number | undefined => {
  if (price === undefined) return undefined;

  return Number(auction.capacityInitial) * price;
};

export const getMinRaise = (
  price?: number,
  minFilled?: number,
): number | undefined => {
  if (price === undefined || minFilled === undefined) return undefined;

  return minFilled * price;
};

export const getMaxTokensLaunched = (
  totalBidAmount?: number,
  targetRaise?: number,
  price?: number,
): number | undefined => {
  if (
    totalBidAmount === undefined ||
    price === undefined ||
    price === 0 ||
    targetRaise === undefined
  )
    return undefined;

  // The total bid amount can exceed the target raise, but the number of tokens launched should be capped at the target raise.
  const bidAmount = Math.min(totalBidAmount, targetRaise);

  return bidAmount / price;
};

const getClearingPrice = (auction: Auction): number | undefined => {
  if (auction.auctionType !== AuctionType.SEALED_BID) return getPrice(auction);

  // Check that the auction cleared
  if (!auction.formatted?.cleared) return undefined;

  const marginalPrice = auction.formatted?.marginalPriceDecimal;
  if (marginalPrice === undefined) return undefined;

  return marginalPrice;
};

export const getMinRaiseForAuction = (auction: Auction) => {
  const price = getPrice(auction);
  const minFilled = getMinFilled(auction);

  return getMinRaise(price, minFilled);
};

type MetricHandlers = Record<
  string,
  {
    label: string;
    handler: (auction: Auction) => React.ReactNode;
    tooltip?: string;
  }
>;

const handlers: MetricHandlers = {
  derivative: {
    label: "Derivative",
    handler: (auction) => {
      if (hasDerivative(AuctionDerivativeTypes.LINEAR_VESTING, auction)) {
        return "Linear Vesting";
      }

      return "None";
    },
  },
  minFill: {
    label: "Min Fill",
    handler: (auction) => {
      const minFilled = getMinFilled(auction);
      if (!minFilled) return undefined;

      return `${trimCurrency(minFilled)} ${auction.baseToken.symbol}`;
    },
  },
  protocolFee: {
    label: "Protocol Fee",
    handler: (auction) => {
      return `${+auction.protocolFee}%`;
    },
  },
  referrerFee: {
    label: "Referrer Fee",
    handler: (auction) => {
      return `${+auction.referrerFee}%`;
    },
  },
  duration: {
    label: "Duration",
    handler: (auction) => {
      const days = getDaysBetweenDates(
        new Date(+auction.conclusion * 1000),
        new Date(+auction.start * 1000),
      );

      //The minimum an auction can run for is 24h
      return `${days || 1} days`;
    },
  },
  start: {
    label: "Start",
    handler: (auction) => {
      console.log({ auction });
      return formatDate.simple(new Date(+auction.start * 1000));
    },
  },
  totalRaised: {
    label: "Total Raised",
    handler: (auction) => {
      return `${auction.formatted?.purchased} ${auction.quoteToken.symbol}`;
    },
  },
  targetRaise: {
    label: "Target Raise",
    handler: (auction) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { isToggled: isUsdToggled } = useToggle();

      const price = getPrice(auction);
      const targetRaise = getTargetRaise(auction, price);

      if (targetRaise === undefined) return undefined;

      if (isUsdToggled) {
        return <UsdAmount token={auction.quoteToken} amount={targetRaise} />;
      }
      return `${trimCurrency(targetRaise)} ${auction.quoteToken.symbol}`;
    },
  },
  minRaise: {
    label: "Min Raise",
    handler: (auction) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { isToggled: isUsdToggled } = useToggle();

      const minRaise = getMinRaiseForAuction(auction);

      if (minRaise === undefined) return undefined;

      if (isUsdToggled) {
        return <UsdAmount token={auction.quoteToken} amount={minRaise} />;
      }

      return `${trimCurrency(minRaise)} ${auction.quoteToken.symbol}`;
    },
  },

  minPrice: {
    label: "Min Price",
    handler: (auction) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { isToggled: isUsdToggled } = useToggle();

      const price = getPrice(auction);
      if (!price) return undefined;

      if (isUsdToggled) {
        return <UsdAmount token={auction.quoteToken} amount={price} />;
      }

      return (
        <>
          <Format value={price} /> {auction.quoteToken.symbol}
        </>
      );
    },
  },
  totalBids: {
    label: "Total Bids",
    handler: (auction) => {
      return `${auction.formatted?.totalBids}`;
    },
  },
  totalBidAmount: {
    label: "Total Bid Amount",
    handler: (auction) =>
      `${auction.formatted?.totalBidAmountFormatted} ${auction.quoteToken.symbol}`,
  },

  capacity: {
    label: "Tokens Available",
    handler: (auction) =>
      `${shorten(Number(auction.capacity))} ${auction.baseToken.symbol}`,
  },

  totalSupply: {
    label: "Total Supply",
    handler: (auction) => shorten(Number(auction.baseToken.totalSupply)),
  },

  price: {
    label: "Price",
    handler: (auction) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { isToggled: isUsdToggled } = useToggle();

      const price = getPrice(auction);
      if (!price) return undefined;

      if (isUsdToggled) {
        return <UsdAmount token={auction.quoteToken} amount={price} />;
      }

      return (
        <>
          <Format value={getPrice(auction) ?? 0} /> {auction.quoteToken.symbol}
        </>
      );
    },
  },

  fixedPrice: {
    label: "Price",
    handler: (auction) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { isToggled: isUsdToggled } = useToggle();

      const price = getPrice(auction);
      if (!price) return undefined;

      if (isUsdToggled) {
        return <UsdAmount token={auction.quoteToken} amount={price} />;
      }

      return (
        <>
          <Format value={getPrice(auction) ?? 0} /> {auction.quoteToken.symbol}
        </>
      );
    },
  },

  sold: {
    label: "Sold",
    handler: (auction) =>
      `${auction.formatted?.sold} ${auction.baseToken.symbol}`,
  },

  tokensAvailable: {
    label: "Tokens Available",
    handler: (auction) => {
      const supplyPercentage =
        (Number(auction.capacityInitial) /
          Number(auction.baseToken.totalSupply)) *
        100;

      const availableTokens = shorten(+auction.capacityInitial);

      return `${availableTokens} (${formatPercentage(supplyPercentage)}%)`;
    },
  },
  vestingDuration: {
    label: "Vesting",
    handler: (auction) => {
      if (!auction.linearVesting) {
        return "None";
      }

      const start = new Date(+auction.linearVesting.startTimestamp * 1000);
      const end = new Date(+auction.linearVesting.expiryTimestamp * 1000);

      const duration = getDaysBetweenDates(end, start);

      return `${duration} days`;
    },
  },
  minPriceFDV: {
    label: "Min Price FDV",
    handler: (auction) => {
      const price = getPrice(auction);
      if (!price) return undefined;

      const fdv = Number(auction.baseToken.totalSupply) * price;

      return (
        <ToggledUsdAmount
          token={auction.quoteToken}
          amount={fdv}
          untoggledFormat={(amount) =>
            `${shorten(amount)} ${auction.quoteToken.symbol}`
          }
        />
      );
    },
  },
  fixedPriceFDV: {
    label: "Fixed Price FDV",
    handler: (auction) => {
      const price = getPrice(auction);
      if (!price) return undefined;

      const fdv = Number(auction.baseToken.totalSupply) * price;

      return (
        <ToggledUsdAmount
          token={auction.quoteToken}
          amount={fdv}
          untoggledFormat={(amount) =>
            `${shorten(amount)} ${auction.quoteToken.symbol}`
          }
        />
      );
    },
  },
  rate: {
    label: "Rate",
    handler: (auction) => {
      return `${auction.formatted?.rate} ${auction.formatted?.tokenPairSymbols}`;
    },
  },
  started: {
    label: "Started",
    handler: (auction) => {
      return `${auction.formatted?.startDistance} ago`;
    },
  },
  ended: {
    label: "Ended",
    handler: (auction) => {
      return `${auction.formatted?.endDistance} ago`;
    },
  },
  saleType: {
    label: "Sale Type",
    handler: (auction) => {
      const callbacksType = getCallbacksType(auction);

      switch (callbacksType) {
        case CallbacksType.MERKLE_ALLOWLIST:
          return "Private";
        case CallbacksType.CAPPED_MERKLE_ALLOWLIST:
          return "Private (Capped)";
        case CallbacksType.UNIV3_DTL_WITH_ALLOCATED_ALLOWLIST:
        case CallbacksType.ALLOCATED_MERKLE_ALLOWLIST:
          return "Private (Allocated)";
        case CallbacksType.TOKEN_ALLOWLIST:
          return "Private (Token-Gated)";
        default:
          return "Public";
      }
    },
  },
  result: {
    label: "Result",
    handler: (auction) => {
      const price = getPrice(auction);
      const minFilled = getMinFilled(auction);

      const targetRaise = getTargetRaise(auction, price);
      if (targetRaise === undefined) return undefined;

      const minRaise = getMinRaise(price, minFilled);
      if (minRaise === undefined) return undefined;

      // Total bid amount will be undefined if the data hasn't been loaded yet, but 0 if there are no bids.
      const totalBidAmount = auction.formatted?.totalBidAmountDecimal;
      if (totalBidAmount === undefined) return undefined;

      if (totalBidAmount >= targetRaise) return "Target Met";

      if (totalBidAmount >= minRaise) return "Min Raise Met";

      return "Failed";
    },
  },
  maxTokensLaunched: {
    label: "Max Tokens Launched",
    handler: (auction) => {
      const price = getPrice(auction);
      const targetRaise = getTargetRaise(auction, price);
      const totalBidAmount = auction.formatted?.totalBidAmountDecimal;

      const maxTokensLaunched = getMaxTokensLaunched(
        totalBidAmount,
        targetRaise,
        price,
      );
      if (maxTokensLaunched === undefined) return undefined;

      return `${shorten(maxTokensLaunched)} ${auction.baseToken.symbol}`;
    },
  },
  clearingPrice: {
    label: "Clearing Price",
    handler: (auction) => {
      const clearingPrice = getClearingPrice(auction);
      if (clearingPrice === undefined) return undefined;

      return `${trimCurrency(clearingPrice)} ${auction.quoteToken.symbol}`;
    },
  },
  tokensLaunched: {
    label: "Tokens Launched",
    handler: (auction) => {
      const clearingPrice = getClearingPrice(auction);
      if (clearingPrice === undefined || clearingPrice === 0) return undefined;

      const purchased = auction.formatted?.purchasedDecimal;
      if (purchased === undefined) return undefined;

      const tokensLaunched = purchased / clearingPrice;

      return `${trimCurrency(tokensLaunched)} ${auction.baseToken.symbol}`;
    },
  },
  dtlProceeds: {
    label: "Direct to Liquidity",
    tooltip:
      "The percentage of proceeds that will be automatically deposited into the liquidity pool",
    handler: (auction) => <DtlProceedsDisplay auction={auction} />,
  },
};

type AuctionMetricProps = Partial<PropsWithAuction> & {
  id: keyof typeof handlers;
  className?: string;
} & Partial<Pick<MetricProps, "size">>;

export function AuctionMetric(props: AuctionMetricProps) {
  const element = handlers[props.id];

  if (!props.auction) throw new Error("No auction provided");
  if (!element) throw new Error(`No auction metric found for ${props.id}`);
  if (props.auction.status === "registering") return null;

  const value = element.handler(props.auction);

  return (
    <Metric size={props.size} label={element.label} tooltip={element.tooltip}>
      {value || "-"}
    </Metric>
  );
}
