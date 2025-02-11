import React from "react";
import type { Token } from "@axis-finance/types";
import { Text, Button, cn, NumberInput, NumberInputProps } from "@repo/ui";
import { UsdAmount } from "modules/auction/usd-amount";
import { Format } from "./format";

type TokenAmountInputProps = React.HTMLProps<HTMLInputElement> & {
  /** the input's label */
  label: string;
  /** the input's token label, defaults to the token's symbol */
  tokenLabel?: string;
  /** the input's token type */
  token?: Token;
  /** whether to show the USD price of the token */
  showUsdPrice?: boolean;
  /** the user's balance */
  balance?: string | number;
  /** limit on how much the user can spend */
  limit?: string;
  /** an optional error message */
  error?: string;
  /** an optional status message */
  message?: string;
  /** the current input value */
  value?: string | undefined;
  /** whether to disable the input */
  disabled?: boolean;
  /** whether to disable the max button */
  disableMaxButton?: boolean;
  /** callback when the max button is clicked */
  onClickMaxButton?: () => void;
  /** the prefix to add to the amount */
  amountPrefix?: string;

  onChange: NumberInputProps["onChange"];
};

export const TokenAmountInput = React.forwardRef<
  HTMLInputElement,
  TokenAmountInputProps
>(
  (
    {
      label,
      token,
      showUsdPrice = true,
      tokenLabel = token?.symbol,
      balance,
      limit,
      error,
      message,
      value,
      disabled,
      disableMaxButton,
      onClickMaxButton,
      amountPrefix,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "hover:bg-surface-secondary border-primary bg-surface-tertiary group rounded border-2 p-4 transition-all",
          error && "border-feedback-alert",
          disabled && "opacity-50",
        )}
      >
        <div className="flex">
          <div className="flex-start">
            <Text uppercase color="secondary">
              {label}
            </Text>
          </div>
        </div>
        <div className="mt-0.5 flex items-center">
          <Text size="xl" className="font-light">
            {amountPrefix}
          </Text>
          <NumberInput
            value={value === undefined ? "" : value}
            variant="lg"
            disabled={disabled}
            placeholder="0"
            className={cn(
              "hover:bg-surface-secondary ",
              error && "text-feedback-alert",
            )}
            style={{ padding: 0 }} //TODO: figure out why this is necessary
            {...props}
            ref={ref}
          />
          <Text className="text-nowrap" color="secondary" size="lg">
            {tokenLabel}{" "}
          </Text>
          {!disableMaxButton && (
            <Button
              disabled={disabled}
              uppercase
              variant="secondary"
              size="sm"
              className="border-primary ml-1 h-min rounded-full px-1.5 py-1 leading-none"
              onClick={() => {
                onClickMaxButton?.();
              }}
            >
              Max
            </Button>
          )}
        </div>
        <div className="flex justify-between">
          {token && showUsdPrice && (
            <div className="flex items-start">
              <Text size="xs" color="secondary">
                {!value && "≈ $0"}
                {value && "≈ "}
                {value && <UsdAmount token={token} amount={Number(value)} />}
              </Text>
            </div>
          )}
          {balance && (
            <div className="gap-x-sm ml-auto flex items-end">
              <Text size="xs" color="secondary" uppercase>
                {limit ? `Limit: ${limit}` : ""}
              </Text>
              <Text size="xs" color="secondary" uppercase>
                Balance: <Format value={balance} />
              </Text>
            </div>
          )}
        </div>
        {error && (
          <div className="bg-feedback-alert mt-1.5 rounded p-2">
            <Text color="tertiary">{error}</Text>
          </div>
        )}

        {message && (
          <div className="mt-1.5 rounded border border-neutral-500 p-2">
            <Text color="secondary">{message}</Text>
          </div>
        )}
      </div>
    );
  },
);

TokenAmountInput.displayName = "TokenAmountInput";
