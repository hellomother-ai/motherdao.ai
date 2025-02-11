import { useToggle } from "../hooks";
import { Chip, ToggleGroup, ToggleGroupItem } from "./primitives";

const UsdToggle: React.FC<{ currencySymbol: string }> = ({
  currencySymbol,
}) => {
  const { isToggled, toggle } = useToggle();

  return (
    <ToggleGroup
      type="single"
      onValueChange={toggle}
      className="gap-x-0 *:m-0 "
      value={isToggled ? "USD" : currencySymbol}
    >
      <ToggleGroupItem value="USD" className="p-0">
        <Chip
          className="min-w-14 rounded-r-none border-r-0"
          variant={isToggled ? "active" : "default"}
        >
          USD
        </Chip>
      </ToggleGroupItem>
      <ToggleGroupItem value={currencySymbol} className="p-0">
        <Chip
          className="min-w-14 rounded-l-none"
          variant={!isToggled ? "active" : "default"}
        >
          {currencySymbol}
        </Chip>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export { UsdToggle };
