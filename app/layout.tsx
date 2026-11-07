"use client";

import "./globals.css";
import React, { useMemo, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Buffer } from "buffer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensure Buffer is globally accessible to Phantom & Solana Web3
  if (typeof window !== "undefined" && !(window as any).Buffer) {
    (window as any).Buffer = Buffer;
  }

  const endpoint = "https://api.devnet.solana.com";
  const wallets = useMemo(() => [], []);

  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}