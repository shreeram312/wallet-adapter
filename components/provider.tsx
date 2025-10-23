"use client";
import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import AirDrop from "./airdrop";
import ShowBalance from "./show-balance";
import SendTokens from "./send-tokens";

export const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC_URL!}>
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <div className="container mx-auto px-4 py-4 max-w-5xl">
            {/* Header */}
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 ">
                Solana Wallet - DApp (Devnet)
              </h1>

              {/* Wallet Connection Button */}
              <div className="flex justify-center my-2">
                <WalletMultiButton className="!bg-gray-900 hover:!bg-gray-800 !rounded-lg !h-12 !px-6 !font-medium !transition-all" />
              </div>
              {children}
            </header>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Balance Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <ShowBalance />
              </div>

              {/* Airdrop Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <AirDrop />
              </div>
            </div>

            {/* Send Tokens Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <SendTokens />
            </div>

            {/* Footer */}
            <footer className="mt-12 text-center pb-8">
              <p className="text-sm text-gray-500">
                Connected to Solana Devnet • Use for testing only
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Secure • Fast • Decentralized
              </p>
            </footer>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
