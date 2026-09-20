import { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/useTheme';

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState('');
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = useMemo(() => [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#sermons', label: t.nav.sermons },
    { href: '#events', label: t.nav.events },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#ministries', label: t.nav.ministries },
    { href: '#contact', label: t.nav.contact },
  ], [t]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 160 && !menuOpen);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, [lang, menuOpen, links]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
    <header className={hidden ? 'hide' : ''}>
      <nav aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <img src="assets/logo.png" alt="Elshaddai Ministries logo" width="56" height="56" />
          <div className="brand-name">Elshaddai <span>Ministries</span></div>
        </a>
        <div className="nav-links" role="navigation">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? 'active' : ''}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={toggleLanguage}
            className="lang-btn"
            title="Switch Language / மொழியை மாற்ற"
            aria-label="Switch Language / மொழியை மாற்ற"
          >
            🌐 {t.nav.langToggle}
          </button>
          <a href="#give" className="nav-cta">{t.nav.give}</a>
          <button
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>
      </nav>
    </header>

    {/* Mobile Drawer Overlay — outside header to avoid backdrop-filter containment */}
    <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
      <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)} />
      <div className="mobile-drawer-content" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="mobile-drawer-header">
          <a className="brand" href="#top" onClick={handleLinkClick}>
            <img src="assets/logo.png" alt="Elshaddai Ministries logo" width="56" height="56" />
            <div className="brand-name">Elshaddai <span>Ministries</span></div>
          </a>
          <button className="mobile-close-btn" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">✕</button>
        </div>
        <div className="mobile-nav-links" role="navigation" aria-label="Mobile links">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? 'active' : ''}
              onClick={handleLinkClick}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="mobile-drawer-footer">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn mobile-theme-btn"
            style={{ width: 'auto', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button
            onClick={() => {
              toggleLanguage();
            }}
            className="lang-btn mobile-lang-btn"
          >
            🌐 {t.nav.langToggle}
          </button>
          <a href="#give" className="btn btn-primary mobile-give-btn" onClick={handleLinkClick}>
            {t.nav.give}
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
