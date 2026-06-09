import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.pexels.com/photos/260254/pexels-photo-260254.jpeg?auto=compress&cs=tinysrgb&w=1920',
    headline: 'Premium Water Tanks for Every Need',
    subheadline: 'Durable, high-capacity water storage solutions serving communities across 27+ countries.',
  },
  {
    image: 'https://images.pexels.com/photos/221085/pexels-photo-221085.jpeg?auto=compress&cs=tinysrgb&w=1920',
    headline: 'Chainlink Fencing That Lasts',
    subheadline: 'Industrial-grade security fencing protecting schools, farms, and businesses across East Africa.',
  },
  {
    image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1920',
    headline: '21 Years of Trust & Excellence',
    subheadline: 'Supplying East Africa\'s water and security needs with dedication, quality, and heart.',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/50 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div
              key={current}
              className="animate-fade-in-up"
            >
              <span className="inline-block bg-brand-green-600/20 text-brand-green-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-brand-green-500/30">
                Supplying East Africa's Water & Security Needs for 21 Years
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {slides[current].headline}
              </h1>
              <p className="text-lg sm:text-xl text-brand-cream/90 mb-10 max-w-xl leading-relaxed">
                {slides[current].subheadline}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 bg-brand-green-600 hover:bg-brand-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:gap-3 shadow-xl shadow-brand-green-700/30"
                >
                  Get a Quote
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    const el = document.querySelector('#gallery');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all backdrop-blur-sm"
                >
                  View Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button onClick={prev} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/20">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-brand-green-400 w-8' : 'bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/20">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
