import { cn } from "@repo/ui";

type AuctionMetrics = {
  children: React.ReactNode;
  className?: string;
};

export function AuctionMetrics({ children, className }: AuctionMetrics) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 gap-y-[16px] md:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
