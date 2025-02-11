import { AuctionType, PropsWithAuction } from "@axis-finance/types";
import {
  Button,
  Text,
  Input,
  LabelWrapper,
  PopoverRoot,
  PopoverContent,
  PopoverTrigger,
  cn,
} from "@repo/ui";
import { useAccount } from "wagmi";
import { useReferralLink } from "./use-referral-link";
import { isAddress } from "viem";
import React from "react";
import { getAuctionPath } from "utils/router";

export function ReferrerPopover({ auction }: PropsWithAuction) {
  const { address: connectedAddress } = useAccount();
  const [address, setAddress] = React.useState(connectedAddress);
  const { generateLink, copyLink, link } = useReferralLink(address);
  const [copied, setCopied] = React.useState(false);

  const handleGenerateLink = () => {
    generateLink(getAuctionPath(auction));
  };

  const handleCopy = async () => {
    await copyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  React.useEffect(() => {
    handleGenerateLink();
  }, [address]);
  const isEMP = auction.auctionType === AuctionType.SEALED_BID;

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="sm">
          Refer this launch
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-surface min-w-[400px]">
        <div>
          <Text size="lg">
            Earn fees by referring {isEMP ? "bidders" : "buyers"}
          </Text>
          <LabelWrapper
            content="Address"
            className="mt-2"
            tooltip="Add your address to generate a referral link"
          >
            <Input
              defaultValue={address}
              onChange={(e) =>
                isAddress(e.target.value) && setAddress(e.target.value)
              }
            />
            <Text className="text-center">Your link:</Text>
            <Text size="xs" className="text-center">
              {link}
            </Text>
            <Text
              className={cn(
                "bg-feedback-success/50 bottom-12 right-4 mx-auto rounded-md p-1 px-2 text-center opacity-0 transition-all",
                copied && "bottom-14 opacity-100",
              )}
            >
              Copied to clipboard!
            </Text>
            <Button
              disabled={!address}
              className="inline uppercase"
              onClick={() => handleCopy()}
            >
              Copy Link
            </Button>
          </LabelWrapper>
        </div>
      </PopoverContent>
    </PopoverRoot>
  );
}
