import { Auction, CallbacksType } from "@axis-finance/types";
import { getCallbacksType } from "../utils/get-callbacks-type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItemWrapper, Input } from "@repo/ui";
import { encodeAbiParameters } from "viem";
import { useEffect } from "react";

const uniswapSchema = z
  .object({
    maxSlippage: z.string().optional(),
  })
  .refine(
    (data) =>
      data.maxSlippage &&
      Number(data.maxSlippage) >= 0.001 &&
      Number(data.maxSlippage) < 100,
    {
      message: "Slippage must be >= 0 and < 100",
      path: ["maxSlippage"],
    },
  );
type UniswapForm = z.infer<typeof uniswapSchema>;

export function SettleAuctionCallbackInput({
  auction,
  setCallbackData,
  setCallbackDataIsValid,
}: {
  auction: Auction;
  setCallbackData: (data: `0x${string}` | undefined) => void;
  setCallbackDataIsValid: (isValid: boolean) => void;
}) {
  // Determine the callback type
  const callbackType = getCallbacksType(auction);
  const DEFAULT_MAX_SLIPPAGE = "0.5";

  const form = useForm<UniswapForm>({
    resolver: zodResolver(uniswapSchema),
    mode: "onChange",
    delayError: 600,
    defaultValues: { maxSlippage: DEFAULT_MAX_SLIPPAGE },
  });

  const updateUniswapDtlCallbackData = (maxSlippage: number) => {
    // Validate
    if (maxSlippage < 0.001 || maxSlippage >= 100) {
      setCallbackDataIsValid(false);
      return;
    }

    // Upscale
    const maxSlippageUpscaled = maxSlippage * 1e3;

    // Encode
    const encodedCallbackData = encodeAbiParameters(
      [
        {
          name: "OnClaimProceedsParams",
          type: "tuple",
          components: [{ name: "maxSlippage", type: "uint24" }],
        },
      ],
      [
        {
          maxSlippage: maxSlippageUpscaled,
        },
      ],
    );

    // Pass to parent
    setCallbackData(encodedCallbackData);

    // Flag as valid
    setCallbackDataIsValid(true);
    console.debug("SettleAuctionCallbackInput: Updated callback data");
  };

  // Update callback data on mount
  useEffect(() => {
    if (
      callbackType === CallbacksType.UNIV2_DTL ||
      callbackType === CallbacksType.UNIV3_DTL
    ) {
      updateUniswapDtlCallbackData(Number(DEFAULT_MAX_SLIPPAGE));
      return;
    }

    // Otherwise set the callback data to undefined and mark it as valid
    setCallbackData(undefined);
    setCallbackDataIsValid(true);
  }, [callbackType]);

  if (
    callbackType === CallbacksType.UNIV2_DTL ||
    callbackType === CallbacksType.UNIV3_DTL
  ) {
    // Monitor changes to the form
    form.watch((data) => {
      updateUniswapDtlCallbackData(Number(data.maxSlippage) || 0);
    });

    // NOTE: This is a temporary solution to hide the form fields
    const displayFields = false;

    return (
      displayFields && (
        <Form {...form}>
          <div className="grid grid-flow-row grid-cols-2">
            <FormField
              control={form.control}
              name="maxSlippage"
              render={({ field }) => (
                <FormItemWrapper
                  label="Max Slippage"
                  tooltip="The percentage of slippage tolerated when depositing into the pool."
                >
                  <Input placeholder="0.5" type="number" {...field} />
                </FormItemWrapper>
              )}
            />
          </div>
        </Form>
      )
    );
  }

  return <></>;
}
