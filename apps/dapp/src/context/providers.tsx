import { ToggleProvider, TooltipProvider } from "@repo/ui";
import { BlockchainProvider } from "./blockchain-provider";
import { OriginSdkProvider } from "@axis-finance/sdk/react";
import { createSdk } from "@axis-finance/sdk";
import { getCloakServer, getMetadataServer } from "@axis-finance/env";
import { DialogProvider } from "./dialog-provider";
import { environment } from "utils/environment";

const sdk = createSdk({
  environment: environment.current,
  cloak: {
    url: getCloakServer(environment.current).url,
  },
  metadata: {
    url: getMetadataServer(environment.current).url,
  },
});

type ProviderProps = React.PropsWithChildren<{
  disableDevTools?: boolean;
  disableDialogProvider?: boolean;
}>;

export function Providers(props: ProviderProps) {
  return (
    <ToggleProvider initialToggle={true}>
      <BlockchainProvider disableDevTools={props.disableDevTools}>
        <OriginSdkProvider sdk={sdk}>
          <TooltipProvider delayDuration={350}>
            <DialogProvider disabled={props.disableDialogProvider}>
              {props.children}
            </DialogProvider>
          </TooltipProvider>
        </OriginSdkProvider>
      </BlockchainProvider>
    </ToggleProvider>
  );
}
