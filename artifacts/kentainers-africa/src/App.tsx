import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Partners from "./sections/Partners";
import Gallery from "./sections/Gallery";
import About from "./sections/About";
import Products from "./sections/Products";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import WhatsApp from "./components/WhatsApp";

export default function App() {
  return (
    <div className="font-sans text-brand-dark">
      <Navbar />
      <Hero />
      <Partners />
      <Products />
      <Gallery />
      <About />
      <Contact />
      <Footer />
      <WhatsApp />
    </div>
  );
}
