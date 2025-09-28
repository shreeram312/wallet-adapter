"use client";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

const SolanaWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [index, setIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<any[]>([]);

  const handleCreateSolanaWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/60'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString()).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret).publicKey;

    setIndex(index + 1);
    setPublicKeys([...publicKeys, keypair]);
  };

  return (
    <div>
      <button onClick={handleCreateSolanaWallet}>Add Solana Wallet </button>
      {publicKeys.map((p) => p.toBase58())}
    </div>
  );
};

export default SolanaWallet;
