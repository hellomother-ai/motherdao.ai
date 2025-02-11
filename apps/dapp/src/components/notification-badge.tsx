import { Badge } from "@repo/ui";

/** Notification count badge */
export function NotificationBadge({ count }: { count: number }) {
  return (
    <div className="relative">
      <Badge
        color="alert"
        size="round"
        className="absolute -right-1 top-2 h-4 text-xs"
      >
        {count}
      </Badge>
    </div>
  );
}
