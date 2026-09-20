import { useState, useMemo } from 'react';
import { useLanguage } from '../context/useLanguage';

const VERSES = [
  {
    ref: { en: 'Jeremiah 29:11', ta: 'எரேமியா 29:11' },
    text: {
      en: 'For I know the plans I have for you,” declares the LORD, “plans to prosper you and not to harm you, plans to give you hope and a future.',
      ta: 'நீங்கள் எதிர்பார்த்திருக்கும் முடிவை உங்களுக்குக் கொடுக்கும்படிக்கு நான் உங்கள்பேரில் நினைத்திருக்கிற நினைவுகளை அறிவேன் என்று கர்த்தர் சொல்லுகிறார்; அவைகள் தீமைக்கல்ல, சமாதானத்துக்கேதுவான நினைவுகளே.',
    },
  },
  {
    ref: { en: 'Isaiah 40:31', ta: 'ஏசாயா 40:31' },
    text: {
      en: 'Those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
      ta: 'கர்த்தருக்குக் காத்திருக்கிறவர்களோ புதுப்பெலன் அடைந்து, கழுகுகளைப்போலச் செட்டைகளை அடித்து எழும்புவார்கள்; அவர்கள் ஓடினாலும் இளைப்படையார்கள், நடந்தாலும் சோர்ந்துபோகார்கள்.',
    },
  },
  {
    ref: { en: 'Philippians 4:13', ta: 'பிலிப்பியர் 4:13' },
    text: {
      en: 'I can do all things through Christ who strengthens me.',
      ta: 'என்னைப் பெலப்படுத்துகிற கிறிஸ்துவினாலே எல்லாவற்றையுஞ்செய்ய எனக்குப் பெலனுண்டு.',
    },
  },
  {
    ref: { en: 'Psalm 23:1', ta: 'சங்கீதம் 23:1' },
    text: {
      en: 'The LORD is my shepherd; I shall not want.',
      ta: 'கர்த்தர் என் மேய்ப்பராயிருக்கிறார்; நான் தாழ்ச்சியடையேன்.',
    },
  },
  {
    ref: { en: 'Joshua 1:9', ta: 'யோசுவா 1:9' },
    text: {
      en: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.',
      ta: 'பயப்படாதே, கலங்காதே, நீ போகும் இடமெல்லாம் உன் தேவனாகிய கர்த்தர் உன்னோடே இருக்கிறார்.',
    },
  },
  {
    ref: { en: 'Romans 8:28', ta: 'ரோமர் 8:28' },
    text: {
      en: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
      ta: 'அவருடைய தீர்மானத்தின்படி அழைக்கப்பட்டவர்களாய் தேவனிடத்தில் அன்புகூருகிறவர்களுக்குச் சகலமும் நன்மைக்கு ஏதுவாக நடக்கிறது என்று அறிந்திருக்கிறோம்.',
    },
  },
  {
    ref: { en: 'John 14:27', ta: 'யோவான் 14:27' },
    text: {
      en: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
      ta: 'சமாதானத்தை உங்களுக்கு வைத்துப்போகிறேன், என்னுடைய சமாதானத்தையே உங்களுக்குக் கொடுக்கிறேன்; உலகம் கொடுக்கிறபிரகாரம் நான் உங்களுக்குக் கொடுக்கிறதில்லை. உங்கள் இருதயம் கலங்காமலும் பயப்படாமலும் இருப்பதாக.',
    },
  },
];

export default function DailyVerse() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Compute daily index from current day of year
  const todayVerse = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return VERSES[dayOfYear % VERSES.length];
  }, []);

  const ref = todayVerse.ref[lang] || todayVerse.ref.en;
  const text = todayVerse.text[lang] || todayVerse.text.en;

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${text}" — ${ref} (Elshaddai Ministries)`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="daily-verse-banner" role="region" aria-label="Daily Bible Verse">
      <div className="wrap">
        <div className="daily-verse-card">
          <div className="daily-verse-header">
            <div className="dv-badge">
              <span className="dv-icon">📖</span>
              <span>{lang === 'ta' ? 'இன்றைய தேவ வசனம்' : 'Today’s Scripture'}</span>
            </div>
            <button
              onClick={handleCopy}
              className="dv-copy-btn"
              title={lang === 'ta' ? 'வசனத்தை பகிர காப்பி செய்' : 'Copy verse'}
              aria-label="Copy verse"
            >
              {copied ? '✓ Copied' : '📋 Share Verse'}
            </button>
          </div>
          <blockquote className="dv-quote">
            "{text}"
          </blockquote>
          <div className="dv-footer">
            <span className="dv-ref">✦ {ref}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
