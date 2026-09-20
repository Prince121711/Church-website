import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/useLanguage';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya & Family',
    location: { en: 'Salem', ta: 'சேலம்' },
    role: { en: 'Church Member (5 Years)', ta: 'சபை விசுவாசி (5 ஆண்டுகள்)' },
    quote: {
      en: 'Elshaddai Ministries has been a sanctuary of divine solace and spiritual renewal. Pastor Suresh Simeon’s Christ-centered messages brought breakthrough and restoration to our household.',
      ta: 'எல்ஷடாய் ஊழியங்கள் எங்கள் குடும்பத்திற்கு சமாதானத்தையும் தெய்வீக ஆசீர்வாதத்தையும் தந்துள்ளது. போதகரின் சத்திய வசனங்கள் எங்கள் குடும்பத்தில் புதிய நம்பிக்கையையும் விடுதலையையும் தந்தது.',
    },
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: { en: 'Salem', ta: 'சேலம்' },
    role: { en: 'Youth Fellowship', ta: 'வாலிபர் ஐக்கியம்' },
    quote: {
      en: 'Through the Friday Fasting Prayers and church intercession, God granted miraculous healing and career direction in my life. All glory and honour be to Jesus alone!',
      ta: 'வெள்ளி உபவாச ஜெபங்களில் கலந்துகொண்டபோது, என் சரீர பலவீனத்தில் ஆண்டவர் பரிபூரண சுகத்தையும், வேலைவாய்ப்பில் அற்புதமான வழியையும் திறந்து தந்தார். தேவனுக்கே மகிமை!',
    },
  },
  {
    id: 3,
    name: 'Esther Samuel',
    location: { en: 'Namakkal', ta: 'நாமக்கல்' },
    role: { en: 'Prayer Partner', ta: 'ஜெப பங்காளர்' },
    quote: {
      en: 'The Sunday sermon notes and Spirit-led worship make every week a feast of God’s Word. Our spiritual understanding and intimacy with Christ have multiplied abundantly.',
      ta: 'ஞாயிறு செய்தி மலரும், ஆவிக்குரிய ஆராதனையும் ஒவ்வொரு வாரமும் தேவனுடைய வார்த்தையின் விருந்தாக அமைகிறது. கிறிஸ்துவோடுள்ள எங்கள் உறவு மேன்மேலும் ஆழமாகியுள்ளது.',
    },
  },
];

export default function Testimonials() {
  const ref = useReveal();
  const { lang } = useLanguage();

  return (
    <section className="testimonials" id="testimonials" ref={ref}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            {lang === 'ta' ? 'சாட்சிகள்' : 'Voices of Faith'}
          </span>
          <h2>
            {lang === 'ta' ? 'விசுவாசிகளின் சாட்சிகள்' : 'Stories of God’s Faithfulness'}
          </h2>
          <p>
            {lang === 'ta'
              ? 'கர்த்தர் எங்கள் சபை விசுவாசிகளின் வாழ்வில் செய்த நன்மைகளும் அற்புதங்களும்.'
              : 'Real testimonies of transformation, healing, and grace experienced at Elshaddai Ministries.'}
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className={`testimonial-card reveal d${i + 1}`} key={t.id}>
              <div className="t-stars" aria-hidden="true">★★★★★</div>
              <blockquote className="t-quote">
                "{t.quote[lang] || t.quote.en}"
              </blockquote>
              <div className="t-author">
                <div className="t-avatar">{t.name[0]}</div>
                <div className="t-meta">
                  <h4>{t.name}</h4>
                  <span className="t-role">{t.role[lang] || t.role.en}</span>
                  <span className="t-loc">📍 {t.location[lang] || t.location.en}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
