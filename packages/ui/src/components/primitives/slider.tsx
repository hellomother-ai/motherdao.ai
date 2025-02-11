import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/utils";
import { WidthIcon } from "@radix-ui/react-icons";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-primary/20 relative h-2 w-full grow overflow-hidden rounded-[1.5px]">
      <SliderPrimitive.Range className="bg-primary absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      asChild
      className="border-accent/50 bg-background focus-visible:ring-ring block h-4 w-4 rounded-sm border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
    >
      <WidthIcon />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
