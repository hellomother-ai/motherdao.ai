import { Button } from "@repo/ui";
import {
  UseWaitForTransactionReceiptReturnType,
  UseWriteContractReturnType,
} from "wagmi";
import { TransactionHashCard } from "./transaction-hash-card";
import { Address } from "viem";
import {
  DialogRoot,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@repo/ui";
import React from "react";

export type TransactionDialogElementProps = {
  chainId?: number;
  hash?: Address;
  error?: Error | null;
};

type TransactionScreenStatus =
  | UseWaitForTransactionReceiptReturnType["status"]
  | "idle"
  | "signing";
export type TransactionScreens = Record<
  TransactionScreenStatus,
  {
    Component: React.FC<Partial<TransactionDialogElementProps>>;
    title?: string;
  }
>;

const defaultScreens: TransactionScreens = {
  idle: {
    Component: () => (
      <div className="my-4 text-center">Sign the transaction to proceed</div>
    ),
    title: "Confirm Transaction",
  },
  signing: {
    title: "Waiting for Signature",
    Component: () => (
      <div className="my-4  text-center">Sign the transaction to proceed</div>
    ),
  },
  pending: { Component: TransactionHashCard, title: "Transaction Submitted!" },
  success: {
    Component: (props) => (
      <TransactionHashCard {...props} message="Transaction complete" />
    ),
    title: "Success!",
  },
  error: { Component: TransactionHashCard, title: "Transaction failed!" },
};

export type TransactionDialogProps = {
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  mutation: UseWaitForTransactionReceiptReturnType;
  signatureMutation: UseWriteContractReturnType;
  triggerContent?: string | React.ReactNode;
  screens?: Partial<TransactionScreens>;
  submitText?: string;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} & TransactionDialogElementProps;

export function TransactionDialog({
  screens = defaultScreens,
  mutation: mutation,
  signatureMutation,
  open,
  onOpenChange,
  ...props
}: TransactionDialogProps) {
  const allScreens = { ...defaultScreens, ...screens };

  let status: TransactionScreenStatus = "idle";
  if (signatureMutation && signatureMutation.isPending) status = "signing";
  if (props.hash) status = mutation.status;
  if (props.error) status = "error";

  const error = props.error ?? mutation?.error;

  const { Component, title } = allScreens[status];
  const showFooter = status === "idle";

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      {props.triggerContent && (
        <DialogTrigger className="w-full max-w-lg" disabled={props.disabled}>
          <Button className="w-full max-w-sm" disabled={props.disabled}>
            {props.triggerContent}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="bg-surface">
        <DialogHeader className="text-lg">{title}</DialogHeader>

        <Component error={error} hash={props.hash} chainId={props.chainId} />

        <DialogFooter className="flex">
          {showFooter && (
            <Button
              disabled={props.disabled}
              size="md"
              type="submit"
              className="mx-auto w-full max-w-sm"
              onClick={(e) => {
                e.preventDefault();
                props.onConfirm(e);
              }}
            >
              {props.submitText ?? "CONFIRM"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
