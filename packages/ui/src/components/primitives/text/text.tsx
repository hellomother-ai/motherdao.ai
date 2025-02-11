import { VariantProps } from "class-variance-authority";
import { type TextColor, textVariants } from "./text-variants";
import React from "react";
import { cn } from "@/utils";

const sizeMap = {
  "7xl": "h1",
  "4xl": "h3",
  "3xl": "h3",
  "2xl": "h3",
  "1xl": "h3",
  xl: "h3",
  lg: "h4",
  md: "h4",
  sm: "p",
  xs: "p",
  default: "p",
} as const;

export interface TextProps
  extends Omit<React.HTMLProps<HTMLParagraphElement>, "color" | "size">,
    VariantProps<typeof textVariants> {
  mono?: boolean;
  uppercase?: boolean;
  spaced?: boolean;
  size?: keyof typeof sizeMap;
  color?: TextColor;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { className, color, size, weight, mono, uppercase, spaced, as, ...props },
    ref,
  ) => {
    const Element = (as ?? (size ? sizeMap[size] : sizeMap.default)) as "div";

    return (
      <Element
        className={cn(
          textVariants({ color, size, weight, className }),
          mono && "font-mono",
          uppercase && "uppercase",
          spaced && "tracking-[1.2px]",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Text.displayName = "Text";
export { Text };
