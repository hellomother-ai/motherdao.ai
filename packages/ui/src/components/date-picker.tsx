import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/utils";
import { Button, Input } from "./primitives";
import { Calendar } from "./primitives";
import { PopoverRoot, PopoverContent, PopoverTrigger } from "./primitives";
import { useTimeInput } from "..";
import { addTimeToDate, formatDate } from "../helpers";

export type DatePickerProps = {
  content?: string;
  placeholderDate?: Date;
  minDate?: Date;
  error?: string;
  time?: boolean;
  onChange?: (date?: Date) => void;
  onBlur?: () => void;
  value?: Date;
};

export function DatePicker({
  content,
  placeholderDate,
  ...props
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(props.value);
  const { matcher, time, setTime } = useTimeInput();

  React.useEffect(() => {
    if (!props.time) return;

    // Update date with time once its typed
    if (matcher.test(time) && date) {
      const fullDate = addTimeToDate(date, time);
      setDate(fullDate);
      props.onChange?.(fullDate);
    }
  }, [props.time, time]);

  React.useEffect(() => {
    if (
      (props.value && !date) ||
      props.value?.getTime?.() !== date?.getTime?.()
    ) {
      setDate(props.value);
    }
  }, [props.value]);

  // TODO fix "Function components cannot be given refs" which seems to be breaking datetime validation
  return (
    <PopoverRoot onOpenChange={(open) => !open && props.onBlur?.()}>
      <PopoverTrigger asChild>
        <Button
          variant="input"
          className={cn(
            "bg-surface-tertiary hover:bg-surface-secondary w-full max-w-sm justify-start text-left font-normal",
            !date && "text-foreground/50",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate.fullLocal(date) : <span>{content}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-surface flex w-auto flex-col items-center p-0">
        <Calendar
          {...props}
          mode="single"
          selected={date}
          onSelect={(date) => {
            const _date = matcher.test(time) ? addTimeToDate(date, time) : date;
            props.onChange?.(_date);
            setDate(_date);
          }}
          initialFocus
          placeholderDate={!placeholderDate ? new Date() : placeholderDate}
          minDate={props.minDate}
        />
        {props.time && (
          <Input
            className="pb-4 text-center text-2xl"
            variant="lg"
            placeholder={
              !placeholderDate ? "00:00" : format(placeholderDate, "HH:mm")
            }
            value={time}
            onChange={setTime}
          />
        )}
      </PopoverContent>
    </PopoverRoot>
  );
}
