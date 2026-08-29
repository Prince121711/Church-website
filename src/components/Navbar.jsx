import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [active, setActive] = useState('');
  const [hidden, setHidden] = useState(false);

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#sermons', label: t.nav.sermons },
    { href: '#events', label: t.nav.events },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#ministries', label: t.nav.ministries },
    { href: '#contact', label: t.nav.contact },
  ];

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 160);
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
  }, [lang]);

  return (
    <header className={hidden ? 'hide' : ''}>
      <nav>
        <a className="brand" href="#top">
          <img src="assets/logo.png" alt="Elshaddai Ministries logo" />
          <div className="brand-name">Elshaddai <span>Ministries</span></div>
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? 'active' : ''}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleLanguage}
            className="lang-btn"
            title="Switch Language / மொழியை மாற்ற"
            style={{
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid var(--gold)',
              color: 'var(--gold-soft)',
              padding: '6px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            🌐 {t.nav.langToggle}
          </button>
          <a href="#give" className="nav-cta">{t.nav.give}</a>
        </div>
      </nav>
    </header>
  );
}
