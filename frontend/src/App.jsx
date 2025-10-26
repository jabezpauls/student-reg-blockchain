import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletConnect from './components/WalletConnect';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

// Import contract ABI (you'll need to update this after deployment)
// For now, we'll use a placeholder
import StudentRegistryABI from './contracts/StudentRegistry.json';

function App() {
  const [walletData, setWalletData] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState('');
  const [refreshList, setRefreshList] = useState(0);

  useEffect(() => {
    if (walletData && contractAddress) {
      initializeContract();
    }
  }, [walletData, contractAddress]);

  const initializeContract = async () => {
    try {
      const contractInstance = new ethers.Contract(
        contractAddress,
        StudentRegistryABI.abi,
        walletData.signer
      );
      setContract(contractInstance);
      console.log('Contract initialized:', contractAddress);
    } catch (error) {
      console.error('Error initializing contract:', error);
    }
  };

  const handleWalletConnect = (data) => {
    setWalletData(data);
  };

  const handleSuccess = () => {
    // Refresh the student list after successful submission
    setRefreshList(prev => prev + 1);
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>Student Registry - Blockchain App</h1>
        <p style={styles.subtitle}>Decentralized Student Information Storage on Sepolia Testnet</p>
      </header>

      <div style={styles.container}>
        <WalletConnect onConnect={handleWalletConnect} />

        {walletData && (
          <>
            {!contractAddress ? (
              <div style={styles.contractSetup}>
                <h3>Contract Setup</h3>
                <p>Enter the deployed contract address:</p>
                <input
                  type="text"
                  placeholder="0x..."
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  style={styles.contractInput}
                />
                <p style={styles.hint}>
                  Deploy the contract first using: <code>npx hardhat run scripts/deploy.js --network sepolia</code>
                </p>
              </div>
            ) : (
              <>
                <div style={styles.contractInfo}>
                  <strong>Contract Address:</strong>
                  <a
                    href={`https://sepolia.etherscan.io/address/${contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.contractLink}
                  >
                    {contractAddress}
                  </a>
                </div>

                {contract && (
                  <>
                    <StudentForm contract={contract} onSuccess={handleSuccess} />
                    <StudentList contract={contract} refresh={refreshList} />
                  </>
                )}
              </>
            )}
          </>
        )}

        {!walletData && (
          <div style={styles.welcome}>
            <h2 style={styles.welcomeTitle}>Welcome to Student Registry</h2>
            <p style={styles.welcomeText}>Please connect your MetaMask wallet to get started.</p>
            <ul style={styles.featureList}>
              <li>🔒 Store student information securely on blockchain</li>
              <li>📁 Upload files and store their cryptographic hash</li>
              <li>👥 View all registered students</li>
              <li>✨ Immutable and transparent record keeping</li>
            </ul>
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        <p>Powered by Ethereum Sepolia Testnet | Built with React + Hardhat + ethers.js</p>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  mainTitle: {
    margin: '0 0 10px 0',
    fontSize: '36px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    margin: 0,
    fontSize: '18px',
    opacity: 0.95,
    fontWeight: '300',
  },
  container: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    width: '100%',
  },
  contractSetup: {
    backgroundColor: '#fff',
    padding: '35px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    marginBottom: '30px',
    border: '1px solid #e8eaf0',
  },
  contractInput: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    border: '2px solid #e1e4e8',
    borderRadius: '8px',
    marginTop: '12px',
    fontFamily: 'monospace',
    transition: 'border-color 0.2s ease',
    outline: 'none',
  },
  hint: {
    marginTop: '15px',
    padding: '14px 16px',
    backgroundColor: '#f0f7ff',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#0366d6',
    border: '1px solid #c8e1ff',
  },
  contractInfo: {
    backgroundColor: '#f6ffed',
    padding: '18px 20px',
    borderRadius: '10px',
    marginBottom: '30px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
    border: '1px solid #b7eb8f',
  },
  contractLink: {
    color: '#1890ff',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
    textDecoration: 'none',
    fontSize: '14px',
  },
  welcome: {
    backgroundColor: '#fff',
    padding: '60px 40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    textAlign: 'center',
    border: '1px solid #e8eaf0',
  },
  welcomeTitle: {
    fontSize: '28px',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  welcomeText: {
    fontSize: '16px',
    color: '#7f8c8d',
    marginBottom: '30px',
  },
  featureList: {
    textAlign: 'left',
    maxWidth: '550px',
    margin: '30px auto 0',
    lineHeight: '2.5',
    fontSize: '16px',
    listStyleType: 'none',
    paddingLeft: 0,
  },
  footer: {
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '25px',
    marginTop: 'auto',
    fontSize: '14px',
  },
};

export default App;
