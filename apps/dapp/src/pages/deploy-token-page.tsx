import {
  Button,
  FormField,
  FormItemWrapper,
  Input,
  LabelWrapper,
} from "@repo/ui";
import { PageContainer } from "modules/app/page-container";
import { useDeployToken } from "modules/token/use-deploy-token";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlockExplorerLink } from "components/blockexplorer-link";
import { useChainId } from "wagmi";
import useERC20 from "loaders/use-erc20";
import React from "react";
import { useMintToken } from "modules/token/use-mint-token";
import type { Token } from "@axis-finance/types";
import { Address, isAddress } from "viem";

const schema = z.object({
  name: z.string(),
  symbol: z.string(),
});

export type TokenConfig = z.infer<typeof schema>;

export function DeployTokenPage() {
  const chainId = useChainId();
  const form = useForm<TokenConfig>({
    resolver: zodResolver(schema),
  });

  const [amount, setAmount] = React.useState("10000");

  const [address, setAddress] = React.useState<Address>();
  const { address: deployedAddress, ...deploy } = useDeployToken();

  const resolvedAddress = address ?? deployedAddress;

  const { token } = useERC20({ chainId, address: resolvedAddress });
  const mint = useMintToken(token as Token, amount);

  const disabled = !mint.mintCall.isSuccess;

  return (
    <PageContainer id="__AXIS_DEPLOY_PAGE__" title="Token Utilities">
      <div className="flex">
        <div className="flex w-1/2 flex-col items-center justify-center gap-y-2">
          <h4>Deploy</h4>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(deploy.handleDeploy)}
              className="flex w-full flex-col items-center justify-center"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItemWrapper label="Name">
                    <Input {...field} />
                  </FormItemWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItemWrapper label="Symbol">
                    <Input {...field} />
                  </FormItemWrapper>
                )}
              />

              <Button type="submit" className="mx-auto mt-4 flex max-w-sm">
                DEPLOY
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="mt-1 flex w-1/2 flex-col items-center ">
          <h4>Mint</h4>
          <LabelWrapper content="Address" className="mt-2">
            <Input
              value={resolvedAddress}
              onChange={(e) =>
                isAddress(e.target.value) && setAddress(e.target.value)
              }
            />
          </LabelWrapper>
          <LabelWrapper content="Amount" className="mt-1">
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
          </LabelWrapper>
          <Button
            disabled={disabled}
            className="mt-4 uppercase"
            onClick={mint.handleMint}
          >
            Mint
          </Button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex w-1/2 max-w-sm flex-col text-wrap">
          <h4>Deploy Status</h4>
          {deploy.mutation.isPending && "Waiting for signature..."}
          {deploy.receipt.isLoading && (
            <div>
              <div>
                View transaction on&nbsp;
                <BlockExplorerLink
                  address={deployedAddress}
                  chainId={chainId}
                />
              </div>
              <p>Waiting for confirmation...</p>
            </div>
          )}

          {deploy.receipt.isSuccess && (
            <div>
              <p>Token Deployed at address</p>
              <BlockExplorerLink address={deployedAddress} chainId={chainId} />
            </div>
          )}
          <div className="overflow-x-scroll">
            {deploy.mutation.isError && deploy.mutation.error.message}
          </div>
        </div>
        <div className="text-right">
          <h4>Mint Status</h4>
          {mint.mintTx.isSuccess && (
            <>
              View transaction on&nbsp;
              <BlockExplorerLink
                showName
                hash={mint.mintTx.data}
                chainId={chainId}
              />
            </>
          )}
          {mint.mintTx.isPending && <p>Waiting for signature...</p>}
          {mint.mintReceipt.isLoading && <p>Waiting for confirmation...</p>}
          {mint.mintReceipt.isSuccess && <p>Success</p>}
        </div>
      </div>
    </PageContainer>
  );
}
