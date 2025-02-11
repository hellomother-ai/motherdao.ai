import { Link, cn } from "@repo/ui";
import { ArrowUpRightIcon } from "lucide-react";
import React from "react";

const ExternalLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { iconClassName?: string }
>((props, ref) => {
  return (
    <Link className="flex items-center justify-center" {...props} ref={ref}>
      {props.children}{" "}
      <ArrowUpRightIcon
        className={cn("mt-1 inline size-4", props.iconClassName)}
      />
    </Link>
  );
});

ExternalLink.displayName = "ExternalLink";

export default ExternalLink;
