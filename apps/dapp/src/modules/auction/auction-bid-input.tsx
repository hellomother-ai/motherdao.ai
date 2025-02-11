import { FormField, FormItemWrapperSlim } from "@repo/ui";
import { useFormContext } from "react-hook-form";
import { PropsWithAuction } from "@axis-finance/types";
import { TokenAmountInput } from "modules/token/token-amount-input";
import { trimCurrency } from "utils/currency";
import { useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { BidForm } from "./auction-purchase";

export function AuctionBidInput({
  auction,
  balance = BigInt(0),
  limit,
  disabled,
}: {
  balance?: bigint;
  limit?: bigint;
  disabled?: boolean;
} & PropsWithAuction) {
  const form = useFormContext<BidForm>();

  const [formAmount] = form.watch(["quoteTokenAmount"]);

  const [minAmountOutFormatted, setMinAmountOutFormatted] =
    useState<string>("");
  const [bidPrice, setBidPrice] = useState<string>("");

  const showAmountOut =
    form.formState.isValid && isFinite(Number(minAmountOutFormatted));

  const getMinAmountOut = (amountIn: bigint, price: bigint): bigint => {
    if (!amountIn || !price) {
      return BigInt(0);
    }

    return (amountIn * parseUnits("1", auction.baseToken.decimals)) / price;
  };

  const handleAmountOutChange = (amountIn: bigint) => {
    const minAmountOut = getMinAmountOut(
      amountIn,
      parseUnits(bidPrice, auction.quoteToken.decimals),
    );
    const minAmountOutDecimal = formatUnits(
      minAmountOut,
      auction.baseToken.decimals,
    );
    form.setValue("baseTokenAmount", minAmountOutDecimal);
    setMinAmountOutFormatted(trimCurrency(minAmountOutDecimal));
  };

  return (
    <div className="text-foreground flex flex-col gap-y-2">
      <div className="bg-secondary flex justify-between rounded-sm pt-1">
        <div className="">
          <FormField
            name="quoteTokenAmount"
            control={form.control}
            render={({ field }) => (
              <FormItemWrapperSlim>
                <TokenAmountInput
                  {...field}
                  disabled={disabled}
                  label="Spend Amount"
                  balance={formatUnits(balance, auction.quoteToken.decimals)}
                  limit={
                    limit
                      ? trimCurrency(
                          formatUnits(limit, auction.quoteToken.decimals),
                        )
                      : undefined
                  }
                  token={auction.quoteToken}
                  onChange={(e) => {
                    field.onChange(e);

                    // Display USD value of input amount
                    const rawAmountIn = e as string;
                    // Update amount out value
                    handleAmountOutChange(
                      parseUnits(rawAmountIn, auction.quoteToken.decimals),
                    );
                  }}
                  onClickMaxButton={() => {
                    // Take the minimum of the balance and the limit
                    let maxSpend = balance;
                    if (limit) {
                      maxSpend = balance < limit ? balance : limit;
                    }

                    const maxSpendStr = formatUnits(
                      maxSpend,
                      auction.quoteToken.decimals,
                    );

                    form.setValue("quoteTokenAmount", maxSpendStr);
                    // Force re-validation
                    form.trigger("quoteTokenAmount");

                    // Update amount out value
                    handleAmountOutChange(maxSpend);
                  }}
                />
              </FormItemWrapperSlim>
            )}
          />
        </div>
      </div>

      <div className="bg-secondary flex justify-between rounded-sm pt-1">
        <div>
          <FormField
            name="bidPrice"
            control={form.control}
            render={({ field }) => (
              <FormItemWrapperSlim>
                <TokenAmountInput
                  {...field}
                  label="Bid Price"
                  tokenLabel={`${auction.quoteToken.symbol} per ${auction.baseToken.symbol}`}
                  disabled={disabled}
                  disableMaxButton={true}
                  token={auction.quoteToken}
                  message={
                    showAmountOut
                      ? `If successful, you will receive at least: ${trimCurrency(minAmountOutFormatted)} ${auction.baseToken.symbol}`
                      : ""
                  }
                  onChange={(e) => {
                    field.onChange(e);
                    // Update amount out value
                    const rawPrice = e as string;
                    setBidPrice(rawPrice);
                    const price = parseUnits(
                      rawPrice,
                      auction.quoteToken.decimals,
                    );

                    let spendAmount = formAmount;

                    if (formAmount === undefined || formAmount === "") {
                      spendAmount = "0";
                    }

                    const minAmountOut = getMinAmountOut(
                      parseUnits(spendAmount, auction.quoteToken.decimals),
                      price,
                    );
                    const minAmountOutDecimal = formatUnits(
                      minAmountOut,
                      auction.baseToken.decimals,
                    );
                    form.setValue("baseTokenAmount", minAmountOutDecimal);
                    setMinAmountOutFormatted(trimCurrency(minAmountOutDecimal));
                  }}
                />
              </FormItemWrapperSlim>
            )}
          />
        </div>
      </div>
    </div>
  );
}
