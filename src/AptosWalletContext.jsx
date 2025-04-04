import React, { createContext, useContext, useEffect, useState } from "react";

const AptosWalletContext = createContext();

export const AptosWalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window.aptos) {
      window.aptos.on("accountChanged", (newAccount) => {
        setAccount(newAccount);
        setIsConnected(true);
      });

      window.aptos.on("disconnected", () => {
        setAccount(null);
        setIsConnected(false);
      });
    }
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    if (window.aptos) {
      try {
        const account = await window.aptos.connect();
        setAccount(account);
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to connect to Petra Wallet", error);
      }
    } else {
      alert("Please install Petra Wallet");
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    if (window.aptos) {
      try {
        await window.aptos.disconnect();
        setAccount(null);
        setIsConnected(false);
      } catch (error) {
        console.error("Failed to disconnect wallet", error);
      }
    }
  };

  return (
    <AptosWalletContext.Provider
      value={{
        account,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </AptosWalletContext.Provider>
  );
};

export const useAptosWallet = () => useContext(AptosWalletContext);
