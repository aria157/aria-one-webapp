import { useEffect, useState } from 'react';
import { runtimeConfig } from './config/runtime';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [settingsSection, setSettingsSection] = useState('manage-wallets');
  const [wallets, setWallets] = useState([
    {
      id: 1,
      name: 'Artist Primary',
      address: '0x1A2B3C4D5E6F7890abcd1234567890ABCDEF1234',
      balance: '5,200 KEYX',
      recordings: 24,
      certificates: 12,
      isActive: true,
      isVerified: true,
      type: 'Smart Wallet',
      created: 'Dec 28, 2024',
    },
    {
      id: 2,
      name: 'Collection Vault',
      address: '0x9F8E7D6C5B4A3210fedcba9876543210FEDCBA98',
      balance: '1,800 KEYX',
      recordings: 8,
      certificates: 4,
      isActive: false,
      isVerified: true,
      type: 'Smart Wallet',
      created: 'Dec 15, 2024',
    },
    {
      id: 3,
      name: 'Collaboration Wallet',
      address: '0xA1B2C3D4E5F6071829304756AABB1122CCDD3344',
      balance: '320 KEYX',
      recordings: 3,
      certificates: 1,
      isActive: false,
      isVerified: false,
      type: 'External',
      created: 'Jan 5, 2025',
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [walletToRemove, setWalletToRemove] = useState(null);
  const [newWalletName, setNewWalletName] = useState('');
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [addWalletError, setAddWalletError] = useState('');

  function formatSectionName(section) {
    if (section === 'manage-wallets') return 'Manage Wallets';
    return section.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function handleSetActiveWallet(id) {
    setWallets(prev => prev.map(w => ({ ...w, isActive: w.id === id })));
  }

  function handleRemoveWallet(id) {
    setWallets(prev => prev.filter(w => w.id !== id));
    setWalletToRemove(null);
  }

  function handleAddWallet(e) {
    e.preventDefault();
    setAddWalletError('');
    const name = newWalletName.trim();
    const address = newWalletAddress.trim();
    if (!name) {
      setAddWalletError('Wallet name is required.');
      return;
    }
    if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
      setAddWalletError('Please enter a valid Ethereum address (0x followed by 40 hex characters).');
      return;
    }
    if (wallets.some(w => w.address.toLowerCase() === address.toLowerCase())) {
      setAddWalletError('This wallet address is already connected.');
      return;
    }
    const nextId = wallets.reduce((max, w) => Math.max(max, w.id), 0) + 1;
    const newWallet = {
      id: nextId,
      name,
      address,
      balance: '0 KEYX',
      recordings: 0,
      certificates: 0,
      isActive: false,
      isVerified: false,
      type: 'External',
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setWallets(prev => [...prev, newWallet]);
    setNewWalletName('');
    setNewWalletAddress('');
    setShowAddModal(false);
  }

  function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  function openExternalLink(url) {
    if (!url) {
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  async function handleAddTokenToWallet() {
    if (!runtimeConfig.contractAddress) {
      return;
    }

    if (!window.ethereum?.request) {
      openExternalLink(runtimeConfig.explorerAddressUrl);
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: runtimeConfig.contractAddress,
            symbol: runtimeConfig.network.tokenSymbol,
            decimals: runtimeConfig.network.tokenDecimals,
          },
        },
      });
    } catch (error) {
      console.error('Unable to add KEYX token to wallet:', error?.message || error);
    }
  }

  useEffect(() => {
    if (currentPage !== 'home') return;
    initRecordButton();
    initSmoothScroll();
    initNavbarScroll();
    initAnimations();
    initButtonHovers();
  }, [currentPage]);

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
            <button
              className="brand-btn"
              onClick={() => setCurrentPage('home')}
              aria-label="Go to home"
            >
              <div className="brand-icon">
                <svg viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 10 L20 30 M13 20 L27 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="brand-text">ARIA ONE</span>
            </button>
          </div>
          {currentPage === 'home' ? (
            <div className="nav-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#studio" className="nav-link">Studio</a>
              <a href="#wallet" className="nav-link">Wallet</a>
              <a href="#token" className="nav-link">Token</a>
            </div>
          ) : (
            <div className="nav-links">
              <button className="nav-link nav-link-btn" onClick={() => setCurrentPage('home')}>
                ← Back to Home
              </button>
              <span className="nav-breadcrumb">Settings / {formatSectionName(settingsSection)}</span>
            </div>
          )}
          <button
            className="nav-cta"
            onClick={() => {
              setCurrentPage('settings');
              setSettingsSection('manage-wallets');
            }}
          >
            {currentPage === 'settings' ? 'Settings' : 'Launch App'}
          </button>
        </div>
      </nav>

      {currentPage === 'settings' ? (
        <div className="settings-page">
          <aside className="settings-sidebar">
            <div className="settings-sidebar-header">
              <h2>Settings</h2>
            </div>
            <nav className="settings-nav">
              <button
                className={`settings-nav-item${settingsSection === 'profile' ? ' active' : ''}`}
                onClick={() => setSettingsSection('profile')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Profile
              </button>
              <button
                className={`settings-nav-item${settingsSection === 'manage-wallets' ? ' active' : ''}`}
                onClick={() => setSettingsSection('manage-wallets')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 13a1 1 0 100 2 1 1 0 000-2z" fill="currentColor"/>
                  <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Manage Wallets
              </button>
              <button
                className={`settings-nav-item${settingsSection === 'security' ? ' active' : ''}`}
                onClick={() => setSettingsSection('security')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 5v7c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V5l-8-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                Security
              </button>
              <button
                className={`settings-nav-item${settingsSection === 'notifications' ? ' active' : ''}`}
                onClick={() => setSettingsSection('notifications')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Notifications
              </button>
            </nav>
          </aside>

          <main className="settings-main">
            {settingsSection === 'manage-wallets' && (
              <div className="manage-wallets">
                <div className="manage-wallets-header">
                  <div>
                    <h1 className="manage-wallets-title">Manage Wallets</h1>
                    <p className="manage-wallets-subtitle">
                      Connect and manage all your artist wallets in one place.
                    </p>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => { setShowAddModal(true); setAddWalletError(''); }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Add Wallet
                  </button>
                </div>

                <div className="wallets-list">
                  {wallets.length === 0 && (
                    <div className="wallets-empty">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M16 13a1 1 0 100 2 1 1 0 000-2z" fill="currentColor"/>
                        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <p>No wallets connected yet.</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => { setShowAddModal(true); setAddWalletError(''); }}
                      >
                        Add Your First Wallet
                      </button>
                    </div>
                  )}
                  {wallets.map(wallet => (
                    <div key={wallet.id} className={`wallet-list-item${wallet.isActive ? ' wallet-list-item--active' : ''}`}>
                      <div className="wallet-list-item-icon">
                        <svg viewBox="0 0 24 24" fill="none">
                          <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M16 13a1 1 0 100 2 1 1 0 000-2z" fill="currentColor"/>
                          <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div className="wallet-list-item-info">
                        <div className="wallet-list-item-top">
                          <span className="wallet-list-item-name">{wallet.name}</span>
                          <div className="wallet-list-item-badges">
                            {wallet.isActive && (
                              <span className="wallet-badge-active">Active</span>
                            )}
                            {wallet.isVerified && (
                              <span className="wallet-badge-verified">Verified</span>
                            )}
                            <span className="wallet-badge-type">{wallet.type}</span>
                          </div>
                        </div>
                        <div className="wallet-list-item-address">
                          <span title={wallet.address}>{truncateAddress(wallet.address)}</span>
                        </div>
                        <div className="wallet-list-item-stats">
                          <span><strong>{wallet.recordings}</strong> Recordings</span>
                          <span><strong>{wallet.certificates}</strong> Certificates</span>
                          <span><strong>{wallet.balance}</strong></span>
                          <span className="wallet-list-item-date">Added {wallet.created}</span>
                        </div>
                      </div>
                      <div className="wallet-list-item-actions">
                        {!wallet.isActive && (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleSetActiveWallet(wallet.id)}
                          >
                            Set Active
                          </button>
                        )}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setWalletToRemove(wallet)}
                          aria-label={`Remove ${wallet.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {settingsSection === 'profile' && (
              <div className="settings-placeholder">
                <h1 className="manage-wallets-title">Profile</h1>
                <p className="manage-wallets-subtitle">Manage your artist profile and identity settings.</p>
              </div>
            )}

            {settingsSection === 'security' && (
              <div className="settings-placeholder">
                <h1 className="manage-wallets-title">Security</h1>
                <p className="manage-wallets-subtitle">Manage your security settings, recovery phrase, and two-factor authentication.</p>
              </div>
            )}

            {settingsSection === 'notifications' && (
              <div className="settings-placeholder">
                <h1 className="manage-wallets-title">Notifications</h1>
                <p className="manage-wallets-subtitle">Manage your notification preferences and alerts.</p>
              </div>
            )}
          </main>
        </div>
      ) : (
        <>
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

                <button
                  className="btn btn-primary"
                  onClick={() => { setCurrentPage('settings'); setSettingsSection('manage-wallets'); }}
                >
                  Create Your Wallet
                </button>
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

            <div className="token-config-panel">
              <div className="token-config-header">
                <div>
                  <span className="section-tag">Live Configuration</span>
                  <h3>Current KEYX integration target</h3>
                </div>
                <p>
                  The frontend now reads its network, explorer, and contract configuration from environment-driven runtime settings.
                </p>
              </div>

              <div className="token-config-grid">
                <div className="token-config-item">
                  <span>Environment</span>
                  <strong>{runtimeConfig.appEnv}</strong>
                </div>
                <div className="token-config-item">
                  <span>Network</span>
                  <strong>{runtimeConfig.network.name}</strong>
                </div>
                <div className="token-config-item">
                  <span>Chain ID</span>
                  <strong>{runtimeConfig.network.chainId}</strong>
                </div>
                <div className="token-config-item">
                  <span>RPC endpoint</span>
                  <strong>{runtimeConfig.rpcUrl}</strong>
                </div>
                <div className="token-config-item">
                  <span>API endpoint</span>
                  <strong>{runtimeConfig.apiBaseUrl || 'Not configured'}</strong>
                </div>
                <div className="token-config-item">
                  <span>Contract</span>
                  <strong>
                    {runtimeConfig.contractAddress ? truncateAddress(runtimeConfig.contractAddress) : 'Not configured'}
                  </strong>
                </div>
              </div>

              <div className="token-config-actions">
                <button className="btn btn-primary" onClick={handleAddTokenToWallet} disabled={!runtimeConfig.contractAddress}>
                  Add KEYX to Wallet
                </button>
                {runtimeConfig.explorerAddressUrl && (
                  <button className="btn btn-secondary" onClick={() => openExternalLink(runtimeConfig.explorerAddressUrl)}>
                    View Contract
                  </button>
                )}
                {runtimeConfig.swapUrl && (
                  <button className="btn btn-secondary" onClick={() => openExternalLink(runtimeConfig.swapUrl)}>
                    Open Swap
                  </button>
                )}
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
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowAddModal(false); }}>
          <div className="modal">
            <div className="modal-header">
              <h2>Add Wallet</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <form className="modal-form" onSubmit={handleAddWallet}>
              <div className="form-group">
                <label htmlFor="walletName">Wallet Name</label>
                <input
                  id="walletName"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Artist Primary"
                  value={newWalletName}
                  onChange={e => setNewWalletName(e.target.value)}
                  maxLength={40}
                />
              </div>
              <div className="form-group">
                <label htmlFor="walletAddress">Wallet Address</label>
                <input
                  id="walletAddress"
                  type="text"
                  className="form-input"
                  placeholder="0x..."
                  value={newWalletAddress}
                  onChange={e => setNewWalletAddress(e.target.value)}
                />
              </div>
              {addWalletError && (
                <p className="form-error">{addWalletError}</p>
              )}
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Connect Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {walletToRemove !== null && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setWalletToRemove(null); }}>
          <div className="modal modal--sm">
            <div className="modal-header">
              <h2>Remove Wallet</h2>
              <button className="modal-close" onClick={() => setWalletToRemove(null)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <p className="modal-body-text">
              Are you sure you want to remove <strong>{walletToRemove.name}</strong> from your connected wallets? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setWalletToRemove(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => handleRemoveWallet(walletToRemove.id)}>
                Remove Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
