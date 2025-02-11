import React, { useCallback } from "react";
import { Button, Dialog, DialogProps, SelectData } from "./";
import { IconedLabel } from "./iconed-label";
import isDeepEqual from "../helpers/is-deep-equal";

type InputValueDisplay = {
  imgURL?: string;
  label: string;
  value: string;
};

export type DialogInputProps<T> = Omit<DialogProps, "onSubmit"> & {
  onSubmit?: (value?: T) => void;
  onChange?: (value?: T) => void;
  onBlur?: () => void;
  error?: string;
  children?: React.ReactElement<{
    onChange?: DialogInputChangeHandler<T>;
  }>;
  display?: InputValueDisplay;
  disabled?: boolean;
  value?: T;
  displayFormatter?: (value: T) => InputValueDisplay;
};

export type DialogInputChangeHandler<T> = (
  value: T,
  display?: SelectData,
) => void;

export function DialogInput<T>({
  onChange,
  displayFormatter,
  ...props
}: DialogInputProps<T>) {
  const [selected, setSelected] = React.useState<T>();
  const [display, setDisplay] = React.useState<SelectData | undefined>(
    props.display,
  );

  const handleChange: DialogInputChangeHandler<T> = useCallback(
    (value, display) => {
      if (display?.label) {
        setDisplay(display);
        setSelected(value);
      }

      onChange?.(value);
    },
    [onChange],
  );

  //Allows for overriding the current value and display
  React.useEffect(() => {
    if (props.value && !isDeepEqual(props.value, selected)) {
      setSelected(props.value);
      if (displayFormatter) {
        setDisplay(displayFormatter(props.value));
      }
    }
  }, [props.value]);

  const children = React.isValidElement(props.children)
    ? React.cloneElement(props.children, {
        onChange: handleChange,
      })
    : props.children;

  const triggerContent = display ? (
    <IconedLabel src={display.imgURL} label={display.label} />
  ) : (
    props.triggerContent
  );

  return (
    <Dialog
      {...props}
      onOpenChange={(open) => {
        !open && props.onBlur?.();
      }}
      triggerElement={
        <Button
          variant="input"
          className="bg-surface-tertiary hover:bg-surface-secondary flex w-full justify-start text-sm normal-case"
        >
          {triggerContent}
        </Button>
      }
      onSubmit={() => {
        props.onSubmit?.(selected);
      }}
      disabled={props.disabled}
    >
      {children}
    </Dialog>
  );
}
