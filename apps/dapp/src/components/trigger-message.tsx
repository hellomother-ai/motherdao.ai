import React from "react";
import { Text, cn } from "@repo/ui";

type TriggerMessageProps = React.HTMLProps<HTMLDivElement> & {
  message?: string;
};

export function TriggerMessage({
  message = "Copied!",
  ...props
}: TriggerMessageProps) {
  const [triggered, setTriggered] = React.useState<boolean>(false);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setTriggered(true);
    setTimeout(() => setTriggered(false), 1500);
  };

  return (
    <div className="span relative inline-flex" onClick={handleClick}>
      <div
        className={cn(
          "bg-surface-secondary absolute -left-4 -top-14 w-fit text-nowrap rounded-md p-3 opacity-0 shadow-black transition-all",
          triggered && "opacity-100",
        )}
      >
        <Text>{message}</Text>
      </div>
      {props.children}
    </div>
  );
}
