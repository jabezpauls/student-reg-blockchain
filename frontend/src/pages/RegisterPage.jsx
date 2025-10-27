import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import WalletConnect from '../components/WalletConnect';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

// Import contract ABI and address
import StudentRegistryABI from '../contracts/StudentRegistry.json';
import contractAddressData from '../contracts/contract-address.json';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState(contractAddressData.StudentRegistry || '');
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
    setRefreshList(prev => prev + 1);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <button onClick={handleBackToHome} style={styles.backButton}>
            ← Back to Home
          </button>
        </div>
        <h1 style={styles.mainTitle}>Student Registry - Blockchain App</h1>
        <p style={styles.subtitle}>Decentralized Student Information Storage on Local Blockchain</p>
      </header>

      <div style={styles.container}>
        <WalletConnect onConnect={handleWalletConnect} />

        {walletData && (
          <>
            {!contractAddress ? (
              <div style={styles.contractSetup}>
                <h3>⚠️ Contract Not Found</h3>
                <p>No contract address detected. Please deploy the contract first:</p>
                <p style={styles.hint}>
                  Run in terminal: <code>npm run setup</code>
                </p>
                <p style={styles.manualOverride}>Or enter address manually:</p>
                <input
                  type="text"
                  placeholder="0x..."
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  style={styles.contractInput}
                />
              </div>
            ) : (
              <>
                <div style={styles.contractInfo}>
                  <strong>Contract Address:</strong>
                  <span style={styles.contractAddress}>
                    {contractAddress}
                  </span>
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
        <p>Powered by Ethereum (Ganache) | Built with React + Hardhat + ethers.js</p>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-primary)',
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
    position: 'relative',
  },
  headerTop: {
    maxWidth: '1200px',
    margin: '0 auto 20px',
    textAlign: 'left',
  },
  backButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
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
    backgroundColor: 'var(--color-bg-card)',
    padding: '35px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-lg)',
    marginBottom: '30px',
    border: '1px solid var(--color-border)',
  },
  contractInput: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    border: '2px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    borderRadius: '8px',
    marginTop: '12px',
    fontFamily: 'monospace',
    transition: 'border-color 0.2s ease',
    outline: 'none',
  },
  hint: {
    marginTop: '15px',
    padding: '14px 16px',
    backgroundColor: 'var(--color-bg-accent)',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-border)',
  },
  manualOverride: {
    marginTop: '15px',
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
  },
  contractInfo: {
    backgroundColor: 'var(--color-bg-card)',
    padding: '18px 20px',
    borderRadius: '10px',
    marginBottom: '30px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
    border: '2px solid var(--color-primary)',
  },
  contractAddress: {
    color: 'var(--color-primary)',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
    fontSize: '14px',
    fontWeight: '600',
  },
  welcome: {
    backgroundColor: 'var(--color-bg-card)',
    padding: '60px 40px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-lg)',
    textAlign: 'center',
    border: '1px solid var(--color-border)',
  },
  welcomeTitle: {
    fontSize: '28px',
    marginBottom: '15px',
    color: 'var(--color-text-primary)',
  },
  welcomeText: {
    fontSize: '16px',
    color: 'var(--color-text-secondary)',
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '25px',
    marginTop: 'auto',
    fontSize: '14px',
    borderTop: '1px solid var(--color-border)',
  },
};

export default RegisterPage;
