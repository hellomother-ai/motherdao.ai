import { cva } from "class-variance-authority";

const size = {
  default: "text-base",
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "1xl": "text-1xl",
  "2xl": "text-2xl font-medium",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "7xl": "text-7xl",
} as const;

const weight = {
  default: "font-regular",
  light: "font-light",
  bold: "font-bold",
} as const;

export type TextSize = keyof typeof size;
export type TextWeight = keyof typeof weight;
export type TextColor = "primary" | "secondary" | "tertiary";

export const textVariants = cva("text-sans", {
  variants: {
    color: {
      primary: "text-foreground-primary",
      secondary: "text-foreground-secondary",
      tertiary: "text-surface", //TODO: couldnt find a light color for text in the DS
    },
    size,
    weight,
  },
  defaultVariants: {
    color: "primary",
    size: "default",
    weight: "default",
  },
});
