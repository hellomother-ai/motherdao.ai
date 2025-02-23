import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/utils";

type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  minTarget?: number;
  hideMinTarget?: boolean;
  hideCurrentProgress?: boolean;
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, hideMinTarget, minTarget, ...props }, ref) => {
  //If low percentage render the children outside the indicator to remain visible
  const currentPercentage = value ?? 0;

  const showMinTarget = !hideMinTarget && minTarget !== null;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-10 w-full overflow-hidden bg-neutral-50",
        className,
      )}
      {...props}
    >
      <span
        className="z-10 text-neutral-900 dark:text-neutral-50"
        style={{
          left: `${currentPercentage}%`,
          color: currentPercentage > 0 ? "#F5F5EF" : undefined,
        }}
      >
        {props.children}
      </span>

      <ProgressPrimitive.Indicator
        className="absolute flex h-full w-full items-center justify-end bg-neutral-900 transition-all" // Midnight Mass background
        style={{ width: `${currentPercentage}%` }}
      />

      {showMinTarget && (
        <div
          className="absolute h-full w-1 border-l-[2px] border-dashed border-neutral-900 dark:border-neutral-50" // Light border in dark mode
          style={{ left: `${minTarget}%` }}
        />
      )}
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
