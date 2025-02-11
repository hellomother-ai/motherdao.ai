import {
  IconedLabel,
  Input,
  DialogInputProps,
  Skeleton,
  FormField,
  FormItemWrapper,
} from "@repo/ui";
import useERC20 from "loaders/use-erc20";
import React from "react";
import { Token } from "@axis-finance/types";
import { Address, formatUnits } from "viem";
import { useChainId } from "wagmi";
import { useFormContext, Path } from "react-hook-form";

type TokenPickerProps<T> = {
  onChange?: NonNullable<
    DialogInputProps<Token>["children"]
  >["props"]["onChange"];
  onChainChange?: (chainId: number) => void;
  name: Path<T>;
  value?: Partial<Token>;
};

export function TokenPicker<
  T extends Record<string, { address: Address; logoURI?: string }>,
>({ onChange, ...props }: React.PropsWithChildren<TokenPickerProps<T>>) {
  const form = useFormContext<T>();
  const [address, logo] = form.watch([
    `${props.name}.address` as Path<T>,
    `${props.name}.logoURI` as Path<T>,
  ]) as [Address, string];

  const chainId = useChainId();

  const { token, isError, response } = useERC20({
    address: address as Address,
    chainId,
  });

  const { isLoading, isSuccess } = response;

  React.useEffect(() => {
    onChange(
      {
        ...token,
        logoURI: logo,
        totalSupply: formatUnits(
          BigInt(token.totalSupply ?? 0n),
          Number(token.decimals),
        ),
      },
      { label: token.symbol, imgURL: logo },
    );
    if (token.address) {
      form.trigger([props.name]);
    }
  }, [isSuccess, onChange, token, logo]);

  return (
    <div>
      <div className="flex items-center gap-x-2 space-y-4">
        <FormField
          control={form.control}
          name={`${props.name}.address` as Path<T>}
          render={({ field }) => (
            <FormItemWrapper label="Token Address">
              <Input
                placeholder="0x000...000"
                {...field}
                value={field.value as string}
              />
            </FormItemWrapper>
          )}
        />

        {/* <ComboBox
          label="Chain"
          defaultValue={chainId}
          onChange={(value) => {
            const chainId = Number(value);
            setNewChain(chainId);
            onChainChange?.(chainId);
          }}
          options={activeChains.map((c) => ({
            value: c.id.toString(),
            label: c.name,
          }))}
          triggerElement={
            <Avatar className="cursor-pointer" alt={chain?.name} />
          }
        />
 */}
      </div>
      {isSuccess && (
        <FormField
          control={form.control}
          name={`${props.name}.logoURI` as Path<T>}
          render={({ field }) => (
            <FormItemWrapper label="Token Logo" className="mt-6">
              <Input
                placeholder="http://yourdao.link/token.jpeg"
                {...field}
                value={field.value as string}
              />
            </FormItemWrapper>
          )}
        />
      )}

      <div className="flex flex-col items-center justify-center pt-4">
        {isLoading && <Skeleton className="h-[20px] w-[80px]" />}
        {(isSuccess || logo) && (
          <IconedLabel src={logo} label={token.symbol?.toString() ?? ""} />
        )}
        {isError && <h4>Token not found</h4>}
      </div>
    </div>
  );
}
