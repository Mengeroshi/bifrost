import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";

const queryClient = new QueryClient();

export const Wrappers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <StrictMode>{children}</StrictMode>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </WagmiProvider>
  );
};
