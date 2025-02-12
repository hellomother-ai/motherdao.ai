import { Link, cn } from "@repo/ui";
import { DISCORD_URL } from "../../../../../app-config";

/**Shows a message with a link to Discord*/
export function ReachOutMessage({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div className={cn("flex gap-x-1", className)} {...props}>
      {children ?? "If the problem persists reach out in "}
      <Link className="inline text-[#7289da]" href={DISCORD_URL}>
        <div className="inline-flex items-center gap-x-1">
          <span className="font-bold">Discord</span>
        </div>
      </Link>
    </div>
  );
}
