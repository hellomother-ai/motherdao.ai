import React from "react";
import { Button } from "./";
import {
  DialogRoot,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./primitives/dialog";
import { cn } from "@/utils";

export type DialogProps = React.PropsWithChildren & {
  /** The text to be rendered on the trigger button */
  triggerContent?: string;
  /** An element to act as trigger for the modal */
  triggerElement?: React.ReactNode;
  submitContent?: React.ReactNode;
  title?: string;
  description?: string;
  submitText?: string;
  cancelText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: () => void;
  externalDialog?: boolean;
  children?: React.ReactElement<{
    setDialogOpen?: DialogStatusChangeHandler;
  }>;
  disabled?: boolean;
};

export type DialogStatusChangeHandler = React.Dispatch<
  React.SetStateAction<boolean | undefined>
>;

export function Dialog(props: DialogProps) {
  const [open, setOpen] = React.useState(props.open);

  const handleSubmit = () => {
    props.onSubmit?.();
    setOpen(false);
  };

  // only pass setDialogOpen to Components, not HTML elements
  const children =
    typeof props.children?.type === "function"
      ? React.cloneElement(props.children, {
          setDialogOpen: setOpen,
        })
      : props.children;

  const content = props.triggerElement ?? (
    <Button variant="secondary">{props.triggerContent}</Button>
  );

  return (
    <DialogRoot
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        props.onOpenChange?.(open);
      }}
    >
      <DialogTrigger
        className={cn(
          !props.triggerElement &&
            "bg-surface-tertiary hover:bg-surface-secondary w-full max-w-sm",
        )}
        asChild
      >
        {content}
      </DialogTrigger>

      {props.externalDialog ? (
        //TODO: simplify or extract this
        children
      ) : (
        <DialogContent className="bg-surface sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>{props.description}</DialogDescription>
          </DialogHeader>
          {props.children}
          <DialogFooter className="flex gap-x-1 md:justify-around">
            {props.cancelText && (
              <Button className="w-1/2" variant="secondary" type="reset">
                {props.cancelText}
              </Button>
            )}

            <Button
              className="w-1/2"
              onClick={() => handleSubmit()}
              type="submit"
              disabled={props.disabled ?? false}
            >
              {props.submitText ?? "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </DialogRoot>
  );
}
