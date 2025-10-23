import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useEffect, useState } from "react";

const ShowBalance = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const getUserBalance = async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      const bal = await connection.getBalance(publicKey);
      setBalance(bal / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Wallet Balance</h2>
        <button
          onClick={getUserBalance}
          disabled={!publicKey || loading}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {!publicKey ? (
        <p className="text-gray-500 text-sm">
          Connect your wallet to view balance
        </p>
      ) : loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-900"></div>
          <span className="text-gray-500 text-sm">Loading...</span>
        </div>
      ) : (
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">
            {balance.toFixed(4)}
          </span>
          <span className="text-gray-500 text-lg">SOL</span>
        </div>
      )}
    </div>
  );
};

export default ShowBalance;
