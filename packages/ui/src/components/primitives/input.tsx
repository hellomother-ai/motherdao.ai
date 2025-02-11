import * as React from "react";

import { cn } from "@/utils";
import { type VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "focus-visible:ring-ring/20 bg-surface-tertiary flex w-full px-3 py-0 tracking-wide transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-foreground/50 hover:bg-surface-secondary group-hover:bg-surface-secondary",
  {
    variants: {
      variant: {
        default: "h-9 text-sm rounded-full border-input",
        lg: "text-4xl text-foreground font-aeonfono font-light rounded-none",
        ghost: "bg-transparent text-foreground font-aeonfono py-0 ",
      },
      textSize: {
        lg: "text-3xl",
        xl: "text-4xl font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  tooltip?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, textSize, error, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    // Handle both function and object refs
    React.useEffect(() => {
      if (typeof ref === "function") {
        ref(inputRef.current);
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, [ref]);

    React.useEffect(() => {
      if (type === "number" && inputRef.current) {
        const handleWheel = (e: WheelEvent) => {
          if (inputRef.current && inputRef.current.type === "number") {
            e.preventDefault();
          }
        };

        inputRef.current.addEventListener("wheel", handleWheel, {
          passive: false,
        });

        return () => {
          if (inputRef.current) {
            inputRef.current.removeEventListener("wheel", handleWheel);
          }
        };
      }
    }, [type]);

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(inputVariants({ variant, textSize, className }))}
          ref={inputRef}
          {...props}
        />
        <p className="text-destructive text-xs">{error ?? ""}</p>
      </div>
    );
  },
);
Input.displayName = "Input";

const IconnedInput = React.forwardRef<
  HTMLInputElement,
  InputProps & { icon: React.ReactNode }
>(({ className, icon, ...props }, ref) => {
  return (
    <div className="relative">
      <Input className={cn("pl-10", className)} {...props} ref={ref} />
      <div className="absolute left-2 top-1.5">{icon}</div>
    </div>
  );
});

IconnedInput.displayName = "IconnedInput";

export { Input, IconnedInput };
