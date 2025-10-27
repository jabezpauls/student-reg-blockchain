const TechStack = () => {
  return (
    <section className="section" style={styles.section}>
      <div className="container">
        <div className="text-center fade-in-up">
          <h2 style={styles.title}>Built With Modern Technologies</h2>
          <p style={styles.subtitle}>
            Leveraging industry-leading tools for blockchain development
          </p>
        </div>

        <div className="grid grid-3 fade-in-up delay-200">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="card"
              style={styles.techCard}
            >
              <div style={styles.techIcon}>{tech.icon}</div>
              <h3 style={styles.techName}>{tech.name}</h3>
              <p style={styles.techDescription}>{tech.description}</p>
            </div>
          ))}
        </div>

        <div className="fade-in-up delay-400" style={styles.opensource}>
          <div style={styles.opensourceContent}>
            <h3 style={styles.opensourceTitle}>Open Source & Free</h3>
            <p style={styles.opensourceText}>
              This project is MIT licensed and completely free to use, modify, and distribute.
              Perfect for learning blockchain development or building your own DApp.
            </p>
            <div style={styles.badges}>
              <span style={styles.badge}>MIT License</span>
              <span style={styles.badge}>100% Free</span>
              <span style={styles.badge}>Open Source</span>
            </div>
            <a
              href="https://github.com/jabezpauls/student-reg-blockchain"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={styles.githubButton}
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const technologies = [
  {
    icon: '⚛️',
    name: 'React 19',
    description: 'Modern frontend framework for building interactive user interfaces',
  },
  {
    icon: '📜',
    name: 'Solidity',
    description: 'Smart contract programming language for Ethereum blockchain',
  },
  {
    icon: '🔨',
    name: 'Hardhat',
    description: 'Professional Ethereum development environment for compiling and deploying',
  },
  {
    icon: '🦊',
    name: 'MetaMask',
    description: 'Secure wallet integration for blockchain transactions',
  },
  {
    icon: '🌐',
    name: 'ethers.js v6',
    description: 'Complete Ethereum library for interacting with smart contracts',
  },
  {
    icon: '🔧',
    name: 'Ganache',
    description: 'Local blockchain for fast development and testing',
  },
];

const styles = {
  section: {
    backgroundColor: 'var(--color-bg-secondary)',
  },
  title: {
    fontSize: 'clamp(32px, 4vw, 48px)',
    fontWeight: '700',
    marginBottom: '16px',
    color: 'var(--color-text-primary)',
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: '1.7',
    color: 'var(--color-text-secondary)',
    maxWidth: '600px',
    margin: '0 auto 60px',
  },
  techCard: {
    textAlign: 'center',
    padding: '32px 24px',
  },
  techIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  techName: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '12px',
    color: 'var(--color-text-primary)',
  },
  techDescription: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'var(--color-text-secondary)',
  },
  opensource: {
    marginTop: '60px',
    textAlign: 'center',
  },
  opensourceContent: {
    backgroundColor: 'var(--color-bg-card)',
    padding: '48px',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-primary)',
    maxWidth: '700px',
    margin: '0 auto',
  },
  opensourceTitle: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '16px',
    color: 'var(--color-primary)',
  },
  opensourceText: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: 'var(--color-text-secondary)',
    marginBottom: '24px',
  },
  badges: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  badge: {
    padding: '8px 20px',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },
  githubButton: {
    marginTop: '24px',
    display: 'inline-block',
  },
};

export default TechStack;
