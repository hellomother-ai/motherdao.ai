import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
} from "react-hook-form";

import { cn } from "@/utils";
import { Label, LabelProps } from "@/components/primitives/label";
import { FormFieldContext, FormItemContext } from "./form-context";
import { useFormField } from "./use-form";

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("w-full max-w-md", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & LabelProps
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & {
    children: React.ReactElement<{ error?: string }>;
  }
>(({ children }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  const input = React.isValidElement(children)
    ? React.cloneElement(children, {
        error: error?.message,
      })
    : children;

  return (
    <Slot
      className="w-full"
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
    >
      {input}
    </Slot>
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-muted-foreground text-[0.8rem]", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error && error.message ? String(error?.message) : children;

  return (
    <div className="relative">
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-feedback-alert text-xs", className)}
        {...props}
      >
        {body}
      </p>
    </div>
  );
});
FormMessage.displayName = "FormMessage";

const FormItemWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    LabelProps & { label?: string; errorClassName?: string }
>(({ errorClassName, ...props }, ref) => {
  return (
    <FormItem {...props} ref={ref}>
      <FormLabel tooltip={props.tooltip}>{props.label}</FormLabel>
      <FormControl>
        <>{props.children}</>
      </FormControl>
      <FormMessage className={cn("absolute top-1", errorClassName)} />
    </FormItem>
  );
});
FormItemWrapper.displayName = "FormItemWrapper";

const FormItemWrapperSlim = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactElement<{ error?: string }>;
  }
>((props, ref) => {
  return (
    <FormItem {...props} ref={ref}>
      <FormControl>{props.children}</FormControl>
    </FormItem>
  );
});

FormItemWrapperSlim.displayName = "FormItemWrapperSlim";

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormItemWrapper,
  FormItemWrapperSlim,
};
