const BlockchainExplainer = () => {
  return (
    <section id="learn-more" className="section" style={styles.section}>
      <div className="container-sm">
        <div className="text-center fade-in-up">
          <h2 style={styles.title}>Why Blockchain for Student Records?</h2>
          <p style={styles.subtitle}>
            Traditional student record systems are centralized, vulnerable to tampering, and difficult to verify.
            Blockchain technology solves these challenges.
          </p>
        </div>

        <div className="grid grid-2" style={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`card fade-in-up delay-${(index + 1) * 100}`}
              style={styles.benefitCard}
            >
              <div style={styles.icon}>{benefit.icon}</div>
              <h3 style={styles.benefitTitle}>{benefit.title}</h3>
              <p style={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center fade-in-up delay-400" style={styles.explanation}>
          <div style={styles.explainerBox}>
            <h3 style={styles.explainerTitle}>What is Blockchain?</h3>
            <p style={styles.explainerText}>
              Blockchain is a distributed ledger technology that records transactions across multiple computers.
              Once data is recorded, it cannot be altered retroactively without changing all subsequent blocks,
              making it highly secure and tamper-proof.
            </p>
            <p style={styles.explainerText}>
              In this application, each student record is stored as a transaction on the blockchain,
              creating an immutable and verifiable history of all registrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const benefits = [
  {
    icon: '🔒',
    title: 'Immutable Records',
    description: 'Once registered, student information cannot be altered or deleted, ensuring data integrity and preventing fraud.',
  },
  {
    icon: '✨',
    title: 'Transparent & Verifiable',
    description: 'Anyone with access can verify the authenticity of student records through the blockchain explorer.',
  },
  {
    icon: '🔐',
    title: 'Cryptographic Security',
    description: 'File hashes are stored on-chain, allowing verification of document authenticity without exposing the actual files.',
  },
  {
    icon: '⚡',
    title: 'Decentralized',
    description: 'No single point of failure. Records exist across multiple nodes, making the system resilient and reliable.',
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
  benefitsGrid: {
    marginBottom: '60px',
  },
  benefitCard: {
    textAlign: 'center',
  },
  icon: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  benefitTitle: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '12px',
    color: 'var(--color-text-primary)',
  },
  benefitDescription: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'var(--color-text-secondary)',
  },
  explanation: {
    marginTop: '40px',
  },
  explainerBox: {
    backgroundColor: 'var(--color-bg-card)',
    padding: '40px',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-border)',
  },
  explainerTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    color: 'var(--color-primary)',
  },
  explainerText: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: 'var(--color-text-secondary)',
    marginBottom: '16px',
    textAlign: 'left',
  },
};

export default BlockchainExplainer;
