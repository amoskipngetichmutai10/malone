import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Partners from './sections/Partners';
import Gallery from './sections/Gallery';
import About from './sections/About';
import Products from './sections/Products';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import WhatsApp from './components/WhatsApp';

function App() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Gallery />
        <About />
        <Products />
        <Contact />
      </main>
      <Footer />
      <WhatsApp />
    </div>
  );
}

export default App;
