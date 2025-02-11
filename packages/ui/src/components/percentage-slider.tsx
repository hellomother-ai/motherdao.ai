import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { cn } from "..";
import { Input, Slider } from "./primitives";

type PercentageSliderProps<
  T extends FieldValues = FieldValues,
  K extends Path<T> = Path<T>,
> = {
  field: ControllerRenderProps<T, K>;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number[];
  className?: string;
  inputClassName?: string;
  sliderClassName?: string;
};

export function PercentageSlider<
  T extends FieldValues = FieldValues,
  K extends Path<T> = Path<T>,
>({
  field,
  defaultValue,
  min = 0,
  max = 100,
  ...props
}: PercentageSliderProps<T, K>) {
  return (
    <div className={cn("flex items-center", props.className)}>
      <Input
        disabled
        className={cn("w-16 disabled:opacity-100", props.inputClassName)}
        value={`${field.value?.[0] ?? defaultValue}%`}
      />
      <Slider
        className={cn("cursor-pointer", props.sliderClassName)}
        min={min}
        max={max}
        defaultValue={[defaultValue ?? 0]}
        value={Array.isArray(field.value) ? field.value : [field.value]}
        onValueChange={(v) => {
          field.onChange(v);
        }}
      />
    </div>
  );
}
