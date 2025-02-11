import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/utils";
import {
  Label,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from "./primitives";
import { SelectData } from "./select";
import { IconedLabel } from "./iconed-label";

export type ComboboxProps = {
  options: SelectData[];
  placeholder?: string;
  label?: string;
  triggerElement?: React.ReactElement;
  onChange?: (value: string) => void;
};

/** Dropdown select with search filter */
export function ComboBox({
  options = [],
  ...props
}: React.ComponentPropsWithoutRef<"div"> & ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.defaultValue);
  const current = options.find((o) => o.value === value?.toString());

  const triggerElement = props.triggerElement ?? (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={props.id}>{props.label}</Label>
      <Button
        asChild={props.triggerElement}
        id={props.id}
        variant="secondary"
        role="combobox"
        aria-expanded={open}
        className="text-muted-foreground justify-between"
      >
        {value ? (
          <IconedLabel label={current?.label} src={current?.imgURL} />
        ) : (
          props.placeholder ?? "Select..."
        )}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </div>
  );

  return (
    <PopoverRoot open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild={!props.triggerElement}>
        {triggerElement}
      </PopoverTrigger>
      <PopoverContent className="bg-surface w-[200px] p-0">
        <Command
          filter={(value, search) => {
            const current = options.find((o) => o.value === value);
            return current?.label.toLowerCase().includes(search.toLowerCase())
              ? 1
              : 0;
          }}
        >
          <CommandInput placeholder="Search..." />
          <CommandEmpty>Not found.</CommandEmpty>
          <CommandGroup>
            {options.map((o) => (
              <CommandItem
                key={o.value}
                value={o.value}
                onSelect={(currentValue) => {
                  props.onChange?.(currentValue);
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <div className="flex w-full items-center justify-between">
                  <IconedLabel src={o.imgURL} label={o.label} />
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === o.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </PopoverRoot>
  );
}
