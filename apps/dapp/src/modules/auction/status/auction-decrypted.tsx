import React, { useState } from "react";
import { Button, Card, Text } from "@repo/ui";
import { PropsWithAuction } from "@axis-finance/types";
import { useSettleAuction } from "../hooks/use-settle-auction";
import { TransactionDialog } from "modules/transaction/transaction-dialog";
import { RequiresChain } from "components/requires-chain";
import { LoadingIndicator } from "modules/app/loading-indicator";
import { SettleAuctionCallbackInput } from "./settle-callback-input";
import { SettleAuctionDtlCallbackBalance } from "./settle-dtl-callback-balance";
import { AuctionCoreMetrics } from "../auction-core-metrics";

// TODO needs story tests, given the amount of potential states
// TODO apart from some of the titles, much of the code in this component ias the same as FixedPriceBatchAuctionConcluded. Consider merging the two.

export function AuctionDecrypted({ auction }: PropsWithAuction) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [
    hasSufficientBalanceForCallbacks,
    setHasSufficientBalanceForCallbacks,
  ] = React.useState(true);

  const hasCallbacks =
    auction.callbacks &&
    auction.callbacks != "0x0000000000000000000000000000000000000000";

  // Storage of encoded callback data for the callback contract
  const [callbackData, setCallbackData] = useState<`0x${string}` | undefined>(
    undefined,
  );
  const [callbackDataIsValid, setCallbackDataIsValid] = useState(
    hasCallbacks ? false : true,
  );

  const settle = useSettleAuction({
    auction: auction,
    callbackData: callbackData,
  });

  const isWaiting = settle.settleTx.isPending || settle.settleReceipt.isLoading;

  return (
    <div className="auction-action-container ">
      <div className="mt-4 flex w-full flex-col justify-between gap-y-4 lg:mt-0">
        <AuctionCoreMetrics auction={auction} />
      </div>

      <div className="w-full max-w-lg">
        <TransactionDialog
          signatureMutation={settle.settleTx}
          disabled={isWaiting}
          chainId={auction.chainId}
          hash={settle.settleTx.data!}
          error={settle.error}
          onConfirm={settle.handleSettle}
          mutation={settle.settleReceipt}
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (settle.settleReceipt.isSuccess || settle.settleTx.isError) {
              settle.settleTx.reset();
            }
          }}
        />
        <Card title="Decrypted">
          <div className="green-gradient w-fill flex h-[464px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <img
                className="w-[92.351]px h-[80px]"
                src="/images/axis-logo.svg"
                alt="Axis Logo"
              />
              <Text size="xl">All bids have been decrypted</Text>
            </div>
          </div>
          {hasCallbacks && (
            <div>
              <SettleAuctionCallbackInput
                auction={auction}
                setCallbackData={setCallbackData}
                setCallbackDataIsValid={setCallbackDataIsValid}
              />
            </div>
          )}
          {
            <SettleAuctionDtlCallbackBalance
              auction={auction}
              setHasSufficientBalanceForCallbacks={
                setHasSufficientBalanceForCallbacks
              }
            />
          }
          <RequiresChain chainId={auction.chainId} className="mt-4">
            <div className="mt-4 w-full">
              <Button
                className="w-full"
                disabled={
                  isWaiting ||
                  !callbackDataIsValid ||
                  !hasSufficientBalanceForCallbacks
                }
                onClick={() => setIsDialogOpen(true)}
              >
                {isWaiting ? (
                  <div className="flex">
                    Waiting for confirmation...
                    <div className="w-1/2"></div>
                    <LoadingIndicator />
                  </div>
                ) : (
                  "Settle"
                )}
              </Button>
            </div>
          </RequiresChain>
        </Card>
      </div>

      <TransactionDialog
        signatureMutation={settle.settleTx}
        error={settle.error}
        mutation={settle.settleReceipt}
        chainId={auction.chainId}
        hash={settle.settleTx.data!}
        onConfirm={settle.handleSettle}
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);

          if (settle.settleTx.isError) {
            settle.settleTx.reset();
          }
        }}
      />
    </div>
  );
}
