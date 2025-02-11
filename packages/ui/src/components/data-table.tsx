import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "./";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TableTitle } from "./table-title";

interface DataTableProps<TData, TValue> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  titleRightElement?: React.ReactNode;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onClickRow?: (row: Row<TData>) => void;
  emptyText?: string;
}

export function DataTable<TData, TValue>({
  title,
  subtitle,
  titleRightElement,
  columns,
  data,
  emptyText,
  ...props
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  const isLastPage = !table.getCanNextPage() && table.getPageCount() > 1;
  const rowsPerPage = 10;

  return (
    <div>
      <div>
        {typeof title === "string" && (
          <TableTitle
            title={title}
            subtitle={subtitle}
            titleRightElement={titleRightElement}
          />
        )}
        <Table className="font-mono">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => props.onClickRow?.(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="h-14 max-h-14" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyText ?? "No results"}
                </TableCell>
              </TableRow>
            )}
            {isLastPage &&
              table.getRowModel().rows?.length < rowsPerPage &&
              [
                ...new Array(rowsPerPage - table.getRowModel().rows?.length),
              ].map((_a, i) => (
                <TableRow key={i}>
                  <TableCell
                    colSpan={columns.length}
                    className="h-13 h-14 max-h-14"
                  ></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {(table.getCanPreviousPage() || table.getCanNextPage()) && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRightIcon />
            </Button>
          </>
        </div>
      )}
    </div>
  );
}
