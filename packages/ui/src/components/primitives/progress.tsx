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
        "bg-primary-500 relative h-10 w-full overflow-hidden",
        className,
      )}
      {...props}
    >
      <span className="z-10" style={{ left: `${currentPercentage}%` }}>
        {props.children}
      </span>

      <ProgressPrimitive.Indicator
        className="bg-surface-progress absolute flex h-full w-full items-center justify-end transition-all"
        style={{ width: `${currentPercentage}%` }}
      ></ProgressPrimitive.Indicator>

      {showMinTarget && (
        <div
          className="absolute h-full w-1 border-l-[2px] border-dashed"
          style={{ left: `${minTarget}%` }}
        />
      )}
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
