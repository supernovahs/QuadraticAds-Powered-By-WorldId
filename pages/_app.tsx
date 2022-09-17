import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Layout from "../components/Layout";
import { ChakraProvider } from '@chakra-ui/react';

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygonMumbai
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <WagmiConfig client={wagmiClient}>
       <ChakraProvider>
      <RainbowKitProvider chains={chains}>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
       </ChakraProvider>
    </WagmiConfig>
  );
}

export default MyApp;
