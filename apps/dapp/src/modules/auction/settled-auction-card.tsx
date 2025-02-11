import type {
  Token,
  PropsWithAuction,
  BatchAuction,
} from "@axis-finance/types";
import { Card, cn, Metric, type MetricProps, type TextWeight } from "@repo/ui";
import { SettledAuctionChart } from "./settled-auction-chart";
import { useToggleUsdAmount } from "./hooks/use-toggle-usd-amount";
import { getTimestamp } from "utils/date";

type ToggledAmountProps = {
  label: string;
  token: Token;
  amount: number;
  timestamp?: number;
  weight?: TextWeight;
  className?: string;
} & Pick<MetricProps, "size">;

const ToggledAmount = ({
  label,
  token,
  amount,
  timestamp,
  className,
  size,
  weight = "default",
}: ToggledAmountProps) => {
  const toggledAmount = useToggleUsdAmount({ token, amount, timestamp });
  return (
    <Metric
      label={label}
      className={cn("flex-grow", className)}
      size={size}
      metricWeight={weight}
    >
      {toggledAmount}
    </Metric>
  );
};

const AuctionHeader = ({ auction }: PropsWithAuction) => {
  const batchAuction = auction as BatchAuction;

  const clearingPrice = Number(
    batchAuction.encryptedMarginalPrice?.marginalPrice ?? 0,
  );
  const fdv = Number(batchAuction.baseToken.totalSupply ?? 0) * clearingPrice;
  const auctionEndTimestamp = batchAuction?.formatted
    ? getTimestamp(batchAuction.formatted.endDate)
    : undefined;

  return (
    <div className="flex- flex items-end gap-x-[8px] pb-[16px]">
      {batchAuction.formatted?.cleared && (
        <>
          <ToggledAmount
            label="Clearing price"
            amount={clearingPrice}
            token={batchAuction.quoteToken}
            timestamp={auctionEndTimestamp}
            className="min-w-[292px]"
          />
          <ToggledAmount
            label={` Raised`}
            amount={Number(batchAuction.purchased) ?? 0}
            token={batchAuction.quoteToken}
            timestamp={auctionEndTimestamp}
            className="min-w-[188px]"
          />
          <ToggledAmount
            label="FDV"
            token={batchAuction.quoteToken}
            amount={fdv ?? 0}
            timestamp={auctionEndTimestamp}
            className="min-w-[188px]"
          />
        </>
      )}
      <Metric label="Participants" className="min-w-[188px] flex-grow">
        {batchAuction.formatted?.uniqueBidders}
      </Metric>
    </div>
  );
};

const SettledAuctionCard = (
  props: React.HTMLAttributes<HTMLDivElement> & PropsWithAuction,
) => {
  const { auction } = props;

  return (
    <Card className="h-[640px] flex-grow gap-16">
      <AuctionHeader auction={auction} />
      <SettledAuctionChart auction={auction as BatchAuction} />
    </Card>
  );
};

export { SettledAuctionCard };
