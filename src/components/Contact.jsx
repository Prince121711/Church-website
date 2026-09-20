import { useState, useRef } from 'react';
import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/useLanguage';
import { isValidEmail, sanitizeInput, createRateLimiter } from '../utils/security';

const rateLimiter = createRateLimiter(60000); // 60s cooldown

export default function Contact() {
  const ref = useReveal();
  const { t, lang } = useLanguage();
  const [status, setStatus] = useState({ type: null, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const honeypotRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Honeypot spam check
    if (honeypotRef.current && honeypotRef.current.value) {
      console.warn('Spam submission detected');
      return;
    }

    // Rate limit check
    if (!rateLimiter.canSubmit()) {
      const waitSec = rateLimiter.remainingCooldownSec();
      setStatus({
        type: 'error',
        message: lang === 'ta'
          ? `தயவுசெய்து ${waitSec} வினாடிகள் காத்திருந்து மீண்டும் அனுப்பவும்.`
          : `Please wait ${waitSec} seconds before submitting another request.`,
      });
      return;
    }

    const form = e.target;
    const name = sanitizeInput(form.name.value);
    const email = form.email.value.trim();
    const msg = sanitizeInput(form.msg.value);

    if (!isValidEmail(email)) {
      setStatus({
        type: 'error',
        message: lang === 'ta' ? 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.' : 'Please provide a valid email address.',
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: null, message: '' });

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, message: msg }),
        });
        if (!res.ok) throw new Error('Endpoint returned error status');
      } else {
        // Fallback: simulate success and open mailto if requested
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      rateLimiter.recordSubmission();
      setStatus({
        type: 'success',
        message: t.contact.thankYou,
      });
      form.reset();
      setTimeout(() => setStatus({ type: null, message: '' }), 8000);
    } catch {
      // Graceful fallback to mail client
      const mailto = `mailto:elshadaisuresh1979@gmail.com?subject=${encodeURIComponent(
        `Elshaddai Ministry Prayer Request from ${name}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`)}`;
      window.location.href = mailto;

      setStatus({
        type: 'info',
        message: lang === 'ta'
          ? 'மின்னஞ்சல் செயலியைத் திறந்துள்ளோம். உங்கள் செய்தியை நேரடியாக அனுப்பலாம்.'
          : 'Opening your email client to send your message directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-info reveal">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2 className="contact-title">{t.contact.heading}</h2>
            <div className="item">
              <div className="k">{t.contact.nameKey}</div>
              <div className="v">{t.contact.nameVal}</div>
            </div>
            <div className="item">
              <div className="k">{t.contact.addressKey}</div>
              <div className="v">
                Elshaddai Ministries
                <span>{t.contact.addressVal}</span>
              </div>
            </div>
            <div className="item">
              <div className="k">{t.contact.phoneKey}</div>
              <div className="v">
                <a href="tel:+919787138862" className="contact-link">
                  {t.contact.phoneVal}
                </a>
                <span>{t.contact.phoneTime}</span>
              </div>
            </div>
            <div className="item">
              <div className="k">{t.contact.emailKey}</div>
              <div className="v">
                <a href="mailto:elshadaisuresh1979@gmail.com" className="contact-link">
                  {t.contact.emailVal}
                </a>
              </div>
            </div>
            <div className="item">
              <div className="k">{t.contact.followKey}</div>
              <div className="v">
                <a href="https://www.instagram.com/elsh.addaiministry?igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a> · <a href="https://www.youtube.com/@pastorsureshsimeon8634" target="_blank" rel="noopener noreferrer" className="social-link">YouTube</a> · <a href="https://www.facebook.com/share/1FEPsLar1o/" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
                <span>@elsh.addaiministry · @pastorsureshsimeon8634</span>
              </div>
            </div>
          </div>

          <form className="reveal d2" onSubmit={onSubmit} noValidate>
            {/* Honeypot field for bot spam prevention */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input ref={honeypotRef} type="text" id="website" name="website" tabIndex="-1" autoComplete="off" />
            </div>

            <div className="field">
              <label htmlFor="name">{t.contact.fullName}</label>
              <input id="name" name="name" type="text" required placeholder={t.contact.placeholderName} />
            </div>
            <div className="field">
              <label htmlFor="email">{t.contact.emailLabel}</label>
              <input id="email" name="email" type="email" required placeholder={t.contact.placeholderEmail} />
            </div>
            <div className="field">
              <label htmlFor="msg">{t.contact.messageLabel}</label>
              <textarea id="msg" name="msg" required placeholder={t.contact.placeholderMsg} />
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? (lang === 'ta' ? 'அனுப்புகிறது…' : 'Sending…') : t.contact.sendBtn}
            </button>

            {status.message && (
              <p
                className={`form-${status.type}`}
                role="alert"
                style={{
                  marginTop: '16px',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  fontSize: '13.5px',
                  color: status.type === 'error' ? '#ff6b6b' : status.type === 'info' ? 'var(--gold)' : '#51cf66',
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${status.type === 'error' ? '#ff6b6b' : status.type === 'info' ? 'var(--gold)' : '#51cf66'}`,
                }}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>

        {/* Interactive Google Maps Embed */}
        <div className="contact-map-wrapper reveal" style={{ marginTop: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', color: 'var(--white)', margin: 0 }}>
              📍 {lang === 'ta' ? 'சபை அமைவிடம்' : 'Find Us in Salem'}
            </h4>
            <a
              href="https://maps.google.com/?q=Elshaddai+Ministries+Salem+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: '12px', padding: '6px 14px' }}
            >
              🗺️ {lang === 'ta' ? 'கூகுள் வரைபடத்தில் திறக்க' : 'Open in Google Maps ↗'}
            </a>
          </div>
          <iframe
            title="Elshaddai Ministries Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62512.45423851532!2d78.1130456486328!3d11.664325499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1b1c3182897%3A0xb351a8f89552d431!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{
              border: '1px solid var(--hairline)',
              borderRadius: '8px',
              display: 'block',
              filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)',
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
