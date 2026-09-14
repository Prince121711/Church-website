import { useState, useEffect } from 'react';
import { SERMON_SCRIPTS } from '../data/sermonScripts';
import { useLanguage } from '../context/LanguageContext';

export default function SermonScriptModal({ activeScriptId, onClose }) {
  const { lang } = useLanguage();
  const [selectedId, setSelectedId] = useState(() => activeScriptId || SERMON_SCRIPTS[0].id);
  const [viewMode, setViewMode] = useState('reader'); // 'reader' or 'bulletin'
  const [copied, setCopied] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState(1); // 0 = standard, 1 = comfortable, 2 = large

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const currIdx = SERMON_SCRIPTS.findIndex(s => s.id === selectedId);
        if (currIdx > 0) setSelectedId(SERMON_SCRIPTS[currIdx - 1].id);
      }
      if (e.key === 'ArrowRight') {
        const currIdx = SERMON_SCRIPTS.findIndex(s => s.id === selectedId);
        if (currIdx < SERMON_SCRIPTS.length - 1) setSelectedId(SERMON_SCRIPTS[currIdx + 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedId, onClose]);

  const script = SERMON_SCRIPTS.find((s) => s.id === selectedId) || SERMON_SCRIPTS[0];

  const handleCopy = () => {
    const textToCopy = `EL SHADDAI MINISTRIES — SUNDAY SERMON NOTES
தேதி: ${script.date} (${script.time})
தலைப்பு: ${script.title}
தேவ வார்த்தை: ${script.themeWord}
போதகர்: ${script.speaker}
வேத வசனம்: ${script.keyVerse} — "${script.keyVerseText}"

${script.overview}

${script.sections?.map(sec => `\n### ${sec.heading}\n${sec.desc || ''}\n${sec.scriptures ? sec.scriptures.map(sc => `${sc.ref}: ${sc.text} ${sc.note ? `(${sc.note})` : ''}`).join('\n') : ''}${sec.items ? sec.items.map(it => `${it.num || '•'} ${it.title || it.name}: ${it.desc}`).join('\n') : ''}`).join('\n')}

தீர்மானம் / முடிவு: ${script.resolution || script.closingWord || ''}
தேவனுக்கே சகல மகிமை!`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const fontSizeClasses = ['font-sm', 'font-md', 'font-lg'];

  return (
    <div className="sermon-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={`sermon-modal-container ${fontSizeClasses[fontSizeLevel]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="sermon-modal-bar">
          <div className="bar-left">
            <span className="bulletin-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              {lang === 'ta' ? 'ஞாயிறு தேவ செய்தி மலர்' : 'Sunday Sermon Script & Notes'}
            </span>
            <span className="church-title">El Shaddai Ministries</span>
          </div>

          <div className="bar-actions">
            {/* View Mode Toggle */}
            <div className="view-mode-pill">
              <button
                type="button"
                className={`mode-btn ${viewMode === 'reader' ? 'active' : ''}`}
                onClick={() => setViewMode('reader')}
                title={lang === 'ta' ? 'வாசிப்பு வடிவம்' : 'Study Reader'}
              >
                📖 {lang === 'ta' ? 'வாசிப்பு' : 'Reader'}
              </button>
              <button
                type="button"
                className={`mode-btn ${viewMode === 'bulletin' ? 'active' : ''}`}
                onClick={() => setViewMode('bulletin')}
                title={lang === 'ta' ? 'அசல் மலர் வடிவம்' : 'Official Bulletin Style'}
              >
                📜 {lang === 'ta' ? 'மலர் வடிவம்' : 'Bulletin'}
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="font-adjuster" title="Adjust text size">
              <button
                type="button"
                className={`font-btn ${fontSizeLevel === 0 ? 'active' : ''}`}
                onClick={() => setFontSizeLevel(0)}
              >
                A-
              </button>
              <button
                type="button"
                className={`font-btn ${fontSizeLevel === 1 ? 'active' : ''}`}
                onClick={() => setFontSizeLevel(1)}
              >
                A
              </button>
              <button
                type="button"
                className={`font-btn ${fontSizeLevel === 2 ? 'active' : ''}`}
                onClick={() => setFontSizeLevel(2)}
              >
                A+
              </button>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              className="action-icon-btn"
              onClick={handleCopy}
              title={lang === 'ta' ? 'குறிப்புகளை காப்பி செய்' : 'Copy Sermon Notes'}
            >
              {copied ? '✓' : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              )}
            </button>

            {/* Print Button */}
            <button
              type="button"
              className="action-icon-btn"
              onClick={handlePrint}
              title={lang === 'ta' ? 'பிரிண்ட் / சேமி' : 'Print / Save PDF'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            </button>

            {/* Close Modal */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Date / Edition Switcher Tabs */}
        <div className="sermon-dates-nav">
          <div className="dates-scroll">
            {SERMON_SCRIPTS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`date-nav-btn ${s.id === selectedId ? 'active' : ''}`}
                onClick={() => setSelectedId(s.id)}
              >
                <span className="d-chip">{s.displayDate}</span>
                <span className="d-title">{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className={`sermon-modal-body ${viewMode === 'bulletin' ? 'bulletin-styled' : 'reader-styled'}`}>
          {/* Printable Church Letterhead Header */}
          <div className="bulletin-header-frame">
            <div className="b-cross">✚</div>
            <div className="b-church-meta">
              <h2>EL SHADDAI MINISTRIES</h2>
              <p className="b-tamil-name">எல்ஷடாய் ஊழியங்கள் • எல்லாம் வல்ல கடவுள்</p>
              <p className="b-sub">ஞாயிறு வழிபாடு தேவ செய்தி மலர் • தேவனுக்கே சகல மகிமையும் உண்டாவதாக</p>
            </div>
            <div className="b-service-pill">
              <span className="b-date">📅 {script.date}</span>
              <span className="b-time">⏰ {script.time}</span>
            </div>
          </div>

          {/* Sermon Title & Speaker Banner */}
          <div className="sermon-hero-banner">
            <div className="hero-left">
              <span className="category-label">{script.serviceType}</span>
              <h1 className="sermon-main-title">{script.title}</h1>
              {script.englishTitle && (
                <p className="sermon-en-title">{script.englishTitle}</p>
              )}
              <div className="speaker-badge">
                <span className="sp-icon">🎙️</span>
                <span>{lang === 'ta' ? 'செய்தியாளர்' : 'Speaker'}: <strong>{script.speaker}</strong> ({script.speakerEn})</span>
              </div>
            </div>

            <div className="hero-theme-badge">
              <span className="theme-label">{lang === 'ta' ? 'தேவ வார்த்தை' : "Today's Word"}</span>
              <div className="theme-quote">"{script.themeWord}"</div>
              {script.themeMeaning && (
                <p className="theme-meaning">[{script.themeMeaning}]</p>
              )}
            </div>
          </div>

          {/* Key Verse Highlight Box */}
          <div className="key-verse-card">
            <div className="verse-ribbon">
              <span className="verse-icon">📖</span>
              <span className="verse-ref">{script.keyVerse}</span>
            </div>
            <blockquote className="verse-text">
              "{script.keyVerseText}"
            </blockquote>
            {script.context && (
              <p className="verse-context">✦ {script.context}</p>
            )}
          </div>

          {/* Burden / Mission Section if present */}
          {script.burdenSection && (
            <div className="burden-box">
              <h4>🔥 {script.burdenSection.title}</h4>
              <ul>
                {script.burdenSection.points.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Content Sections */}
          <div className="sermon-content-grid">
            {script.sections?.map((sec, sIdx) => (
              <div key={sIdx} className={`section-block ${sec.isList ? 'list-block' : ''} ${sec.isWarning ? 'warning-block' : ''} ${sec.isAttributes ? 'attributes-block' : ''}`}>
                <h3 className="section-title">
                  <span className="title-bullet">❖</span> {sec.heading}
                </h3>
                {sec.desc && <p className="section-desc">{sec.desc}</p>}

                {/* 6 Sacrifices or 5 Dove Attributes or Ordered Items */}
                {sec.items && (
                  <div className="items-grid">
                    {sec.items.map((item, iIdx) => (
                      <div key={iIdx} className="item-tile">
                        <div className="item-num">{item.num}</div>
                        <div className="item-info">
                          <h4>{item.title || item.name}</h4>
                          <p>{item.desc}</p>
                          {item.verses && <span className="item-verse-ref">📜 {item.verses}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Badge inside section (e.g. நாம் எல்லாவற்றிலும் நேர்த்தையை பின்பற்ற வேண்டும்) */}
                {sec.badge && (
                  <div className="highlight-pill-banner">
                    ✨ {sec.badge}
                  </div>
                )}

                {/* Scripture references inside section */}
                {sec.scriptures && (
                  <div className="scriptures-stack">
                    {sec.scriptures.map((sc, scIdx) => (
                      <div key={scIdx} className="scripture-item">
                        <div className="sc-header">
                          <span className="sc-ref">✦ {sc.ref}</span>
                        </div>
                        <p className="sc-text">"{sc.text}"</p>
                        {sc.note && <p className="sc-note">👉 {sc.note}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Special Golden Quote / Takeaway if present */}
          {script.goldenQuote && (
            <div className="golden-quote-card">
              <div className="g-icon">🕊️</div>
              <blockquote>"{script.goldenQuote}"</blockquote>
            </div>
          )}

          {/* Core Takeaways & Decisions Summary */}
          <div className="takeaways-deck">
            {script.keyTakeaway && (
              <div className="takeaway-box primary">
                <h4>📌 {lang === 'ta' ? 'செய்தியின் முக்கிய கருத்து' : 'Core Message Takeaway'}</h4>
                <p>{script.keyTakeaway}</p>
              </div>
            )}

            {script.resolution && (
              <div className="takeaway-box action">
                <h4>🎯 {lang === 'ta' ? 'அன்றாட வாழ்விற்கான தீர்மானம்' : 'Daily Life Resolution'}</h4>
                <p>{script.resolution}</p>
              </div>
            )}

            {script.reminders && (
              <div className="takeaway-box reminders">
                <h4>🔔 {lang === 'ta' ? 'முக்கிய நினைவூட்டல்' : 'Key Reminders'}</h4>
                <div className="reminder-tags">
                  {script.reminders.map((r, rIdx) => (
                    <span key={rIdx} className="reminder-tag">✓ {r}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Closing Blessing */}
          <div className="bulletin-footer-blessing">
            <p className="f-grace">
              {script.closingWord || 'நன்றி • ஸ்தோத்திரம் • தேவனுக்கே சகல மகிமை!'}
            </p>
            <p className="f-church">எல்ஷடாய் ஊழியங்கள் | கர்த்தர் உங்களை நிறைவாய் ஆசீர்வதிப்பாராக!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
