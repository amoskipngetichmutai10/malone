import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image:
      "https://res.cloudinary.com/demo/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/water-tank-blue",
    title: "Premium Water Tanks",
    subtitle: "Reliable water storage for homes and businesses across East Africa",
  },
  {
    image:
      "https://res.cloudinary.com/demo/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/fence-chainlink",
    title: "Chainlink Fencing",
    subtitle: "Durable galvanized and PVC-coated fencing solutions",
  },
  {
    image:
      "https://res.cloudinary.com/demo/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/construction-site",
    title: "21 Years of Trust",
    subtitle: "Serving communities across Kenya and East Africa since 2003",
  },
  {
    image:
      "https://res.cloudinary.com/demo/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/water-storage",
    title: "Get a Quote Today",
    subtitle: "Competitive pricing and professional installation services",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const slide = slides[current];

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/50 to-transparent" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1
              key={current}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up"
            >
              {slide.title}
            </h1>
            <p
              key={`sub-${current}`}
              className="text-lg sm:text-xl text-white/90 mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#contact")}
                className="bg-brand-green-700 hover:bg-brand-green-800 text-white px-8 py-3.5 rounded-full text-base font-semibold transition-colors shadow-lg"
              >
                Get a Quote
              </button>
              <button
                onClick={() => scrollTo("#gallery")}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3.5 rounded-full text-base font-semibold transition-colors border border-white/30"
              >
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white scale-110" : "bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}
