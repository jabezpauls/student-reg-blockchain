const HowItWorks = () => {
  return (
    <section className="section" style={styles.section}>
      <div className="container">
        <div className="text-center fade-in-up">
          <h2 style={styles.title}>How It Works</h2>
          <p style={styles.subtitle}>
            Three simple steps to start managing student records on the blockchain
          </p>
        </div>

        <div style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`fade-in-up delay-${(index + 1) * 100}`}
              style={styles.stepWrapper}
            >
              <div style={styles.step}>
                <div style={styles.stepNumber}>{step.number}</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepIcon}>{step.icon}</div>
                  <h3 style={styles.stepTitle}>{step.title}</h3>
                  <p style={styles.stepDescription}>{step.description}</p>
                  <div style={styles.stepDetails}>
                    {step.details.map((detail, idx) => (
                      <div key={idx} style={styles.detail}>
                        <span style={styles.detailIcon}>→</span>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div style={styles.connector}>
                  <div style={styles.arrow}>↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    number: '1',
    icon: '🔗',
    title: 'Connect Your Wallet',
    description: 'Connect MetaMask to the local Ganache blockchain.',
    details: [
      'Install MetaMask browser extension',
      'Add localhost network (Chain ID: 1337)',
      'Import a test account from Ganache',
      'Start with 100 free test ETH',
    ],
  },
  {
    number: '2',
    icon: '📝',
    title: 'Register Students',
    description: 'Fill out the form and store student information on-chain.',
    details: [
      'Enter student name, registration number, college, and department',
      'Optionally upload documents (hash will be calculated)',
      'Sign the transaction in MetaMask',
      'Instant confirmation on local blockchain',
    ],
  },
  {
    number: '3',
    icon: '✅',
    title: 'Verify & View Records',
    description: 'Access and verify all student records anytime.',
    details: [
      'View complete list of all registered students',
      'See registration timestamps and submitter addresses',
      'Verify file authenticity using stored hashes',
      'All data is immutable and permanently stored',
    ],
  },
];

const styles = {
  section: {
    backgroundColor: 'var(--color-bg-primary)',
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
  stepsContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  stepWrapper: {
    position: 'relative',
  },
  step: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
    padding: '32px',
    backgroundColor: 'var(--color-bg-card)',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-border)',
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  stepNumber: {
    fontSize: '32px',
    fontWeight: '800',
    color: 'white',
    background: 'var(--gradient-primary)',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
  },
  stepIcon: {
    fontSize: '36px',
    marginBottom: '12px',
  },
  stepTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '12px',
    color: 'var(--color-text-primary)',
  },
  stepDescription: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'var(--color-text-secondary)',
    marginBottom: '20px',
  },
  stepDetails: {
    display: 'grid',
    gap: '8px',
  },
  detail: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  detailIcon: {
    color: 'var(--color-primary)',
    fontWeight: '700',
    fontSize: '16px',
  },
  connector: {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px 0',
  },
  arrow: {
    fontSize: '32px',
    color: 'var(--color-primary)',
    animation: 'pulse 2s ease-in-out infinite',
  },
};

export default HowItWorks;
