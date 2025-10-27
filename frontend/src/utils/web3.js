import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get provider
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get signer
      const signer = await provider.getSigner();

      // Get account address
      const address = await signer.getAddress();

      // Get network
      const network = await provider.getNetwork();

      return {
        provider,
        signer,
        address,
        chainId: network.chainId.toString()
      };
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      throw error;
    }
  } else {
    throw new Error("MetaMask is not installed. Please install MetaMask to use this app.");
  }
};

export const switchToLocalhost = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x539' }], // Localhost chainId 1337 in hex
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x539',
              chainName: 'Localhost 8545',
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['http://127.0.0.1:8545'],
              blockExplorerUrls: null
            }
          ]
        });
      } catch (addError) {
        throw addError;
      }
    } else {
      throw switchError;
    }
  }
};

export const calculateFileHash = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        resolve('0x' + hashHex);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
};
