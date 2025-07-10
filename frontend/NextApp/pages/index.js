import Image from 'next/image';
import logo from '../public/logo.png';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../contract/NeurixToken.json';

export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;

  async function connect() {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);

      // load balance
      const contract = new ethers.Contract(tokenAddress, abi, provider);
      const bal = await contract.balanceOf(addr);
      setBalance(ethers.utils.formatUnits(bal, 18));
    }
  }

  useEffect(() => {
    if (account) connect();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <Image src={logo} alt='Neurix Logo' width={100} height={100} />
      <h1>Neurix Platform</h1>
      {account ? (
        <>
          <p>Connected: {account}</p>
          <p>NRX Balance: {balance}</p>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
