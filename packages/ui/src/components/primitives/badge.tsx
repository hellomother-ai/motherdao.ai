import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Avatar } from "./avatar";

const badgeVariants = cva(
  "inline-flex h-min items-center justify-center rounded-full border uppercase transition-colors border-0 py-1 px-2",
  {
    variants: {
      color: {
        active: "bg-feedback-success text-neutral-50",
        alert: "bg-feedback-alert text-neutral-50",
        ghost: "bg-app text-foreground",
        primary: "bg-neutral-900 text-neutral-50",
        secondary: "bg-neutral-50 text-neutral-900 border border-neutral-900",
        tertiary: "bg-neutral-200 text-neutral-900",
      },
      size: {
        s: "text-sm",
        m: "text-md",
        xl: "px-4 py-2 text-lg",
        round: "rounded-full w-fit px-1 py-0",
      },
    },
    defaultVariants: {
      size: "m",
      color: "ghost",
    },
  },
);

type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "size"> &
  VariantProps<typeof badgeVariants> & {
    icon?: string;
  };

function Badge({ className, color, size, children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ color, size }),
        className,
        props.icon && "pl-2",
      )}
      {...props}
    >
      {props.icon && <Avatar className="mr-1 size-6" src={props.icon} />}
      {children}
    </div>
  );
}

export { Badge };
