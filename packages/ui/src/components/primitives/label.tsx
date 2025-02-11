import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils";
import { Tooltip } from "../tooltip";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export type LabelProps = VariantProps<typeof labelVariants> & {
  tooltip?: React.ReactNode;
};

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps & React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const label = (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        labelVariants(),
        props.tooltip && "cursor-pointer",
        className,
      )}
      {...props}
    />
  );

  return props.tooltip ? (
    <Tooltip content={props.tooltip}>
      <div className="flex gap-x-1">
        {label}
        <InfoCircledIcon />
      </div>
    </Tooltip>
  ) : (
    label
  );
});

Label.displayName = LabelPrimitive.Root.displayName;

const LabelWrapper = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithRef<"div"> &
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    LabelProps & { tooltip?: React.ReactNode }
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("grid w-full max-w-sm items-center gap-1.5", className)}
      {...props}
    >
      {props.content && (
        <Label htmlFor={props.id} tooltip={props.tooltip} ref={ref}>
          {props.content}
        </Label>
      )}
      {props.children}
    </div>
  );
});

LabelWrapper.displayName = "LabelWrapper";

export { Label, LabelWrapper };
