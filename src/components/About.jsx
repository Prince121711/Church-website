import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/useLanguage';

export default function About() {
  const ref = useReveal();
  const { t } = useLanguage();
  return (
    <section className="about" id="about" ref={ref}>
      <div className="wrap about-grid">
        <div className="about-copy reveal">
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 style={{ marginTop: 16, marginBottom: 22 }}>{t.about.heading}</h2>
          <p className="verse">
            "El Shaddai — God Almighty. I am the Lord who provides, protects, and never fails."
            <cite>Genesis 17:1</cite>
          </p>
          <p>{t.about.desc1}</p>
          <p>{t.about.desc2}</p>
        </div>
        <div className="trinity reveal d2">
          <div>
            <div className="mark">V</div>
            <div><h4>{t.about.visionTitle}</h4><p>{t.about.visionDesc}</p></div>
          </div>
          <div>
            <div className="mark">M</div>
            <div><h4>{t.about.missionTitle}</h4><p>{t.about.missionDesc}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
