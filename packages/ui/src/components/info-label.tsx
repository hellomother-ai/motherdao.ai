import { Input, cn } from "..";

export type InfoLabelProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  valueSize?: "sm" | "md" | "lg";
  reverse?: boolean;
  editable?: boolean;
  className?: string;
  inputClassName?: string;
} & React.ComponentProps<"input">;

const valueSizeMap = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-3xl",
} as const;

export function InfoLabel(props: InfoLabelProps) {
  return (
    <div
      className={cn(props.className, props.reverse && "flex flex-col-reverse")}
    >
      {props.editable ? (
        <Input
          variant="ghost"
          textSize="lg"
          className={props.inputClassName}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value as string}
        />
      ) : (
        <p
          className={cn(valueSizeMap[props.valueSize || "md"], props.className)}
        >
          {props.value}
        </p>
      )}
      <p className="text-sm">{props.label}</p>
    </div>
  );
}
