import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Avatar } from "./avatar";

const chipVariants = cva(
  "inline-flex h-min items-center justify-center rounded-full border uppercase transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-transparent text-foreground hover:bg-surface hover:border-transparent hover:shadow-3xl",
        active:
          "border-transparent bg-primary text-neutral-50 hover:text-foreground hover:bg-surface hover:border-transparent hover:shadow-3xl",
        filled: "bg-background border-transparent",
      },
      size: {
        default: "p-1 px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  icon?: string;
}

function Chip({ className, variant, size, children, ...props }: ChipProps) {
  return (
    <div
      className={cn(
        chipVariants({ variant, size }),
        className,
        props.icon && "pr-2",
      )}
      {...props}
    >
      {props.icon && <Avatar className="mr-1 size-6" src={props.icon} />}
      {children}
    </div>
  );
}

export { Chip };
