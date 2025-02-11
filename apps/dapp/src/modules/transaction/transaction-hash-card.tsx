import { BlockExplorerLink } from "components/blockexplorer-link";
import { TransactionErrorDialog } from "./transaction-error-dialog";
import { TransactionDialogElementProps } from "./transaction-dialog";
import { LoadingIndicator } from "modules/app/loading-indicator";

type TransactionHashCardProps = {
  message?: string;
} & TransactionDialogElementProps;

export function TransactionHashCard(props: TransactionHashCardProps) {
  const message = "Waiting for the transaction to finalize...";
  return (
    <div className="flex h-min w-full max-w-lg flex-col text-center">
      {props.error && <TransactionErrorDialog error={props.error} />}
      {!props.error &&
        (props.message ? (
          <h2>{props.message}</h2>
        ) : (
          <div className="flex w-full items-center justify-center gap-x-1">
            {message} <LoadingIndicator className="fill-foreground size-4" />{" "}
          </div>
        ))}
      {props.hash && (
        <div className="mt-4 flex justify-center">
          <>
            View transaction status on&nbsp;
            {props.chainId ? (
              <BlockExplorerLink
                showName
                hash={props.hash}
                chainId={props.chainId}
              />
            ) : (
              "Unable to generate explorer link"
            )}
          </>
        </div>
      )}
    </div>
  );
}
