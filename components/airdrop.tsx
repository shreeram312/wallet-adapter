"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React from "react";

const AirDrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleAirdrop = async () => {
    if (!wallet.publicKey) {
      return;
    }
    const airdrop = await connection.requestAirdrop(
      wallet.publicKey,
      100000000
    );
  };
  return (
    <div>
      {wallet.publicKey?.toString()}
      <input type="text" placeholder="Enter amount" />
      <button onClick={handleAirdrop}>Airdrop</button>
    </div>
  );
};

export default AirDrop;
