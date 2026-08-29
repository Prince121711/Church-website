import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Sermons from './components/Sermons';
import Events from './components/Events';
import EventPhotos from './components/EventPhotos';
import Ministries from './components/Ministries';
import Give from './components/Give';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ToTop from './components/ToTop';

function App() {
  return (
    <div className="page-fade">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Sermons />
      <Events />
      <EventPhotos />
      <Ministries />
      <Give />
      <Contact />
      <Footer />
      <ToTop />
    </div>
  );
}

export default App;
