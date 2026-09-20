import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DailyVerse from './components/DailyVerse';
import About from './components/About';
import Services from './components/Services';
import Sermons from './components/Sermons';
import Events from './components/Events';
import EventPhotos from './components/EventPhotos';
import Ministries from './components/Ministries';
import Testimonials from './components/Testimonials';
import Give from './components/Give';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ToTop from './components/ToTop';
import WhatsAppButton from './components/WhatsAppButton';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="page-fade">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <Hero />
          <DailyVerse />
          <About />
          <Services />
          <Sermons />
          <Events />
          <EventPhotos />
          <Ministries />
          <Testimonials />
          <Give />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
        <ToTop />
      </div>
    </ErrorBoundary>
  );
}

export default App;
