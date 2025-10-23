"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState } from "react";

const AirDrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAirdrop = async () => {
    if (!wallet.publicKey || !amount) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        Number(amount) * LAMPORTS_PER_SOL
      );
      console.log("Airdrop requested:", signature);

      const confirmation = await connection.confirmTransaction(
        signature,
        "confirmed"
      );

      if (confirmation.value.err) {
        throw new Error("Airdrop failed to confirm");
      }

      console.log("Airdrop confirmed:", signature);
      setSuccess(true);
      setAmount("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      console.error("Airdrop failed:", error);

      if (error.message?.includes("airdrop request limit")) {
        alert("Airdrop limit reached. Please try again later.");
      } else if (error.message?.includes("429")) {
        alert("Too many requests. Please wait a moment and try again.");
      } else {
        alert(`Airdrop failed: ${error.message || "Please try again."}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Request Airdrop
      </h2>

      {!wallet.publicKey ? (
        <p className="text-gray-500 text-sm">
          Connect your wallet to request airdrop
        </p>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (SOL)
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Enter amount (max 5 SOL)"
              disabled={loading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
            />
          </div>

          <button
            onClick={handleAirdrop}
            disabled={!amount || loading || Number(amount) <= 0}
            className="w-full bg-gray-900 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Requesting...</span>
              </>
            ) : success ? (
              <>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Success!</span>
              </>
            ) : (
              <span>Request Airdrop</span>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Devnet tokens for testing purposes only
          </p>
        </div>
      )}
    </div>
  );
};

export default AirDrop;
