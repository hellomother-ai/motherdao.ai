import { cn } from "@/utils";
import { Text, type TextWeight } from "./primitives";
import { Tooltip } from "./tooltip";

export type MetricProps = Omit<React.HTMLProps<HTMLDivElement>, "size"> & {
  label: string;
  size?: "s" | "m" | "l" | "xl";
  metricWeight?: TextWeight;
  tooltip?: string;
  isLabelSpaced?: boolean;
  childrenClassName?: string;
  mono?: boolean;
};

export function Metric({
  label,
  children,
  className,
  childrenClassName,
  size = "m",
  metricWeight = "default",
  tooltip,
  isLabelSpaced = false,
  mono,
}: MetricProps) {
  const metricSize =
    size === "xl" ? "2xl" : size === "l" ? "xl" : size === "m" ? "lg" : "md";

  return (
    <div className={className}>
      <Tooltip content={tooltip || null}>
        <Text
          uppercase
          spaced
          mono
          size="sm"
          color="secondary"
          className="leading-none"
        >
          {label}
        </Text>
      </Tooltip>
      <Text
        mono={mono}
        size={metricSize}
        weight={metricWeight}
        spaced={isLabelSpaced}
        className={cn(
          "tracking-wide",
          size === "l" && "mt-sm",
          childrenClassName,
        )}
      >
        {children}
      </Text>
    </div>
  );
}
