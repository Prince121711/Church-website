import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Ministries() {
  const ref = useReveal();
  const { t } = useLanguage();
  return (
    <section className="ministries" id="ministries" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">{t.ministries.eyebrow}</span>
          <h2>{t.ministries.heading}</h2>
          <p>{t.ministries.subheading}</p>
        </div>
        <div className="min-grid">
          {t.ministries.items.map((m, i) => (
            <div className={`min-card reveal d${(i % 4) + 1}`} key={m.title}>
              <div className="ico" />
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
