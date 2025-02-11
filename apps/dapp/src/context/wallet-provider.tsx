import "@rainbow-me/rainbowkit/styles.css";

import { PropsWithChildren } from "react";
import {
  RainbowKitProvider,
  connectorsForWallets,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  frameWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

export const connectors = connectorsForWallets(
  [
    {
      groupName: "Common",
      wallets: [
        injectedWallet,
        rainbowWallet,
        frameWallet,
        walletConnectWallet,
      ],
    },
  ],
  { projectId, appName: "Axis Finance" },
);

export default function WalletProvider(props: PropsWithChildren) {
  return (
    <RainbowKitProvider
      appInfo={{
        appName: "Axis Finance",
        learnMoreUrl: "https://docs.axis.finance",
        disclaimer: () => (
          <p>
            This application is in alpha stage, so there&apos;s obviously bugs
            and broken stuff.
          </p>
        ),
      }}
      theme={midnightTheme()}
      modalSize="compact"
    >
      {props.children}
    </RainbowKitProvider>
  );
}
