import { useState, useEffect } from 'react';
import Web3 from 'web3';

const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      const web3Instance = new Web3(Web3.givenProvider || "http://localhost:8545");
      setWeb3(web3Instance);
    };
    initWeb3();
  }, []);

  return web3;
};

export default useWeb3;
