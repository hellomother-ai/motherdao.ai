import React from "react";

import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./primitives";
import { Avatar } from "./primitives/avatar";
import { cn } from "..";

export type SelectData = {
  value: string;
  label: string;
  imgURL?: string;
};

export type SelectProps = {
  options: SelectData[];
  id?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  triggerClassName?: string;
  itemClassName?: string;
  disabled?: boolean;
};

/** Dropdown selector */
export function Select(props: SelectProps) {
  const [selected, setSelected] = React.useState<string>(
    props.options.find((o) => o.value === props.defaultValue)?.value ?? "",
  );

  React.useEffect(() => {
    if (props.value && props.value !== selected) {
      setSelected(props.value);
    }
  }, [props.value]);

  return (
    <SelectRoot
      defaultValue={props.defaultValue}
      value={selected}
      onValueChange={(value) => {
        setSelected(value);
        props.onChange?.(value);
      }}
    >
      <SelectTrigger
        id={props.id}
        disabled={props.disabled}
        className={cn(
          "w-full max-w-sm rounded-full border-transparent",
          props.triggerClassName,
        )}
      >
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.options?.map(({ label, value, imgURL }) => (
          <SelectItem
            key={label}
            value={value}
            className={props.itemClassName}
            onClick={() => {
              setSelected(value);
              props.onChange?.(value);
            }}
          >
            <div className="flex items-center gap-x-2">
              {imgURL && <Avatar src={imgURL} />}
              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
