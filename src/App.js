import { useEffect } from 'react';

function App() {
  useEffect(() => {
    initRecordButton();
    initSmoothScroll();
    initNavbarScroll();
    initAnimations();
    initButtonHovers();
  }, []);

  function initRecordButton() {
    const recordButton = document.getElementById('recordButton');
    const durationDisplay = document.getElementById('duration');

    if (!recordButton || !durationDisplay) return;

    let isRecording = false;
    let seconds = 0;
    let interval = null;

    recordButton.addEventListener('click', () => {
      isRecording = !isRecording;

      if (isRecording) {
        recordButton.querySelector('span').textContent = 'Stop Recording';
        recordButton.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

        interval = setInterval(() => {
          seconds++;
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          durationDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }, 1000);

        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
          statusDot.style.background = '#ef4444';
        }

        const statusValue = document.querySelector('.info-value');
        if (statusValue) {
          statusValue.childNodes[2].textContent = ' Recording';
        }
      } else {
        recordButton.querySelector('span').textContent = 'Start Recording';
        recordButton.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))';

        clearInterval(interval);

        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
          statusDot.style.background = 'var(--color-success)';
        }

        const statusValue = document.querySelector('.info-value');
        if (statusValue) {
          statusValue.childNodes[2].textContent = ' Ready';
        }

        seconds = 0;
        durationDisplay.textContent = '00:00';
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
      } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
      }
    });
  }

  function initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .token-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });

    animateWaveform();
  }

  function animateWaveform() {
    const waveBars = document.querySelectorAll('.wave-bar');
    if (waveBars.length === 0) return;

    waveBars.forEach((bar, index) => {
      setInterval(() => {
        const randomHeight = Math.random() * 70 + 30;
        bar.style.height = `${randomHeight}%`;
      }, 1000 + (index * 50));
    });
  }

  function initButtonHovers() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
      });

      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  return (
    <>
      <div className="grain-overlay"></div>

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 10 L20 30 M13 20 L27 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="brand-text">ARIA ONE</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#studio" className="nav-link">Studio</a>
            <a href="#wallet" className="nav-link">Wallet</a>
            <a href="#token" className="nav-link">Token</a>
          </div>
          <button className="nav-cta">Launch App</button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-background">
            <div className="hero-circle circle-1"></div>
            <div className="hero-circle circle-2"></div>
            <div className="hero-circle circle-3"></div>
          </div>

          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                <span>Vocal Artist Identity System</span>
              </div>
              <h1 className="hero-title">
                Your Voice.<br/>
                <span className="gradient-text">Your Identity.</span><br/>
                Your Future.
              </h1>
              <p className="hero-description">
                ARIA ONE empowers singers and vocal artists to verify, protect, and monetize
                their unique voice through blockchain technology and AI-powered identity verification.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary">
                  <span>Get Started</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="btn btn-secondary">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 7L13 10L8 13V7Z" fill="currentColor"/>
                  </svg>
                  <span>Watch Demo</span>
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-value">10K+</div>
                  <div className="stat-label">Verified Artists</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-value">50K+</div>
                  <div className="stat-label">Vocal Signatures</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Secure</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Features</span>
              <h2 className="section-title">Everything You Need to<br/>Protect Your Voice</h2>
              <p className="section-description">
                Professional tools designed specifically for vocal artists in the digital age
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C12 2 8 6 8 12C8 16 10 18 12 18C14 18 16 16 16 12C16 6 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Voice Verification</h3>
                <p>AI-powered voice analysis creates your unique vocal fingerprint that proves authenticity and prevents unauthorized use.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 8V6C7 3.79 8.79 2 11 2H13C15.21 2 17 3.79 17 6V8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3>Secure Wallet</h3>
                <p>Store vocal recordings, certificates, and ownership rights in your encrypted blockchain-based artist wallet.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Real-Time Recording</h3>
                <p>Professional-grade recording studio with instant verification stamps for every vocal session you create.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Smart Licensing</h3>
                <p>Create and manage licensing agreements with automated royalty distribution through smart contracts.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Authenticity Proof</h3>
                <p>Every recording gets an immutable certificate of authenticity stored permanently on the blockchain.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 5V3M12 21V19M19 12H21M3 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16.5 7.5L18 6M6 18L7.5 16.5M16.5 16.5L18 18M6 6L7.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>KEYX Token Utility</h3>
                <p>Access premium features, earn rewards, and participate in the ARIA ONE ecosystem with KEYX tokens.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="studio" className="studio">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">Vocal Studio</span>
              <h2 className="section-title">Professional Recording<br/>Environment</h2>
            </div>

            <div className="studio-interface">
              <div className="studio-visualizer">
                <div className="waveform">
                  {[40, 70, 55, 85, 45, 90, 60, 75, 50, 80, 65, 55, 70, 45, 85, 60, 75, 50, 65, 80].map((height, i) => (
                    <div key={i} className="wave-bar" style={{height: `${height}%`}}></div>
                  ))}
                </div>
              </div>

              <div className="studio-controls">
                <button className="record-button" id="recordButton">
                  <div className="record-icon">
                    <div className="record-dot"></div>
                  </div>
                  <span>Start Recording</span>
                </button>

                <div className="studio-info">
                  <div className="info-row">
                    <span className="info-label">Status</span>
                    <span className="info-value">
                      <span className="status-dot"></span>
                      Ready
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Duration</span>
                    <span className="info-value" id="duration">00:00</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Quality</span>
                    <span className="info-value">High (48kHz)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="wallet" className="wallet">
          <div className="container">
            <div className="wallet-layout">
              <div className="wallet-content">
                <span className="section-tag">Artist Wallet</span>
                <h2 className="section-title">Your Digital Voice<br/>Vault</h2>
                <p className="wallet-description">
                  Securely store all your vocal recordings, certificates, and identity
                  documents in one encrypted, blockchain-backed wallet. Access anywhere,
                  share selectively, own forever.
                </p>

                <div className="wallet-features">
                  <div className="wallet-feature">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>End-to-end encryption</span>
                  </div>
                  <div className="wallet-feature">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Blockchain verified</span>
                  </div>
                  <div className="wallet-feature">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Instant access anywhere</span>
                  </div>
                </div>

                <button className="btn btn-primary">Create Your Wallet</button>
              </div>

              <div className="wallet-preview">
                <div className="wallet-card">
                  <div className="wallet-card-header">
                    <span>Artist Wallet</span>
                    <div className="wallet-badge">Verified</div>
                  </div>
                  <div className="wallet-stats">
                    <div className="wallet-stat">
                      <div className="wallet-stat-value">24</div>
                      <div className="wallet-stat-label">Recordings</div>
                    </div>
                    <div className="wallet-stat">
                      <div className="wallet-stat-value">12</div>
                      <div className="wallet-stat-label">Certificates</div>
                    </div>
                    <div className="wallet-stat">
                      <div className="wallet-stat-value">5.2K</div>
                      <div className="wallet-stat-label">KEYX</div>
                    </div>
                  </div>
                  <div className="wallet-recordings">
                    <div className="recording-item">
                      <div className="recording-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="3" fill="currentColor"/>
                          <path d="M12 5V3M12 21V19M19 12H21M3 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="recording-info">
                        <div className="recording-name">Summer Melody</div>
                        <div className="recording-date">Dec 28, 2024</div>
                      </div>
                      <div className="recording-verified">
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div className="recording-item">
                      <div className="recording-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="3" fill="currentColor"/>
                          <path d="M12 5V3M12 21V19M19 12H21M3 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="recording-info">
                        <div className="recording-name">Acoustic Session</div>
                        <div className="recording-date">Dec 25, 2024</div>
                      </div>
                      <div className="recording-verified">
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="token" className="token">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">KEYX Token</span>
              <h2 className="section-title">Powering the ARIA ONE<br/>Ecosystem</h2>
              <p className="section-description">
                KEYX is the utility token that unlocks premium features, rewards participation,<br/>
                and enables governance in the ARIA ONE platform
              </p>
            </div>

            <div className="token-grid">
              <div className="token-card">
                <div className="token-card-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L22 8L12 14L2 8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 16L12 22L22 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M2 12L12 18L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Unlock Features</h3>
                <p>Use KEYX to access premium recording tools, advanced analytics, and exclusive community features.</p>
              </div>

              <div className="token-card">
                <div className="token-card-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Earn Rewards</h3>
                <p>Get rewarded with KEYX for creating verified recordings, participating in the community, and helping others.</p>
              </div>

              <div className="token-card">
                <div className="token-card-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Participate</h3>
                <p>Vote on platform decisions, propose new features, and shape the future of vocal artist identity.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Protect Your Voice?</h2>
              <p className="cta-description">
                Join thousands of artists who trust ARIA ONE to verify, protect, and monetize their unique vocal identity.
              </p>
              <div className="cta-actions">
                <button className="btn btn-primary btn-large">
                  <span>Get Started Now</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="btn btn-secondary btn-large">
                  <span>Talk to Sales</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-icon">
                <svg viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 10 L20 30 M13 20 L27 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="brand-text">ARIA ONE</span>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#studio">Studio</a>
                <a href="#wallet">Wallet</a>
                <a href="#token">Token</a>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <a href="#">Documentation</a>
                <a href="#">API Reference</a>
                <a href="#">Guides</a>
                <a href="#">Support</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Security</a>
                <a href="#">License</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ARIA ONE. All rights reserved.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="social-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
