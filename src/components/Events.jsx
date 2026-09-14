import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Events() {
  const ref = useReveal();
  const { t } = useLanguage();
  return (
    <section className="events" id="events" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">{t.events.eyebrow}</span>
          <h2>{t.events.heading}</h2>
        </div>
        <div className="event-list">
          {t.events.items.map((e, i) => (
            <div className={`event-row reveal d${i + 1}`} key={`${e.d}-${e.m}-${e.title}-${i}`}>
              <div className="event-date"><span className="d">{e.d}</span><span className="m">{e.m}</span></div>
              <div className="event-info"><h4>{e.title}</h4><p>{e.desc}</p></div>
              <a href="#contact" className="btn btn-ghost">{t.events.learnMore}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
