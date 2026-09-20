import { useState, useEffect, useCallback } from 'react';
import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/useLanguage';
import { GALLERY_PHOTOS } from '../data/galleryData';

export default function EventPhotos() {
  const ref = useReveal();
  const { t, lang } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const getTitle = (p) => (typeof p.title === 'object' ? p.title[lang] || p.title.en : p.title);
  const getCategory = (p) => (typeof p.category === 'object' ? p.category[lang] || p.category.en : p.category);
  const getDate = (p) => (typeof p.date === 'object' ? p.date[lang] || p.date.en : p.date);

  const handlePrevPhoto = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = GALLERY_PHOTOS.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    setSelectedPhoto(GALLERY_PHOTOS[prevIndex]);
  }, [selectedPhoto]);

  const handleNextPhoto = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = GALLERY_PHOTOS.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % GALLERY_PHOTOS.length;
    setSelectedPhoto(GALLERY_PHOTOS[nextIndex]);
  }, [selectedPhoto]);

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhoto, handlePrevPhoto, handleNextPhoto]);

  return (
    <section className="event-photos" id="gallery" ref={ref}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>{t.gallery.eyebrow}</span>
          <h2>{t.gallery.heading}</h2>
          <p>{t.gallery.subheading}</p>
        </div>

        <div className="photo-grid">
          {GALLERY_PHOTOS.map((p, i) => {
            const title = getTitle(p);
            const category = getCategory(p);
            const date = getDate(p);

            return (
              <div
                key={p.id}
                className={`photo-card reveal d${(i % 3) + 1} ${i === 0 || i === 4 ? 'wide' : ''}`}
                onClick={() => setSelectedPhoto(p)}
                role="button"
                tabIndex={0}
                aria-label={`${t.gallery.viewPhoto}: ${title} (${category})`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPhoto(p);
                  }
                }}
              >
                <img
                  src={p.src}
                  alt={title}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                />
                <div className="photo-overlay">
                  <span className="photo-cat">{category}</span>
                  <h4 className="photo-title">{title}</h4>
                  <span className="photo-date">{date}</span>
                  <span className="view-btn">{t.gallery.viewPhoto}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="lightbox-backdrop"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={getTitle(selectedPhoto)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>

            {/* Navigation buttons */}
            <button
              className="lightbox-nav-btn prev"
              onClick={handlePrevPhoto}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              className="lightbox-nav-btn next"
              onClick={handleNextPhoto}
              aria-label="Next photo"
            >
              ›
            </button>

            <img
              src={selectedPhoto.src}
              alt={getTitle(selectedPhoto)}
              width={selectedPhoto.width}
              height={selectedPhoto.height}
            />
            <div className="lightbox-caption">
              <span className="photo-cat">{getCategory(selectedPhoto)}</span>
              <h3>{getTitle(selectedPhoto)}</h3>
              <p>{getDate(selectedPhoto)} — Elshaddai Ministries</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
