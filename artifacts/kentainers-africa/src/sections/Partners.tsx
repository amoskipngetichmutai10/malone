import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website?: string;
}

const STATIC_PARTNERS: Partner[] = [
  { id: 'p1', name: 'UNICEF Kenya', logo_url: 'https://logo.clearbit.com/unicef.org', website: 'https://www.unicef.org/kenya' },
  { id: 'p2', name: 'World Vision', logo_url: 'https://logo.clearbit.com/worldvision.org', website: 'https://www.wvi.org' },
  { id: 'p3', name: 'Kenya Red Cross', logo_url: 'https://logo.clearbit.com/kenyaredcross.org', website: 'https://www.kenyaredcross.org' },
  { id: 'p4', name: 'Habitat for Humanity', logo_url: 'https://logo.clearbit.com/habitat.org', website: 'https://www.habitat.org' },
  { id: 'p5', name: 'Oxfam', logo_url: 'https://logo.clearbit.com/oxfam.org', website: 'https://www.oxfam.org' },
  { id: 'p6', name: 'USAID', logo_url: 'https://logo.clearbit.com/usaid.gov', website: 'https://www.usaid.gov' },
  { id: 'p7', name: 'UN-Habitat', logo_url: 'https://logo.clearbit.com/unhabitat.org', website: 'https://unhabitat.org' },
  { id: 'p8', name: 'Equity Bank', logo_url: 'https://logo.clearbit.com/equitybank.co.ke', website: 'https://equitybank.co.ke' },
];

function PartnerLogo({ partner }: { partner: Partner }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex-shrink-0 mx-4 w-52 h-20 bg-white rounded-xl border border-brand-earth-200 flex items-center justify-center gap-3 px-5 hover:border-brand-green-400 hover:shadow-md transition-all">
      {!imgError && partner.logo_url ? (
        <img
          src={partner.logo_url}
          alt={partner.name}
          className="max-h-10 max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all"
          onError={() => setImgError(true)}
        />
      ) : null}
      {(imgError || !partner.logo_url) && (
        <span className="font-semibold text-brand-dark text-sm text-center leading-tight">{partner.name}</span>
      )}
    </div>
  );
}

export default function Partners() {
  const [dbPartners, setDbPartners] = useState<Partner[]>([]);

  useEffect(() => {
    async function fetchPartners() {
      if (!supabase) return;
      const { data } = await supabase.from('partners').select('*').order('created_at');
      if (data) setDbPartners(data);
    }
    fetchPartners();
  }, []);

  const partners = dbPartners.length > 0 ? dbPartners : STATIC_PARTNERS;
  const tickerItems = [...partners, ...partners];

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
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-ticker hover:[animation-play-state:paused]">
          {tickerItems.map((partner, i) => (
            <PartnerLogo key={`${partner.id}-${i}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
