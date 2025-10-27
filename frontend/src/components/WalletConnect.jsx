import { useState, useEffect } from 'react';
import { connectWallet, switchToLocalhost } from '../utils/web3';

const WalletConnect = ({ onConnect }) => {
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  const LOCALHOST_CHAIN_ID = '1337'; // Localhost/Ganache in decimal

  useEffect(() => {
    // Check if already connected
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    // Check if user manually disconnected
    const wasDisconnected = localStorage.getItem('walletDisconnected');
    if (wasDisconnected === 'true') {
      return; // Don't auto-connect if user disconnected
    }

    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const walletData = await connectWallet();
          setAccount(walletData.address);
          setChainId(walletData.chainId);
          onConnect(walletData);
        }
      } catch (err) {
        console.error('Error checking connection:', err);
      }
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount('');
      setChainId('');
      onConnect(null);
    } else {
      window.location.reload();
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const handleConnect = async () => {
    setConnecting(true);
    setError('');

    try {
      // Clear the disconnected flag when user connects
      localStorage.removeItem('walletDisconnected');

      const walletData = await connectWallet();
      setAccount(walletData.address);
      setChainId(walletData.chainId);

      // Check if on localhost network
      if (walletData.chainId !== LOCALHOST_CHAIN_ID) {
        await switchToLocalhost();
        window.location.reload();
      } else {
        onConnect(walletData);
      }
    } catch (err) {
      setError(err.message);
      console.error('Connection error:', err);
    } finally {
      setConnecting(false);
    }
  };

  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleDisconnect = () => {
    localStorage.setItem('walletDisconnected', 'true');
    setAccount('');
    setChainId('');
    onConnect(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(account);
    // You could add a toast notification here
    alert('Address copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      {!account ? (
        <div style={styles.disconnectedContainer}>
          <div style={styles.walletIcon}>🦊</div>
          <h3 style={styles.connectTitle}>Connect Your Wallet</h3>
          <p style={styles.connectDescription}>
            Connect with MetaMask to start registering students on the blockchain
          </p>
          <button
            onClick={handleConnect}
            disabled={connecting}
            style={styles.button}
          >
            {connecting ? '⏳ Connecting...' : '🔗 Connect MetaMask'}
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      ) : (
        <div style={styles.connectedContainer}>
          <div style={styles.connectedHeader}>
            <div style={styles.connectedInfo}>
              <div style={styles.topRow}>
                <div style={styles.statusIndicator}>
                  <span style={styles.statusDot}></span>
                  <span style={styles.statusText}>Connected</span>
                </div>
                {chainId === LOCALHOST_CHAIN_ID && (
                  <span style={styles.networkBadge}>
                    🌐 Localhost (Ganache)
                  </span>
                )}
              </div>
              <div style={styles.addressContainer}>
                <span style={styles.walletIcon}>🦊</span>
                <span style={styles.address} title={account}>{formatAddress(account)}</span>
                <button
                  onClick={copyToClipboard}
                  style={styles.copyButton}
                  title="Copy address"
                >
                  📋
                </button>
              </div>
            </div>
            <button onClick={handleDisconnect} style={styles.disconnectButton}>
              🚪 Disconnect
            </button>
          </div>

          {chainId !== LOCALHOST_CHAIN_ID && (
            <div style={styles.wrongNetwork}>
              <p style={styles.wrongNetworkText}>
                ⚠️ Wrong Network! Please switch to Localhost.
              </p>
              <button onClick={() => switchToLocalhost()} style={styles.switchButton}>
                🔄 Switch to Localhost
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: 'var(--color-bg-card)',
    borderRadius: '12px',
    marginBottom: '30px',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--color-border)',
  },
  disconnectedContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  walletIcon: {
    fontSize: '48px',
    marginBottom: '15px',
  },
  connectTitle: {
    margin: '0 0 10px 0',
    color: 'var(--color-text-primary)',
    fontSize: '22px',
    fontWeight: '700',
  },
  connectDescription: {
    color: 'var(--color-text-secondary)',
    fontSize: '15px',
    marginBottom: '25px',
    lineHeight: '1.6',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '14px 32px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.3)',
  },
  error: {
    color: '#ef4444',
    marginTop: '15px',
    padding: '12px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '8px',
    fontSize: '14px',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  connectedContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  connectedHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  connectedInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  },
  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#52c41a',
    animation: 'pulse 2s ease-in-out infinite',
  },
  statusText: {
    fontSize: '14px',
    color: '#52c41a',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  addressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  address: {
    backgroundColor: 'var(--color-bg-primary)',
    padding: '10px 16px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '15px',
    color: 'var(--color-primary)',
    fontWeight: '600',
    border: '2px solid var(--color-border)',
  },
  networkBadge: {
    backgroundColor: 'rgba(129, 140, 248, 0.1)',
    color: 'var(--color-primary)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    border: '1px solid var(--color-primary)',
  },
  copyButton: {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(102, 126, 234, 0.2)',
  },
  disconnectButton: {
    backgroundColor: '#ff6b6b',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 6px rgba(255, 107, 107, 0.3)',
  },
  wrongNetwork: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  wrongNetworkText: {
    color: '#fbbf24',
    margin: 0,
    fontWeight: '500',
    fontSize: '15px',
  },
  switchButton: {
    backgroundColor: '#ff9800',
    color: 'white',
    padding: '10px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 6px rgba(255, 152, 0, 0.3)',
  },
};

export default WalletConnect;
