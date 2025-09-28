"use client";

import { useState } from "react";

export default function EthereumWallet({ mnemonic }: { mnemonic: string }) {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <button>Add Ethereum Wallet </button>
    </div>
  );
}
