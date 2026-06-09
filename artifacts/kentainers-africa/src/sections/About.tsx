import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Award, Clock, Users } from "lucide-react";

const stats = [
  { icon: Clock, value: "21+", label: "Years Experience" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Shield, value: "100%", label: "Quality Guarantee" },
  { icon: Award, value: "15+", label: "Awards Won" },
];

export default function About() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4 text-center">
            About Kentainers East Africa
          </h2>
          <p className="text-brand-stone-500 max-w-3xl mx-auto text-center mb-16">
            Since 2003, Kentainers East Africa has been the region's trusted
            provider of water tanks and chainlink fencing. We are committed to
            delivering quality products that serve communities, businesses, and
            institutions across Kenya and the wider East African region.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-brand-green-100 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-brand-green-700" />
              </div>
              <div className="text-3xl font-bold text-brand-green-700 mb-2">
                {value}
              </div>
              <div className="text-brand-stone-500 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
