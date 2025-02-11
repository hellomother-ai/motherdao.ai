import { hashFn } from "wagmi/query";
import { WagmiProvider, createConfig } from "wagmi";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { chains } from "@axis-finance/env";
import { environment } from "utils/environment";
import WalletProvider, { connectors } from "./wallet-provider";

const activeConfig = chains.activeConfig(environment.isTestnet);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /*
        TanStack Query can't handle bigint queryKey data type by default.
        Wagmi hashFn handles bigints for this purpose.
      */
      queryKeyHashFn: hashFn,
      refetchOnWindowFocus: false,
    },
  },
});

//@ts-expect-error type mismatch
const wagmiConfig = createConfig({ ...activeConfig, connectors });

export function BlockchainProvider({
  children,
  disableDevTools,
}: {
  children: React.ReactNode;
  disableDevTools?: boolean;
}) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>{children}</WalletProvider>
        {!disableDevTools && <ReactQueryDevtools />}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
