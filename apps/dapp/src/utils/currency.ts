export const currencyFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/* Trims decimal based on the number of decimal places */
export function trimCurrency(input: string | number): string {
  if (Number.isNaN(Number(input))) return "?";

  const value = Number(input);

  if (value === 0) return "0";

  if (!isFinite(value)) {
    throw new Error(`trimCurrency received infinite value:(${value})`);
  }

  if (value < 1 && value !== 0) {
    const absLog = -Math.floor(Math.log10(Math.abs(value)));
    const decimalPlaces = Math.min(8, absLog); // Allow at least 2 significant figures
    const adjustedValue = Number(value.toFixed(decimalPlaces));
    return adjustedValue.toString();
  } else {
    return currencyFormatter.format(value);
  }
}
