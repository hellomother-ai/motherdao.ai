import React from "react";
import { useAccount } from "wagmi";
import { type Address, isAddress } from "viem";
import {
  Text,
  Button,
  Input,
  LabelWrapper,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui";
import { useReferralLink } from "./use-referral-link";
import { ShareRefLinkButton } from "./share-ref-link-button";

export function ReferralLinkCard() {
  const { address: connectedAddress } = useAccount();
  const [address, setAddress] = React.useState<Address | undefined>(
    connectedAddress,
  );

  const { generateAndCopyLink, link } = useReferralLink(address);

  React.useEffect(() => {
    setAddress(connectedAddress);
  }, [connectedAddress]);

  return (
    <div className="flex max-w-lg flex-col items-center justify-center gap-6">
      <Tabs
        defaultValue={"address"}
        className="flex w-full flex-col items-center"
      >
        <TabsList defaultValue={"address"}>
          <TabsTrigger value="address">Current Wallet</TabsTrigger>
        </TabsList>

        <LabelWrapper
          content="Address"
          tooltip="The address to receive the referrer fees. The link generated uses a hash of the address, not the original address."
          className="mt-lg"
        >
          <TabsContent value="address">
            <Input
              defaultValue={address}
              onChange={(e) =>
                isAddress(e.target.value) && setAddress(e.target.value)
              }
            />
          </TabsContent>
        </LabelWrapper>
      </Tabs>

      <div className="gap-x-md mt-md flex justify-center">
        <ShareRefLinkButton />

        <Button
          disabled={!address}
          className="w-full"
          onClick={() => generateAndCopyLink()}
        >
          Generate and Copy Link
        </Button>
      </div>

      {link && (
        <div className="space-y-xs mt-xs text-center">
          <Text>Your link:</Text>
          <Text size="md">{link}</Text>
        </div>
      )}
    </div>
  );
}
