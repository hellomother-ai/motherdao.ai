import { Tooltip, cn } from "@repo/ui";
import { LoadingIndicator } from "modules/app/loading-indicator";

/** Displays an icon with a color representing the status and a loading spinner in case of loading */
export function StatusIcon({
  isLoading,
  isSuccess,
  isError,
  tooltip,
  Icon,
}: {
  isLoading?: boolean;
  isSuccess?: boolean;
  isIdle?: boolean;
  isError?: boolean;
  tooltip?: string;
  Icon: React.FC<React.HTMLAttributes<HTMLOrSVGElement>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Tooltip content={tooltip || null}>
        <Icon
          className={cn(
            "transition-all",
            isSuccess && "text-feedback-success",
            isError && "text-feedback-alert",
          )}
        />
      </Tooltip>
      {isLoading && (
        <LoadingIndicator
          rootClassName="absolute mt-14"
          className="fill-black"
        />
      )}
    </div>
  );
}

/** Displays a dashed line */
export function StatusSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-1 h-0 grow border-t border-dashed transition-all",
        className,
      )}
      {...props}
    />
  );
}
