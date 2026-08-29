import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="assets/logo.png" alt="Elshaddai Ministries logo" />
            <div>
              <div className="brand-name">Elshaddai <span style={{ color: 'var(--sacred-red)' }}>Ministries</span></div>
              <p>{t.footer.sub}</p>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h5>{t.footer.visit}</h5>
              <a href="#services">{t.nav.services}</a>
              <a href="#events">{t.nav.events}</a>
              <a href="#contact">{t.nav.contact}</a>
            </div>
            <div>
              <h5>{t.footer.connect}</h5>
              <a href="#sermons">{t.nav.sermons}</a>
              <a href="https://www.youtube.com/@pastorsureshsimeon8634" target="_blank" rel="noopener noreferrer">YouTube Channel</a>
              <a href="https://www.instagram.com/elsh.addaiministry?igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/share/1FEPsLar1o/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="#give">{t.nav.give}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t.footer.rights}</span>
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
