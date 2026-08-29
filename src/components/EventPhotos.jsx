import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/LanguageContext';

const PHOTOS = [
  {
    id: 1,
    src: 'assets/events/event1.jpg',
    title: 'Fellowship & Worship Gathering',
    date: 'June 2024',
    category: 'Worship & Fellowship',
  },
  {
    id: 2,
    src: 'assets/events/event2.jpg',
    title: 'Special Sunday Praise Service',
    date: 'December 2024',
    category: 'Sunday Worship',
  },
  {
    id: 3,
    src: 'assets/events/event3.jpg',
    title: 'Christmas Morning Celebration',
    date: '25 December 2024',
    category: 'Christmas Service',
  },
  {
    id: 4,
    src: 'assets/events/event4.jpg',
    title: 'Joyful Praise & Fellowship',
    date: '25 December 2024',
    category: 'Special Celebration',
  },
  {
    id: 5,
    src: 'assets/events/event5.jpg',
    title: 'New Year Watchnight Service',
    date: '31 December 2024',
    category: 'Watchnight Blessing',
  },
];

export default function EventPhotos() {
  const ref = useReveal();
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="event-photos" id="gallery" ref={ref}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>{t.gallery.eyebrow}</span>
          <h2>{t.gallery.heading}</h2>
          <p>{t.gallery.subheading}</p>
        </div>

        <div className="photo-grid">
          {PHOTOS.map((p, i) => (
            <div
              key={p.id}
              className={`photo-card reveal d${(i % 3) + 1} ${i === 0 || i === 4 ? 'wide' : ''}`}
              onClick={() => setSelectedPhoto(p)}
            >
              <img src={p.src} alt={p.title} loading="lazy" />
              <div className="photo-overlay">
                <span className="photo-cat">{p.category}</span>
                <h4 className="photo-title">{p.title}</h4>
                <span className="photo-date">{p.date}</span>
                <span className="view-btn">{t.gallery.viewPhoto}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="lightbox-backdrop" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>✕</button>
            <img src={selectedPhoto.src} alt={selectedPhoto.title} />
            <div className="lightbox-caption">
              <span className="photo-cat">{selectedPhoto.category}</span>
              <h3>{selectedPhoto.title}</h3>
              <p>{selectedPhoto.date} — Elshaddai Ministries</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
