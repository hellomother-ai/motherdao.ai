import React from "react";
import { Button, Input, LabelWrapper, Link, Select } from "@repo/ui";
import { BlockExplorerLink } from "components/blockexplorer-link";
import { LoadingIndicator } from "modules/app/loading-indicator";
import { PageContainer } from "modules/app/page-container";
import { useMintToken } from "modules/token/use-mint-token";
import { useTokenLists } from "state/tokenlist";
import { useChainId } from "wagmi";
import { trimCurrency } from "utils/currency";
import { chains } from "@axis-finance/env";
import {
  arbitrumSepolia,
  blastSepolia,
  modeTestnet,
  mantleSepoliaTestnet,
} from "viem/chains";
import { ArrowUpRightIcon } from "lucide-react";

import { environment } from "utils/environment";

const activeChains = chains.activeChains(environment.isTestnet);

const ethFaucets: Record<number, string> = {
  [blastSepolia.id]: "https://faucet.quicknode.com/blast/sepolia",
  [modeTestnet.id]: "https://docs.mode.network/tools/testnet-faucets",
  [arbitrumSepolia.id]: "https://www.alchemy.com/faucets/arbitrum-sepolia",
  [mantleSepoliaTestnet.id]: "https://faucet.testnet.mantle.xyz",
};

export function FaucetPage() {
  const tokenlists = useTokenLists();
  const chainId = useChainId();
  const chain = activeChains.find((c) => c.id === chainId);

  const tokens = React.useMemo(
    () =>
      tokenlists.lists
        .flatMap((t) => t.tokens)
        .filter((t) => t.chainId === chainId && t.mintable),
    [chainId],
  );

  const options = React.useMemo(() => {
    return tokens.map((t) => ({
      label: t.symbol,
      imgURL: t.logoURI,
      value: t,
    }));
  }, [tokens]);

  const [amount, setAmount] = React.useState<string>("10000");
  const [token, setToken] = React.useState(tokens[0]);

  const mint = useMintToken(token, amount);
  const disabled = !mint.mintCall.isSuccess;

  return (
    <PageContainer id="__AXIS_FAUCET_PAGE__" title="Faucet">
      <div className="mx-auto flex max-w-sm flex-col justify-center gap-2">
        <LabelWrapper content="Token">
          {options.length ? (
            <Select
              //@ts-expect-error TODO: make generic
              options={options}
              //@ts-expect-error TODO: make generic
              onChange={setToken}
            />
          ) : (
            <div className="font-aeonpro text-center text-xs">
              No tokens available in this chain. <br />
            </div>
          )}
        </LabelWrapper>

        <LabelWrapper content="Amount">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </LabelWrapper>
        <Button disabled={disabled} className="mt-4" onClick={mint.handleMint}>
          Mint
        </Button>
      </div>
      <div className="mx-auto mt-4 text-center">
        {mint.mintReceipt.isLoading && (
          <div className="flex items-center">
            Waiting for confirmation{" "}
            <div className="size-8">
              <LoadingIndicator className="size-8 fill-white" />
            </div>
          </div>
        )}
        {mint.mintTx.isSuccess && (
          <div>
            View transaction on&nbsp;
            <BlockExplorerLink
              showName
              chainId={chainId}
              hash={mint.mintTx.data}
            />
          </div>
        )}
        {mint.mintReceipt.isSuccess && (
          <>
            <p>
              Minted {trimCurrency(amount)} {token.symbol}{" "}
            </p>
            Token Address{" "}
            <BlockExplorerLink chainId={chainId} address={token.address} />
          </>
        )}
      </div>
      <div className="text-center text-xs">
        <p>Need {chain?.name} ETH? </p>
        <Link
          href={ethFaucets[chain!.id]}
          className="flex items-center justify-center"
        >
          Get some here <ArrowUpRightIcon className="inline size-4" />
        </Link>
      </div>
    </PageContainer>
  );
}
