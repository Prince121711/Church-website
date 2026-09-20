import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/useLanguage';
import { EVENTS_DATA } from '../data/eventsData';

export default function Events() {
  const ref = useReveal();
  const { t, lang } = useLanguage();

  return (
    <section className="events" id="events" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">{t.events.eyebrow}</span>
          <h2>{t.events.heading}</h2>
        </div>
        <div className="event-list">
          {EVENTS_DATA.map((e, i) => {
            const title = e.title[lang] || e.title.en;
            const desc = e.desc[lang] || e.desc.en;
            const time = e.time[lang] || e.time.en;
            const tag = e.tag[lang] || e.tag.en;

            return (
              <div className={`event-row reveal d${i + 1}`} key={e.id}>
                <div className="event-date">
                  <span className="d">{e.dateNum}</span>
                  <span className="m">{e.day}</span>
                </div>
                <div className="event-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span className="tag" style={{ fontSize: '10.5px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                      {tag}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--muted-2)' }}>• ⏰ {time}</span>
                  </div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
                <a href="#contact" className="btn btn-ghost">{t.events.learnMore}</a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
