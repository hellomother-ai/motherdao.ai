import { cva } from "class-variance-authority";

//Exported separetly due to react-refresh
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap uppercase font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 duration-300",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary",
          "text-neutral-50",
          "hover:shadow-3xl",
          "hover:bg-neutral-50",
          "hover:text-foreground",
          "active:shadow-active",
          "active:bg-primary",
          "active:text-neutral-50",
        ],
        secondary: [
          "text-neutral-900",
          "border",
          "border-neutral-900",
          "hover:shadow-3xl",
          "hover:bg-primary",
          "hover:border-transparent",
          "hover:text-neutral-50",
          "active:shadow-active",
          "active:bg-transparent",
          "active:text-neutral-900",
        ],
        ghost: [
          "text-neutral-800",
          "hover:text-primary",
          "active:text-neutral-900",
          "active:shadow-active",
        ],
        link: [
          "text-primary",
          "border-b",
          "border-b-transparent",
          "hover:border-b",
          "hover:border-b-primary",
          "hover:text-foreground",
          "tracking-wider",
        ],
        input: "rounded-full border-input",
      },
      size: {
        default: "h-9 px-4 py-2 text-md",
        sm: "h-8 px-3 text-sm",
        md: "h-12 px-8 text-md",
        lg: "h-14 px-8 text-md",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);
