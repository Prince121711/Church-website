import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/LanguageContext';

const SERMONS = [
  {
    id: 'GDqTxKjahS0',
    url: 'https://youtu.be/GDqTxKjahS0',
    tag: 'Elshaddai Ministries · Sermon',
    title: 'உன் துக்க நாட்கள் முடிந்து போகும்',
    desc: 'Pastor Suresh Simeon message on God turning sorrow into joy and ending seasons of grief.',
    thumb: 'https://img.youtube.com/vi/GDqTxKjahS0/hqdefault.jpg',
  },
  {
    id: 'Yq70MbD_GVQ',
    url: 'https://youtu.be/Yq70MbD_GVQ',
    tag: 'Elshaddai Ministries · Sermon',
    title: 'கவலைபடு',
    desc: 'An inspiring sermon on trusting God with your worries and experiencing divine peace.',
    thumb: 'https://img.youtube.com/vi/Yq70MbD_GVQ/hqdefault.jpg',
  },
  {
    id: 'IaCFM8eHvt4',
    url: 'https://youtu.be/IaCFM8eHvt4',
    tag: 'Elshaddai Ministries · Sermon',
    title: 'ஆத்துமா செழிக்கும்',
    desc: 'Message on spiritual growth, inner restoration, and how your soul shall prosper in the Lord.',
    thumb: 'https://img.youtube.com/vi/IaCFM8eHvt4/hqdefault.jpg',
  },
];

export default function Sermons() {
  const ref = useReveal();
  const { t } = useLanguage();
  return (
    <section className="sermons" id="sermons" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">{t.sermons.eyebrow}</span>
          <h2>{t.sermons.heading}</h2>
          <p>{t.sermons.subheading}</p>
          <div style={{ marginTop: '16px' }}>
            <a href="https://www.youtube.com/@pastorsureshsimeon8634" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', opacity: 0.9, alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              {t.sermons.subscribe}
            </a>
          </div>
        </div>
        <div className="sermon-grid">
          {SERMONS.map((s, i) => (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`sermon-card reveal d${i + 1}`}
              key={s.id}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="sermon-thumb">
                <img
                  src={s.thumb}
                  alt={s.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, transition: 'transform 0.4s ease, opacity 0.3s ease' }}
                />
              </div>
              <div className="sermon-body">
                <span className="tag">{s.tag}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
