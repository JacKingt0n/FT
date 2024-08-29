import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const MetaMaskConnect = ({ setAccount }) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const checkMetaMask = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setConnected(true);
        }
      }
    };
    checkMetaMask();
  }, [setAccount]);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setConnected(true);
    }
  };

  return !connected ? <button onClick={connectMetaMask}>Connect MetaMask</button> : null;
};

export default MetaMaskConnect;
