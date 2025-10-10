"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

const AirDrop = () => {
  const wallet = useWallet();
  return (
    <div>
      {wallet.publicKey?.toString()}
      <input type="text" placeholder="Enter amount" />
      <button>Airdrop</button>
    </div>
  );
};

export default AirDrop;
