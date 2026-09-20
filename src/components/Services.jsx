import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/useLanguage';

export default function Services() {
  const ref = useReveal();
  const { t } = useLanguage();
  return (
    <section className="services" id="services" ref={ref}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>{t.services.eyebrow}</span>
          <h2>{t.services.heading}</h2>
          <p>{t.services.subheading}</p>
        </div>
        <div className="service-grid">
          {t.services.items.map((s, i) => (
            <div className={`service-card reveal d${i + 1}`} key={s.title}>
              <div className="day">{s.day}</div>
              <h3>{s.title}</h3>
              <span className="time">{s.time}</span>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
