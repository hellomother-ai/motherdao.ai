import { cva } from "class-variance-authority";

//Exported separetly due to react-refresh
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap uppercase font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 duration-300",
  {
    variants: {
      variant: {
        primary: [
          "bg-neutral-900", // Midnight Mass
          "text-neutral-50", // Holy Light
          "hover:bg-neutral-900/90", // Midnight Mass with opacity
          "hover:text-neutral-50", // Holy Light
          "active:bg-[hsl(var(--midnight-mass-90))]",
          "active:text-[hsl(var(--holy-light-90))]",
        ],
        secondary: [
          "text-neutral-900", // Midnight Mass
          "border",
          "border-neutral-900", // Midnight Mass
          "hover:bg-[hsl(var(--holy-light-90))]",
          "hover:text-neutral-900", // Midnight Mass
          "active:bg-[hsl(var(--holy-light-80))]",
          "active:text-[hsl(var(--midnight-mass-90))]",
        ],
        ghost: [
          "text-neutral-900", // Midnight Mass
          "hover:bg-[hsl(var(--holy-light-90))]",
          "hover:text-[hsl(var(--midnight-mass-90))]",
          "active:bg-[hsl(var(--holy-light-80))]",
          "active:text-[hsl(var(--midnight-mass-80))]",
        ],
        link: [
          "text-neutral-900", // Midnight Mass
          "border-b",
          "border-b-transparent",
          "hover:border-b-[hsl(var(--midnight-mass-90))]",
          "hover:text-[hsl(var(--midnight-mass-90))]",
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
