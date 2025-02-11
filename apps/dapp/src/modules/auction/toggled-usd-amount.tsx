import { useToggle } from "@repo/ui";
import { UsdAmount, type UsdAmountProps } from "./usd-amount";
import { Format } from "modules/token/format";

type ToggledUsdAmountProps = UsdAmountProps & {
  untoggledFormat?: (amount: number) => string;
  format?: boolean;
};

function ToggledUsdAmount({
  token,
  amount,
  timestamp,
  untoggledFormat,
  format,
}: ToggledUsdAmountProps) {
  const { isToggled: isUsdToggled } = useToggle();

  if (isUsdToggled) {
    return <UsdAmount token={token} amount={amount} timestamp={timestamp} />;
  }

  if (format) {
    return <Format value={amount} />;
  }

  return <>{untoggledFormat ? untoggledFormat(amount) : amount}</>;
}

export { ToggledUsdAmount };
