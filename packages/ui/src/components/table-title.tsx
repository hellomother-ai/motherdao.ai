import * as React from "react";
import { Text } from "./primitives";

import { cn } from "@/utils";

type TableTitleProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  titleRightElement?: React.ReactNode;
  className?: string;
};

const TableTitle = ({
  className,
  title,
  subtitle,
  titleRightElement,
}: TableTitleProps) => {
  if (!title) return null;

  return (
    <div
      className={cn(
        "mb-xs flex items-center justify-between text-nowrap ",
        className,
      )}
    >
      <div className="flex flex-col justify-end">
        <Text className="text-lg lg:text-xl" weight="light">
          {title}
        </Text>
        <Text size="md">{subtitle}</Text>
      </div>
      {titleRightElement && (
        <div className="flex grow items-center space-x-2">
          {titleRightElement}
        </div>
      )}
    </div>
  );
};

TableTitle.displayName = "TableTitle";

export { TableTitle };
