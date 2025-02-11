import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./";
import { SelectProps } from "./";

type Filter = {
  label: string;
  options: SelectProps["options"];
};

export function Filters({
  options,
  filters = [],
  setFilters,
}: {
  options: Filter[];
  filters: string[];
  label: string;
  setFilters: (values: string[]) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <MixerHorizontalIcon className="mr-2 size-6" /> Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {options.map((o) => (
          <div key={o.label} className="mb-2">
            <DropdownMenuLabel className="border-y first:border-t-0">
              {o.label}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="" />
            {o.options.map((o, i) => (
              <DropdownMenuCheckboxItem
                key={i}
                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground cursor-pointer"
                checked={filters.includes(o.value)}
                onClick={(e) => {
                  e.preventDefault();
                  setFilters(
                    filters.includes(o.value)
                      ? filters.filter((v) => v !== o.value)
                      : [...filters, o.value],
                  );
                }}
              >
                {o.label}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
