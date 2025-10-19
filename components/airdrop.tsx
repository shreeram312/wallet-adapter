"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState } from "react";

const AirDrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState(0);

  const handleAirdrop = () => {
    if (!wallet.publicKey) {
      return;
    }
    console.log(wallet.publicKey.toBase58() + " " + amount * LAMPORTS_PER_SOL);
    const airdrop = connection.requestAirdrop(
      wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
    alert(`Airdropped ${airdrop} SOL`);
  };
  return (
    <div>
      {wallet.publicKey?.toString()}
      <input
        onChange={(e) => setAmount(Number(e.target.value))}
        type="text"
        placeholder="Enter amount"
      />
      <button onClick={handleAirdrop}>Airdrop</button>
    </div>
  );
};

export default AirDrop;
