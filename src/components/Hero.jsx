import Hero3D from './Hero3D';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero" id="top">
      <Hero3D />
      <div className="hero-inner">
        <span className="eyebrow hero-eyebrow" style={{ justifyContent: 'center' }}>
          {t.hero.eyebrow}
        </span>
        <h1>{t.hero.heading}</h1>
        <p className="lede">
          {t.hero.subheading}
        </p>
        <div className="hero-ctas">
          <a href="#services" className="btn btn-primary">{t.hero.ctaPrimary}</a>
          <a href="#sermons" className="btn btn-ghost">{t.hero.ctaSecondary}</a>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true" />
    </section>
  );
}
