import { Tooltip } from "@repo/ui";
import { trimCurrency } from "utils/currency";

/** Formats the given number in a readable format*/
export function Format(props: { value: string | number }) {
  const value = Number(props.value);

  if (value === 0) return "0";

  if (!isFinite(value)) {
    throw new Error(`Format received infinite value:(${value})`);
  }

  if (value < 1 && value !== 0) {
    const valueString = props.value.toString();

    const parts = valueString.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] || "";

    if (decimalPart.length >= 5) {
      const trimmedDecimal = decimalPart.replace(/^0+/, "");
      const trailingZeros = decimalPart.length - trimmedDecimal.length;

      if (trailingZeros > 0) {
        return (
          <Tooltip content={valueString}>
            <span>
              {trailingZeros > 2 ? (
                <>
                  {integerPart}.0<sub>{trailingZeros}</sub>
                  {trimmedDecimal}{" "}
                </>
              ) : (
                <>
                  {integerPart}.{decimalPart.substring(0, trailingZeros + 3)}
                </>
              )}
            </span>
          </Tooltip>
        );
      }
    }
  }

  return <span>{trimCurrency(value)}</span>;
}
