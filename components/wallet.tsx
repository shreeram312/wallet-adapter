"use client";
import React, { useState } from "react";
import { generateMnemonic } from "bip39";

export default function Wallet() {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const handleCopySeedPhrase = () => {
    navigator.clipboard.writeText(mnemonic);
    alert("Seed Phrase copied to clipboard");
  };

  const handleGenerateSeedPhrase = () => {
    setMnemonic(generateMnemonic());
    setIsGenerated(true);
  };

  const handleSaveSeedPhrase = () => {
    localStorage.setItem("mnemonic", mnemonic);
    alert("Seed Phrase saved to localStorage");
  };

  return (
    <div>
      {isGenerated ? (
        <>
          <p>{mnemonic}</p>
          <button onClick={handleSaveSeedPhrase}>Save Seed Phrase</button>
        </>
      ) : (
        <button onClick={handleGenerateSeedPhrase}>
          Generate a Seed Phrase
        </button>
      )}
      <br />
      <button onClick={handleCopySeedPhrase}>Copy Seed Phrase</button>
    </div>
  );
}
