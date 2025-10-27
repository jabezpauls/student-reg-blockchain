import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import BlockchainExplainer from './BlockchainExplainer';
import Features from './Features';
import HowItWorks from './HowItWorks';
import TechStack from './TechStack';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLearnMore = () => {
    const learnMoreSection = document.getElementById('learn-more');
    if (learnMoreSection) {
      learnMoreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={styles.landingPage}>
      <Hero onGetStarted={handleGetStarted} onLearnMore={handleLearnMore} />
      <BlockchainExplainer />
      <Features />
      <HowItWorks />
      <TechStack />

      <footer style={styles.footer}>
        <div className="container" style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Student Registry</h3>
            <p style={styles.footerText}>
              Decentralized student record management on blockchain
            </p>
          </div>

          <div style={styles.footerSection}>
            <h4 style={styles.footerHeading}>Quick Links</h4>
            <ul style={styles.footerLinks}>
              <li><a href="#learn-more" style={styles.footerLink}>Learn More</a></li>
              <li><a href="https://github.com/jabezpauls/student-reg-blockchain" style={styles.footerLink} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://docs.soliditylang.org/" style={styles.footerLink} target="_blank" rel="noopener noreferrer">Solidity Docs</a></li>
              <li><a href="https://hardhat.org/docs" style={styles.footerLink} target="_blank" rel="noopener noreferrer">Hardhat Docs</a></li>
            </ul>
          </div>

          <div style={styles.footerSection}>
            <h4 style={styles.footerHeading}>Technologies</h4>
            <ul style={styles.footerLinks}>
              <li><a href="https://react.dev/" style={styles.footerLink} target="_blank" rel="noopener noreferrer">React</a></li>
              <li><a href="https://docs.ethers.org/" style={styles.footerLink} target="_blank" rel="noopener noreferrer">ethers.js</a></li>
              <li><a href="https://metamask.io/" style={styles.footerLink} target="_blank" rel="noopener noreferrer">MetaMask</a></li>
              <li><a href="https://trufflesuite.com/ganache/" style={styles.footerLink} target="_blank" rel="noopener noreferrer">Ganache</a></li>
            </ul>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={styles.copyright}>
            Built with React, Solidity, Hardhat & Ganache | MIT License
          </p>
          <button
            onClick={handleGetStarted}
            className="btn btn-primary"
            style={styles.getStartedBtn}
          >
            Get Started Now
          </button>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  landingPage: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-secondary)',
  },
  footer: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: 'white',
    padding: '60px 20px 30px',
    marginTop: '80px',
    borderTop: '1px solid var(--color-border)',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  },
  footerSection: {
    textAlign: 'left',
  },
  footerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  footerText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footerHeading: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
    color: 'white',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerLink: {
    display: 'inline-block',
    padding: '4px 0',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  footerBottom: {
    paddingTop: '30px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  copyright: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
  },
  getStartedBtn: {
    minWidth: '180px',
  },
};

export default LandingPage;
