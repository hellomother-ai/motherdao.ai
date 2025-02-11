import { Button, Tooltip, cn } from "@repo/ui";
import { RefreshCwIcon } from "lucide-react";

type ReloadButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  refetching?: boolean;
  tooltip?: string;
  onClick?: () => void;
};

export function ReloadButton({
  refetching,
  tooltip = "Reload page data",
  onClick = () => {},
  ...rest
}: ReloadButtonProps) {
  return (
    <Tooltip content={tooltip} asChild>
      <Button onClick={onClick} {...rest} size="icon" variant="ghost">
        <RefreshCwIcon className={cn(refetching && "loading-indicator-fast")} />
      </Button>
    </Tooltip>
  );
}
