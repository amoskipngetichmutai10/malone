import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    async function fetchTestimonials() {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from('testimonials').select('*').order('created_at');
      if (data) setTestimonials(data);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-secondary-600">
            Don't just take our word for it — hear from businesses we've helped transform with our container solutions.
          </p>
        </div>

        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-secondary-50 rounded-2xl p-8 animate-pulse">
                <div className="h-4 bg-secondary-200 rounded w-full mb-2" />
                <div className="h-4 bg-secondary-200 rounded w-5/6 mb-6" />
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary-200 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary-200 rounded w-24" />
                    <div className="h-3 bg-secondary-200 rounded w-32" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-secondary-50 rounded-2xl p-8 hover:shadow-lg transition-shadow relative"
              >
                <Quote className="w-10 h-10 text-primary-200 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-secondary-700 leading-relaxed mb-6 relative z-10">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-lg">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-900">{t.name}</p>
                    <p className="text-secondary-500 text-sm">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
