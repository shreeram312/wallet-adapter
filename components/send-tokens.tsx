import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useState } from "react";

const SendTokens = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleSendTokens = async () => {
    if (!wallet.publicKey) return;

    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transaction, connection);
    alert(transaction.signature);
  };

  return (
    <div>
      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        type="text"
        placeholder="Enter the recipient's public key"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        type="number"
        placeholder="Enter the amount of tokens to send"
      />
      <button onClick={handleSendTokens}>Send Tokens</button>
    </div>
  );
};

export default SendTokens;
