import { Badge, Button, Card, Text } from "@repo/ui";
import { type PropsWithAuction } from "@axis-finance/types";
import React, { useState } from "react";
import { TransactionDialog } from "modules/transaction/transaction-dialog";
import { useSettleAuction } from "../hooks/use-settle-auction";
import { RequiresChain } from "components/requires-chain";
import { LoadingIndicator } from "modules/app/loading-indicator";
import { SettleAuctionCallbackInput } from "./settle-callback-input";
import { SettleAuctionDtlCallbackBalance } from "./settle-dtl-callback-balance";
import { AuctionCoreMetrics } from "../auction-core-metrics";

// TODO needs story tests, given the amount of potential states

export function FixedPriceBatchAuctionConcluded(props: PropsWithAuction) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [
    hasSufficientBalanceForCallbacks,
    setHasSufficientBalanceForCallbacks,
  ] = React.useState(true);

  const hasCallbacks =
    props.auction.callbacks &&
    props.auction.callbacks != "0x0000000000000000000000000000000000000000";

  // Storage of encoded callback data for the callback contract
  const [callbackData, setCallbackData] = useState<`0x${string}` | undefined>(
    undefined,
  );
  const [callbackDataIsValid, setCallbackDataIsValid] = useState(
    hasCallbacks ? false : true,
  );

  const settle = useSettleAuction({
    auction: props.auction,
    callbackData: callbackData,
  });

  const isWaiting = settle.settleTx.isPending || settle.settleReceipt.isLoading;

  return (
    <div className="auction-action-container">
      <div className="mt-4 space-y-4 lg:mt-0 lg:w-2/3">
        <AuctionCoreMetrics auction={props.auction} />
      </div>
      <div className="lg:w-1/3">
        <TransactionDialog
          signatureMutation={settle.settleTx}
          error={settle.error}
          mutation={settle.settleReceipt}
          chainId={props.auction.chainId}
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
        <Card
          title="Concluded"
          headerRightElement={<Badge color="ghost">Auction Closed</Badge>}
        >
          <div className="flex flex-col gap-y-4">
            <div className="green-gradient w-fill flex min-h-[244px] items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <img
                  className="h-[80px]"
                  src="/images/axis-logo.svg"
                  alt="Axis Logo"
                />
                <Text size="xl">Auction has ended</Text>
              </div>
            </div>
            {hasCallbacks && (
              <div>
                <SettleAuctionCallbackInput
                  auction={props.auction}
                  setCallbackData={setCallbackData}
                  setCallbackDataIsValid={setCallbackDataIsValid}
                />
              </div>
            )}
            {
              <SettleAuctionDtlCallbackBalance
                auction={props.auction}
                setHasSufficientBalanceForCallbacks={
                  setHasSufficientBalanceForCallbacks
                }
              />
            }
            <RequiresChain chainId={props.auction.chainId} className="mt-4">
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
          </div>
        </Card>
      </div>
    </div>
  );
}
