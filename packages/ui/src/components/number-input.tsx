import React from "react";
import { Input, InputProps } from "./primitives/input";

export type NumberInputProps = {
  value: string;
  onChange: (value: string) => void;
} & Omit<InputProps, "value" | "onChange">;

const formatNumber = (value: string) => {
  const [int, dec] = value.split(".");
  const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec !== undefined ? `${formattedInt}.${dec}` : formattedInt;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value.replace(/[^\d.]/g, "");

      if (newValue.startsWith(".")) {
        newValue = "0" + newValue;
      }

      if ((newValue.match(/\./g) || []).length <= 1) {
        onChange(newValue);
      }
    };

    return (
      <Input
        ref={ref}
        type="text"
        value={formatNumber(value)}
        onChange={handleChange}
        {...props}
      />
    );
  },
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
