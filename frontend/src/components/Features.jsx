const Features = () => {
  return (
    <section className="section" style={styles.section}>
      <div className="container">
        <div className="text-center fade-in-up">
          <h2 style={styles.title}>Powerful Features</h2>
          <p style={styles.subtitle}>
            Everything you need for secure, verifiable student record management
          </p>
        </div>

        <div className="grid grid-2" style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`fade-in-up delay-${(index + 1) * 100}`}
              style={styles.featureCard}
            >
              <div style={styles.featureIcon}>{feature.icon}</div>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
                <ul style={styles.featureList}>
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} style={styles.featureListItem}>
                      <span style={styles.checkmark}>✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: '📁',
    title: 'Cryptographic File Hash Storage',
    description: 'Verify document authenticity without storing the actual files on-chain.',
    highlights: [
      'SHA-256 hash generation for uploaded files',
      'Verify file integrity at any time',
      'Low gas costs - only hash stored on-chain',
      'Complete document authenticity verification',
    ],
  },
  {
    icon: '⚡',
    title: 'Easy Local Setup with Ganache',
    description: 'Get started instantly with a local blockchain environment - no test ETH required!',
    highlights: [
      'One-command setup with npm run setup',
      'Instant, free transactions for testing',
      'Perfect for demos and development',
      'MetaMask integration included',
    ],
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
  featuresGrid: {
    gap: '40px',
  },
  featureCard: {
    display: 'flex',
    gap: '24px',
    padding: '40px',
    backgroundColor: 'var(--color-bg-card)',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-border)',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    fontSize: '64px',
    flexShrink: 0,
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--gradient-primary)',
    borderRadius: 'var(--radius-md)',
    padding: '8px',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '12px',
    color: 'var(--color-text-primary)',
  },
  featureDescription: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'var(--color-text-secondary)',
    marginBottom: '20px',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  featureListItem: {
    fontSize: '15px',
    lineHeight: '2',
    color: 'var(--color-text-secondary)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  checkmark: {
    color: 'var(--color-primary)',
    fontWeight: '700',
    fontSize: '18px',
    flexShrink: 0,
  },
};

export default Features;
