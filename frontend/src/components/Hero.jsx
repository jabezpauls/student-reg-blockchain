import Prism from './Prism';

const Hero = ({ onGetStarted, onLearnMore }) => {
  return (
    <section style={styles.hero}>
      <div style={styles.prismBackground}>
        <Prism
          height={3.5}
          baseWidth={5.5}
          animationType="3drotate"
          glow={1.2}
          noise={0.3}
          transparent={true}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          bloom={1.2}
          timeScale={0.3}
          suspendWhenOffscreen={false}
        />
      </div>
      <div className="container" style={styles.contentWrapper}>
        <div className="fade-in-up" style={styles.content}>
          <h1 style={styles.title} className="text-gradient">
            Decentralized Student Records on Blockchain
          </h1>
          <p style={styles.subtitle} className="fade-in-up delay-200">
            Store student information securely and transparently on the Ethereum blockchain.
            Immutable, verifiable, and tamper-proof record keeping with cryptographic file verification.
          </p>
          <div style={styles.ctaContainer} className="fade-in-up delay-300">
            <button
              onClick={onGetStarted}
              className="btn btn-primary btn-lg"
              style={styles.primaryCta}
            >
              Get Started
            </button>
            <button
              onClick={onLearnMore}
              className="btn btn-secondary btn-lg"
              style={styles.secondaryCta}
            >
              Learn More
            </button>
          </div>
          <p style={styles.note} className="fade-in-up delay-400">
            Perfect for demos and testing with local blockchain (Ganache)
          </p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '120px 20px',
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  prismBackground: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    opacity: 0.4,
    pointerEvents: 'none',
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    fontSize: 'clamp(36px, 6vw, 72px)',
    fontWeight: '800',
    lineHeight: '1.1',
    marginBottom: '24px',
    background: 'white',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 'clamp(18px, 2.5vw, 22px)',
    lineHeight: '1.7',
    marginBottom: '40px',
    color: 'rgba(255, 255, 255, 0.95)',
    maxWidth: '700px',
    margin: '0 auto 40px',
  },
  ctaContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '24px',
  },
  primaryCta: {
    minWidth: '200px',
  },
  secondaryCta: {
    minWidth: '200px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  note: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
  },
};

export default Hero;
