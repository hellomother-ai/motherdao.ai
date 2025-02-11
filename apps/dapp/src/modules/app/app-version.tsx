import { cn } from "@repo/ui";
import { version } from "../../../package.json";

export function AppVersion({ className }: { className?: string }) {
  return (
    <div className={cn("inline text-xs font-light", className)}>v{version}</div>
  );
}
