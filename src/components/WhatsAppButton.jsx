import { useLanguage } from '../context/useLanguage';

export default function WhatsAppButton() {
  const { lang } = useLanguage();

  const phone = import.meta.env.VITE_WHATSAPP_PHONE || '919787138862';
  const greeting = lang === 'ta'
    ? 'கர்த்தருக்கு ஸ்தோத்திரம் போதகரே, எல்ஷடாய் ஊழியங்களை தொடர்பு கொள்ள விரும்புகிறேன்.'
    : 'Praise the Lord Pastor Suresh, I would like to connect with Elshaddai Ministries.';

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(greeting)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label={lang === 'ta' ? 'வாட்ஸ்அப்பில் போதகரை தொடர்பு கொள்ள' : 'Chat with Pastor Suresh on WhatsApp'}
      title={lang === 'ta' ? 'வாட்ஸ்அப்பில் பேசவும்' : 'Chat on WhatsApp'}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.121-.527-1.785-.75-2.905-2.58-2.993-2.698-.088-.119-.717-.954-.717-1.819 0-.865.452-1.29.613-1.464.16-.175.351-.219.468-.219.117 0 .234.001.336.006.107.006.251-.041.393.299.144.347.491 1.2.534 1.288.044.088.073.191.015.306-.058.115-.088.188-.175.29-.088.102-.185.228-.264.306-.088.088-.18.183-.077.36.102.176.456.75 1.002 1.236.702.624 1.294.818 1.478.908.185.09.293.076.402-.049.109-.125.467-.544.592-.731.125-.187.25-.156.422-.093.172.062 1.09.514 1.277.608.187.094.312.14.358.219.046.079.046.457-.098.862zM12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.66 1.448 5.176L2 22l4.981-1.39A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
      <span className="whatsapp-tooltip">
        {lang === 'ta' ? 'ஜெப உதவிக்கு வாட்ஸ்அப்' : 'WhatsApp Prayer Help'}
      </span>
    </a>
  );
}
