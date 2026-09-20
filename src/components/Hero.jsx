import { lazy, Suspense } from 'react';
import { useLanguage } from '../context/useLanguage';

const Hero3D = lazy(() => import('./Hero3D'));

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero" id="top">
      <Suspense fallback={<div className="hero-canvas" aria-hidden="true" />}>
        <Hero3D />
      </Suspense>
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
        <div className="hero-strip">
          <div>
            <span className="num">15+</span>
            <span className="lbl">{t.hero.statsYears || 'Years of Ministry'}</span>
          </div>
          <div>
            <span className="num">500+</span>
            <span className="lbl">{t.hero.statsBelievers || 'Believers & Families'}</span>
          </div>
          <div>
            <span className="num">3</span>
            <span className="lbl">{t.hero.statsServices || 'Weekly Gatherings'}</span>
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true" />
    </section>
  );
}
