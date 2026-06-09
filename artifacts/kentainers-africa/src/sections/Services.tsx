import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Container, Handshake, Wrench, Truck, Hammer, MessageCircle, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  container: Container,
  lease: Handshake,
  wrench: Wrench,
  truck: Truck,
  tool: Hammer,
  'message-circle': MessageCircle,
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    async function fetchServices() {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from('services').select('*').order('created_at');
      if (data) setServices(data);
      setLoading(false);
    }
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 bg-balance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-3 mb-4">
            Comprehensive Container Solutions
          </h2>
          <p className="text-secondary-600">
            From acquisition to customization, we provide end-to-end container services tailored to your unique requirements.
          </p>
        </div>

        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-secondary-50 rounded-2xl p-8 animate-pulse">
                <div className="w-14 h-14 bg-secondary-200 rounded-xl mb-6" />
                <div className="h-6 bg-secondary-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-secondary-200 rounded w-full mb-2" />
                <div className="h-4 bg-secondary-200 rounded w-2/3" />
              </div>
            ))
          ) : (
            services.map((service, i) => {
              const Icon = iconMap[service.icon] || Container;
              return (
                <div
                  key={service.id}
                  className="group bg-secondary-50 rounded-2xl p-8 hover:bg-primary-600 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-100 group-hover:bg-primary-500 flex items-center justify-center mb-6 transition-colors">
                    <Icon className="w-7 h-7 text-primary-600 group-hover:text-balance transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 group-hover:text-balance mb-3 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-secondary-600 group-hover:text-primary-100 leading-relaxed mb-4 transition-colors">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary-600 group-hover:text-balance font-medium text-sm transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
