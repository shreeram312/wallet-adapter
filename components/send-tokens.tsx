"use client";
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
    alert("Sent successfully");
    setRecipient("");
    setAmount(0);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Tokens</h2>

      {!wallet.publicKey ? (
        <p className="text-gray-500 text-sm">
          Connect your wallet to send tokens
        </p>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Address
            </label>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              type="text"
              placeholder="Enter recipient's Solana address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (SOL)
            </label>
            <input
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              type="number"
              step="0.001"
              min="0"
              placeholder="Enter amount to send"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
            />
          </div>

          <button
            onClick={handleSendTokens}
            className="w-full bg-gray-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span>Send Tokens</span>
          </button>

          <p className="text-xs text-gray-500 text-center">
            Transaction fees will be deducted from your balance
          </p>
        </div>
      )}
    </div>
  );
};

export default SendTokens;
