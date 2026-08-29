import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Give() {
  const ref = useReveal();
  const { t } = useLanguage();
  return (
    <section className="give" id="give" ref={ref}>
      <div className="wrap reveal">
        <span className="eyebrow" style={{ justifyContent: 'center' }}>{t.give.eyebrow}</span>
        <h2>{t.give.heading}</h2>
        <p>{t.give.subheading}</p>
        <a href="#contact" className="btn btn-primary">{t.give.giveNow}</a>
        <div className="give-methods">
          <div className="give-method" style={{ opacity: 0.85 }}>
            <span className="lbl">{t.give.bankTransfer}</span>
            <span className="val" style={{ color: 'var(--muted-2)', fontSize: '14px' }}>{t.give.unavailable}</span>
            <span style={{ display: 'block', fontSize: '12px', color: 'var(--gold-soft)', marginTop: '4px' }}>{t.give.comingSoon}</span>
          </div>
          <div className="give-method" style={{ opacity: 0.85 }}>
            <span className="lbl">{t.give.upi}</span>
            <span className="val" style={{ color: 'var(--muted-2)', fontSize: '14px' }}>{t.give.unavailable}</span>
            <span style={{ display: 'block', fontSize: '12px', color: 'var(--gold-soft)', marginTop: '4px' }}>{t.give.comingSoon}</span>
          </div>
          <div className="give-method">
            <span className="lbl">{t.give.inPerson}</span>
            <span className="val">{t.give.offeringBox}</span>
            <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{t.give.availableService}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
