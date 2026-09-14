import { useState, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/LanguageContext';
import { SERMON_SCRIPTS } from '../data/sermonScripts';

// Lazy load the modal for code-splitting (Fix 5: reduces main bundle size)
const SermonScriptModal = lazy(() => import('./SermonScriptModal'));

// Fix 2: Each video maps to a specific sermon script via scriptId
const SERMONS = [
  {
    id: 'd98aiAg_cB4',
    url: 'https://youtu.be/d98aiAg_cB4',
    tag: 'Elshaddai Ministries · Sermon',
    title: 'Jesus love from THE SHADDAI',
    desc: 'A powerful message from Pastor Suresh Simeon on the boundless love of Jesus through El Shaddai Ministries.',
    thumb: 'https://img.youtube.com/vi/d98aiAg_cB4/hqdefault.jpg',
    scriptId: '2026-09-13',
  },
  {
    id: 'Ykq37OGzYKE',
    url: 'https://youtu.be/Ykq37OGzYKE',
    tag: 'Elshaddai Ministries · Sermon',
    title: 'கடின இருதயம்',
    desc: 'Pastor Suresh Simeon speaks about the hardened heart and how God transforms it with His grace.',
    thumb: 'https://img.youtube.com/vi/Ykq37OGzYKE/hqdefault.jpg',
    scriptId: '2026-09-06',
  },
  {
    id: 'IaCFM8eHvt4',
    url: 'https://youtu.be/IaCFM8eHvt4',
    tag: 'Elshaddai Ministries · Sermon',
    title: 'ஆத்துமா செழிக்கும்',
    desc: 'Message on spiritual growth, inner restoration, and how your soul shall prosper in the Lord.',
    thumb: 'https://img.youtube.com/vi/IaCFM8eHvt4/hqdefault.jpg',
    scriptId: '2026-08-30',
  },
];

export default function Sermons() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'scripts', 'videos'
  const [selectedScriptId, setSelectedScriptId] = useState(null);
  const ref = useReveal([activeTab]);

  const latestScript = SERMON_SCRIPTS[0];

  return (
    <section className="sermons" id="sermons" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">{t.sermons.eyebrow}</span>
          <h2>{t.sermons.heading}</h2>
          <p>{t.sermons.subheading}</p>

          <div className="sermons-header-controls">
            {/* YouTube Subscribe Button */}
            <a
              href="https://www.youtube.com/@pastorsureshsimeon8634"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline youtube-sub-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              {t.sermons.subscribe}
            </a>

            {/* Filter Tabs */}
            <div className="sermons-filter-pills">
              <button
                type="button"
                className={`filter-pill ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                {lang === 'ta' ? 'அனைத்தும்' : 'All'}
              </button>
              <button
                type="button"
                className={`filter-pill ${activeTab === 'scripts' ? 'active' : ''}`}
                onClick={() => setActiveTab('scripts')}
              >
                📜 {t.sermons.tabScripts} ({SERMON_SCRIPTS.length})
              </button>
              <button
                type="button"
                className={`filter-pill ${activeTab === 'videos' ? 'active' : ''}`}
                onClick={() => setActiveTab('videos')}
              >
                🎥 {t.sermons.tabVideos} ({SERMONS.length})
              </button>
            </div>
          </div>
        </div>

        {/* Featured Latest Sermon Script Spotlight Banner */}
        {latestScript && (
          <div className="sermon-spotlight-card reveal">
            <div className="spotlight-badge-row">
              <span className="spotlight-badge">
                <span className="live-dot" />
                {t.sermons.latestScriptBadge} • {latestScript.date}
              </span>
              <span className="spotlight-verse-tag">{latestScript.keyVerse}</span>
            </div>

            <div className="spotlight-content">
              <div className="spotlight-text">
                <span className="spotlight-theme">"{latestScript.themeWord}"</span>
                <h3 className="spotlight-title">{latestScript.title}</h3>
                <p className="spotlight-verse-snippet">
                  "{latestScript.keyVerseText.length > 150
                    ? `${latestScript.keyVerseText.substring(0, 150)}…`
                    : latestScript.keyVerseText}"
                </p>
                <div className="spotlight-meta">
                  <span>🎙️ {latestScript.speaker}</span>
                  <span className="dot-sep">•</span>
                  <span>⏰ {latestScript.time}</span>
                  <span className="dot-sep">•</span>
                  <span>🏛️ El Shaddai Ministries</span>
                </div>
              </div>

              <div className="spotlight-cta">
                <button
                  type="button"
                  className="btn btn-primary spotlight-btn"
                  onClick={() => setSelectedScriptId(latestScript.id)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  {t.sermons.readScript}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sermon Scripts Section */}
        {(activeTab === 'all' || activeTab === 'scripts') && (
          <div className="sermon-sub-section">
            <div className="sub-section-header reveal">
              <h3>
                <span className="section-icon">📜</span>
                {t.sermons.scriptsHeading}
              </h3>
              <span className="sub-count">{SERMON_SCRIPTS.length} {t.sermons.editionsLabel}</span>
            </div>

            <div className="sermon-scripts-grid">
              {SERMON_SCRIPTS.map((script, idx) => (
                <div
                  key={script.id}
                  className="script-card"
                  onClick={() => setSelectedScriptId(script.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedScriptId(script.id)}
                >
                  <div className="script-card-top">
                    <span className="script-date-pill">📅 {script.displayDate}</span>
                    <span className="script-theme-tag">"{script.themeWord}"</span>
                  </div>

                  <h4 className="script-card-title">{script.title}</h4>
                  <p className="script-card-snippet">
                    "{script.keyVerseText.substring(0, 110)}..."
                  </p>

                  <div className="script-card-footer">
                    <span className="script-verse-pill">📖 {script.keyVerse}</span>
                    <span className="script-read-link">
                      {t.sermons.readScript} →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Sermons Section */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <div className="sermon-sub-section">
            <div className="sub-section-header reveal">
              <h3>
                <span className="section-icon">🎥</span>
                {t.sermons.videosHeading}
              </h3>
              <a
                href="https://www.youtube.com/@pastorsureshsimeon8634"
                target="_blank"
                rel="noopener noreferrer"
                className="view-channel-link"
              >
                {t.sermons.visitChannel}
              </a>
            </div>

            <div className="sermon-grid">
              {SERMONS.map((s, i) => (
                <div
                  className="sermon-card"
                  key={s.id}
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <div className="sermon-thumb">
                      <img
                        src={s.thumb}
                        alt={s.title}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0.88,
                          transition: 'transform 0.4s ease, opacity 0.3s ease',
                        }}
                      />
                    </div>
                    <div className="sermon-body">
                      <span className="tag">{s.tag}</span>
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                  </a>
                  <div className="sermon-card-actions">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-action-btn yt"
                    >
                      ▶ {t.sermons.watchVideo}
                    </a>
                    <button
                      type="button"
                      className="card-action-btn notes"
                      onClick={() => setSelectedScriptId(
                        s.scriptId && SERMON_SCRIPTS.find(sc => sc.id === s.scriptId)
                          ? s.scriptId
                          : SERMON_SCRIPTS[0].id
                      )}
                    >
                      📖 {t.sermons.sermonScript}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Sermon Script Modal (lazy-loaded for code splitting) */}
      {selectedScriptId && (
        <Suspense fallback={
          createPortal(
            <div className="sermon-modal-backdrop">
              <div style={{ color: 'var(--gold)', fontSize: '16px', textAlign: 'center' }}>
                ⏳ {t.sermons.loadingScript || 'Loading...'}
              </div>
            </div>,
            document.body
          )
        }>
          <SermonScriptModal
            key={selectedScriptId}
            activeScriptId={selectedScriptId}
            onClose={() => setSelectedScriptId(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
