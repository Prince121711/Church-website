import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const ref = useReveal();
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="wrap contact-grid">
        <div className="contact-info reveal">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2 style={{ margin: '16px 0 30px' }}>{t.contact.heading}</h2>
          <div className="item">
            <div className="k">{t.contact.addressKey}</div>
            <div className="v">Elshaddai Ministries<span>{t.contact.addressVal}</span></div>
          </div>
          <div className="item">
            <div className="k">{t.contact.phoneKey}</div>
            <div className="v"><a href="tel:+919787138862" style={{ color: 'inherit', textDecoration: 'none' }}>{t.contact.phoneVal}</a><span>{t.contact.phoneTime}</span></div>
          </div>
          <div className="item">
            <div className="k">{t.contact.emailKey}</div>
            <div className="v"><a href="mailto:elshadaisuresh1979@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>{t.contact.emailVal}</a></div>
          </div>
          <div className="item">
            <div className="k">{t.contact.followKey}</div>
            <div className="v">
              <a href="https://www.instagram.com/elsh.addaiministry?igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Instagram</a> · <a href="https://www.youtube.com/@pastorsureshsimeon8634" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>YouTube</a> · <a href="https://www.facebook.com/share/1FEPsLar1o/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Facebook</a>
              <span>@elsh.addaiministry · @pastorsureshsimeon8634</span>
            </div>
          </div>
        </div>
        <form className="reveal d2" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="name">{t.contact.fullName}</label>
            <input id="name" type="text" required placeholder={t.contact.placeholderName} />
          </div>
          <div className="field">
            <label htmlFor="email">{t.contact.emailLabel}</label>
            <input id="email" type="email" required placeholder={t.contact.placeholderEmail} />
          </div>
          <div className="field">
            <label htmlFor="msg">{t.contact.messageLabel}</label>
            <textarea id="msg" required placeholder={t.contact.placeholderMsg} />
          </div>
          <button type="submit" className="btn btn-primary">{t.contact.sendBtn}</button>
          {sent && <p className="form-success">{t.contact.thankYou}</p>}
        </form>
      </div>
    </section>
  );
}
