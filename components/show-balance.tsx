import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useEffect, useState } from "react";

const ShowBalance = () => {
  const [balance, setBalance] = useState(0);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const getUserBalance = async () => {
    const bal = await connection.getBalance(publicKey!);
    setBalance(bal / LAMPORTS_PER_SOL);
  };

  useEffect(() => {
    getUserBalance();
  }, [publicKey]);

  return (
    <div>
      <p>Balance: {balance} SOL</p>
    </div>
  );
};

export default ShowBalance;
