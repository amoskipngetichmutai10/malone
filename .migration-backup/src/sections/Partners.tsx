import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Building2 } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    async function fetchPartners() {
      const { data } = await supabase.from('partners').select('*').order('created_at');
      if (data) setPartners(data);
    }
    fetchPartners();
  }, []);

  const tickerItems = partners.length > 0 ? [...partners, ...partners] : [];

  return (
    <section id="partners" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <span className="text-brand-green-700 font-semibold text-sm uppercase tracking-wider">Trusted Collaborations</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mt-3">Our Strategic Partners</h2>
          <p className="text-brand-stone mt-3 max-w-2xl mx-auto">
            We work alongside leading NGOs, government agencies, and private organizations to deliver water and security solutions across East Africa.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-ticker hover:[animation-play-state:paused]">
          {tickerItems.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex-shrink-0 mx-4 w-64 h-24 bg-brand-cream rounded-xl border border-brand-earth-200 flex items-center justify-center gap-3 px-6 hover:border-brand-green-400 transition-colors"
            >
              <Building2 className="w-8 h-8 text-brand-green-600 shrink-0" />
              <span className="font-semibold text-brand-dark text-sm">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
