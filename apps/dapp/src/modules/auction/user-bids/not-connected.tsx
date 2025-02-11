import { Badge, Card, Text } from "@repo/ui";
import type { BatchAuction, PropsWithAuction } from "@axis-finance/types";
import { RequiresChain } from "components/requires-chain";

export function NotConnectedClaimCard({ auction: _auction }: PropsWithAuction) {
  const auction = _auction as BatchAuction;

  return (
    <Card title="Claim" headerRightElement={<Badge>Auction Closed</Badge>}>
      <div className="flex flex-col gap-y-4">
        <div className="green-gradient w-fill flex h-[464px] items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <img
              className="w-[92.351]px h-[80px]"
              src="/images/axis-logo.svg"
              alt="Axis Logo"
            />
            <Text size="xl">Auction has ended</Text>
            <Text>Connect your wallet to claim your tokens</Text>
          </div>
        </div>
        <RequiresChain className="w-full max-w-lg" chainId={auction.chainId} />
      </div>
    </Card>
  );
}
