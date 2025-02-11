import { Button, ButtonProps } from "./";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export function SortButton<TData>(
  props: ButtonProps & { column: Column<TData> },
) {
  return (
    <Button
      variant="ghost"
      className="px-1"
      onClick={() =>
        props.column.toggleSorting(props.column.getIsSorted() === "asc")
      }
    >
      {props.children}
      {props.column.getIsSorted() ? (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      ) : (
        <div className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
