import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    image: 'https://res.cloudinary.com/dvru78pi3/video/upload/so_2,w_1920,h_1080,c_fill/v1780963546/wt4_zw0nrt.jpg',
    imageMobile: 'https://res.cloudinary.com/dvru78pi3/video/upload/so_2,w_768,h_1024,c_fill/v1780963546/wt4_zw0nrt.jpg',
    headline: 'Premium Water Tanks for Every Need',
    subheadline: 'Durable, high-capacity water storage solutions serving homes, schools, and communities across East Africa.',
    badge: 'Water Storage Solutions',
  },
  {
    image: 'https://res.cloudinary.com/dvru78pi3/video/upload/so_2,w_1920,h_1080,c_fill/v1780967856/cl1_apyb4m.jpg',
    imageMobile: 'https://res.cloudinary.com/dvru78pi3/video/upload/so_2,w_768,h_1024,c_fill/v1780967856/cl1_apyb4m.jpg',
    headline: 'Chainlink Fencing That Lasts',
    subheadline: 'Industrial-grade galvanized chainlink protecting farms, schools, factories, and estates across East Africa.',
    badge: 'Security Fencing',
  },
  {
    image: 'https://res.cloudinary.com/dvru78pi3/video/upload/so_2,w_1920,h_1080,c_fill/v1780963671/wt9_yc1ecp.jpg',
    imageMobile: 'https://res.cloudinary.com/dvru78pi3/video/upload/so_2,w_768,h_1024,c_fill/v1780963671/wt9_yc1ecp.jpg',
    headline: 'Serving Communities for Over 21 Years',
    subheadline: 'Trusted supplier delivering water security and perimeter protection to over 27 countries across Africa.',
    badge: '21 Years of Excellence',
  },
  {
    image: 'https://res.cloudinary.com/dvru78pi3/video/upload/so_2,w_1920,h_1080,c_fill/v1780967720/cl3_rjuu8o.jpg',
    imageMobile: 'https://res.cloudinary.com/dvru78pi3/video/upload/so_2,w_768,h_1024,c_fill/v1780967720/cl3_rjuu8o.jpg',
    headline: 'Complete Perimeter Security',
    subheadline: 'From chainlink mesh to barbed wire and fence posts — we supply everything you need for a secure boundary.',
    badge: 'Full Installation Solutions',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(new Set([0]));

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  // Preload next and previous images for smooth transitions
  useEffect(() => {
    const nextIdx = (current + 1) % slides.length;
    const prevIdx = (current - 1 + slides.length) % slides.length;
    
    setIsPreloaded((prev) => new Set(prev).add(nextIdx).add(prevIdx));

    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current, next]);

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
          {/* Desktop Image - Preload next/prev for smooth transitions */}
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover hidden sm:block"
            loading={isPreloaded.has(i) ? 'eager' : 'lazy'}
            decoding="async"
            sizes="100vw"
          />

          {/* Mobile Image - Optimized for mobile devices */}
          <img
            src={slide.imageMobile}
            alt={slide.headline}
            className="w-full h-full object-cover sm:hidden"
            loading={isPreloaded.has(i) ? 'eager' : 'lazy'}
            decoding="async"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/55 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div key={current} className="animate-fade-in-up">
              <span className="inline-block bg-brand-green-600/20 text-brand-green-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-brand-green-500/30">
                {slides[current].badge}
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
                  className="inline-flex items-center gap-2 bg-brand-green-600 hover:bg-brand-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:gap-3 shadow-xl"
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
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-3 rounded-full transition-all ${i === current ? 'bg-brand-green-400 w-8' : 'bg-white/40 hover:bg-white/60 w-3'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
