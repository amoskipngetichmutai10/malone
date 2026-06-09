import { useScrollReveal } from "@/hooks/useScrollReveal";

const partners = [
  { name: "Kenya Water Agency", logo: "K" },
  { name: "Nairobi Water", logo: "N" },
  { name: "Mombasa County", logo: "M" },
  { name: "UNICEF Kenya", logo: "U" },
  { name: "Red Cross", logo: "R" },
  { name: "World Bank", logo: "W" },
  { name: "USAID", logo: "A" },
  { name: "GIZ Kenya", logo: "G" },
];

export default function Partners() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="partners"
      ref={ref}
      className="py-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            Our Partners
          </h2>
          <p className="text-brand-stone-500 max-w-2xl mx-auto">
            Trusted by leading organizations across East Africa
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex animate-ticker">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 mx-8 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-green-100 flex items-center justify-center">
                <span className="text-brand-green-700 font-bold text-lg">
                  {partner.logo}
                </span>
              </div>
              <span className="text-brand-stone-600 font-medium whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
