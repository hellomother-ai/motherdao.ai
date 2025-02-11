import { parseUnits } from "viem";
import { currencyFormatter, trimCurrency } from "./currency";

export function parsePercent(e: React.ChangeEvent<HTMLInputElement>) {
  //Separate the percent sign from the number:
  const int = e.target.value.slice(0, e.target.value.length - 1);
  /* If there is no number (just the percent sign), rewrite
       it so it persists and move the cursor just before it.*/
  if (int.includes("%")) {
    e.target.value = "%";
    e.target.setSelectionRange(0, 0);
  } else if (int.length >= 3 && int.length <= 4 && !int.includes(".")) {
    /* If the whole has been written and we are starting the
       fraction rewrite to include the decimal point and percent 
       sign. The fraction is a sigle digit. Cursor is moved to 
       just ahead of this digit.*/
    e.target.value = int.slice(0, 2) + "." + int.slice(2, 3) + "%";
    e.target.setSelectionRange(4, 4);
  } else if (int.length >= 5 && int.length <= 6) {
    const whole = int.slice(0, 2);
    const fraction = int.slice(3, 5);
    e.target.value = whole + "." + fraction + "%";
  } else {
    /* 
     if the element has just been clicked on we want the cursor before the percent sign.*/
    e.target.value = int + "%";
    e.target.setSelectionRange(
      e.target.value.length - 1,
      e.target.value.length - 1,
    );
  }
}

/** Converts a number or string into basis points format
 * 1% -> 100
 */
export function toBasisPoints(percentage: string | number) {
  const _percentage =
    typeof percentage === "string" ? parseFloat(percentage) : percentage;

  return _percentage * 100;
}

/** Converts a number or string in basis points format to percentage
 * 100 -> 1
 */
export function fromBasisPoints(percentage: string | number) {
  const _basisPoints =
    typeof percentage === "string" ? parseFloat(percentage) : percentage;

  return _basisPoints / 100;
}

export function formatPercentage(percentage: number) {
  return new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 2,
  }).format(percentage);
}

export const shorten = (num: number, ignoreLessThan: number = 0): string => {
  if (num < ignoreLessThan) return currencyFormatter.format(num);
  const symbols = ["", "k", "M", "B", "T", "Q", "GMI"];
  const sign = Math.sign(num);
  num = Math.abs(num);
  const mag = Math.min(Math.floor(Math.log10(num) / 3), symbols.length - 1);
  const shortNum = Number((num / Math.pow(10, mag * 3)).toFixed(1)) * sign;
  if (mag < 1) return trimCurrency(num);
  return `${shortNum}${symbols[mag]}`;
};

export const isNullOrUndefined = (
  value: unknown,
): value is null | undefined => {
  return value === null || value === undefined;
};

export const getScaledCapacityWithCuratorFee = (
  capacity?: string,
  fee?: number,
  decimals?: number,
): bigint => {
  if (!capacity || !decimals) return 0n;

  // Parse the capacity string to a BigInt, scaling it up based on decimals
  const capacityBigInt = parseUnits(capacity, decimals);

  if (!fee) return capacityBigInt;

  // Calculate the fee amount scaled up to the decimals of the capacity
  const feeAmount = (capacityBigInt * BigInt(fee)) / BigInt(10000); // 10000 is the basis points for 100%

  return capacityBigInt + feeAmount;
};
