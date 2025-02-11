import { FormField, FormItemWrapperSlim } from "@repo/ui";
import { useFormContext } from "react-hook-form";
import { PropsWithAuction } from "@axis-finance/types";
import { BidForm } from "./auction-purchase";
import { formatUnits, parseUnits } from "viem";
import { TokenAmountInput } from "modules/token/token-amount-input";
import { trimCurrency } from "utils/currency";

export function AuctionBidInputSingle({
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

  const [formAmountOut] = form.watch(["baseTokenAmount"]);

  function handleAmountOutChange(amountIn: bigint) {
    if (!auction.fixedPrice) return;

    // Use bigints to calculate value and return as string to avoid rounding errors with floats
    const amountOut =
      (amountIn * parseUnits("1", auction.baseToken.decimals)) /
      parseUnits(auction.fixedPrice.price, auction.baseToken.decimals);

    const formattedAmountOut = formatUnits(
      amountOut,
      auction.baseToken.decimals,
    );

    form.setValue("baseTokenAmount", formattedAmountOut);
  }
  const showAmountOut =
    form.formState.isValid && isFinite(Number(formAmountOut));

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
                  message={
                    showAmountOut
                      ? `You will receive ${trimCurrency(formAmountOut)} ${auction.baseToken.symbol}`
                      : ""
                  }
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

                    const rawAmountIn = e as string;
                    const amountIn = parseUnits(
                      rawAmountIn,
                      auction.quoteToken.decimals,
                    );

                    // Update amount out value, if applicable
                    handleAmountOutChange(amountIn);
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

                    // Update amount out value, if applicable
                    handleAmountOutChange(maxSpend);
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
