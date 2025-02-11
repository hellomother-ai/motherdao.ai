import React from "react";
import { Button, Card, Text } from "@repo/ui";
import type { PropsWithAuction } from "@axis-finance/types";
import { TransactionDialog } from "modules/transaction/transaction-dialog";
import { useDecryptBids } from "../hooks/use-decrypt-auction";
import { RequiresChain } from "components/requires-chain";
import { LoadingIndicator } from "modules/app/loading-indicator";
import { AuctionCoreMetrics } from "../auction-core-metrics";

export function EncryptedMarginalPriceAuctionConcluded({
  auction,
}: PropsWithAuction) {
  const [open, setOpen] = React.useState(false);
  const decrypt = useDecryptBids(auction);

  const totalBidsRemaining =
    (auction.formatted?.totalBids ?? 0) -
    (auction.formatted?.totalBidsClaimed ?? 0);

  return (
    <div className="auction-action-container">
      <div className="flex w-full flex-col gap-y-4 lg:w-3/5">
        <AuctionCoreMetrics auction={auction} />
      </div>

      <div className="lg:w-2/5">
        <TransactionDialog
          signatureMutation={decrypt.decryptTx}
          disabled={decrypt.isWaiting}
          chainId={auction.chainId}
          hash={decrypt.decryptTx.data!}
          error={decrypt.error}
          onConfirm={decrypt.handleDecryption}
          mutation={decrypt.decryptReceipt}
          open={open}
          onOpenChange={(open) => {
            setOpen(open);
            if (decrypt.decryptReceipt.isSuccess || decrypt.decryptTx.isError) {
              decrypt.decryptTx.reset();
            }
          }}
        />
        <Card title="Concluded" className="mt-4 w-full lg:mt-0">
          <div className="green-gradient w-fill flex h-[264px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <img
                className="w-[92.351]px h-[80px]"
                src="/images/axis-logo.svg"
                alt="Axis Logo"
              />
              <Text size="xl" className="text-center">
                Decrypt bids before settling the auction
              </Text>
            </div>
          </div>
          <div className="bg-secondary text-foreground flex justify-center gap-x-2 rounded-sm p-4">
            <div>
              <h1 className="text-4xl">
                {auction.formatted?.totalBidsDecrypted}
              </h1>
              <p>Bids Decrypted</p>
            </div>

            <p className="text-6xl">/</p>

            <div>
              <h1 className="text-4xl">{totalBidsRemaining}</h1>
              <p>Total Remaining Bids</p>
            </div>
          </div>
          <RequiresChain chainId={auction.chainId} className="mt-4">
            <div className="mt-4 w-full">
              <Button
                className="w-full"
                disabled={decrypt.isWaiting}
                onClick={() => setOpen(true)}
              >
                {decrypt.isWaiting ? (
                  <div className="flex">
                    Waiting for confirmation...
                    <div className="w-1/2"></div>
                    <LoadingIndicator />
                  </div>
                ) : (
                  "Decrypt Bids"
                )}
              </Button>
            </div>
          </RequiresChain>
        </Card>
      </div>
    </div>
  );
}
