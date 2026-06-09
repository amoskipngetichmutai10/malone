import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import { Globe, Truck, Heart, Users, Calendar, Award, Target, Eye } from 'lucide-react';

function StatCard({ icon: Icon, end, suffix, label, delay }: { icon: React.ComponentType<{ className?: string }>; end: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCountUp(end, 2500);
  return (
    <div
      ref={ref}
      className="reveal-scale bg-white rounded-2xl p-6 shadow-sm border border-brand-earth-200 text-center hover:shadow-md transition-shadow"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-xl bg-brand-green-100 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7 text-brand-green-700" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-brand-green-800 mb-1">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-brand-stone text-sm font-medium">{label}</p>
    </div>
  );
}

export default function About() {
  const sectionRef = useScrollReveal(0.1);

  const stats = [
    { icon: Globe, end: 14, suffix: '', label: 'Nations', delay: 0 },
    { icon: Truck, end: 27, suffix: '+', label: 'Countries with Deliveries', delay: 100 },
    { icon: Heart, end: 38, suffix: '+', label: 'Humanitarian Contributions', delay: 200 },
    { icon: Users, end: 35000, suffix: '+', label: 'Clients Served', delay: 300 },
    { icon: Calendar, end: 21, suffix: '', label: 'Years in Market', delay: 400 },
    { icon: Award, end: 100, suffix: '%', label: 'Quality Commitment', delay: 500 },
  ];

  return (
    <section id="about" className="py-24 bg-brand-cream">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-1 gap-16 items-center mb-20">
          <div className="reveal-left">
            <span className="text-brand-green-700 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mt-3 mb-6 leading-tight">
              Two Decades of <br />
              <span className="text-brand-green-700">Water & Security</span> Excellence
            </h2>
            <p className="text-brand-stone leading-relaxed mb-6">
              Founded in Kenya and now operating across 14 nations, we have grown from a small local supplier
              into one of East Africa's most trusted names in water storage and perimeter security solutions.
              Our journey has been defined by an unwavering commitment to quality, community impact, and
              customer satisfaction.
            </p>
            <p className="text-brand-stone leading-relaxed mb-8">
              Every water tank we install and every meter of fencing we erect carries the weight of 21 years
              of expertise. We have served over 35,000 clients — from smallholder farmers to multinational
              NGOs — and contributed to 38+ humanitarian projects that brought clean water and safety to
              communities that needed it most.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-brand-green-50 px-4 py-2 rounded-full">
                <Target className="w-5 h-5 text-brand-green-700" />
                <span className="text-brand-green-800 font-medium text-sm">Mission-Driven</span>
              </div>
              <div className="flex items-center gap-2 bg-brand-earth-100 px-4 py-2 rounded-full">
                <Eye className="w-5 h-5 text-brand-earth-600" />
                <span className="text-brand-earth-700 font-medium text-sm">Future-Focused</span>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-brand-earth-200 mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-green-100 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-brand-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-3">Our Mission</h3>
              <p className="text-brand-stone leading-relaxed">
                To provide durable, high-quality water storage and security fencing solutions that empower
                communities, protect assets, and improve livelihoods across East Africa and beyond.
                We believe access to clean water and safe boundaries is a foundation for progress.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-earth-100 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-brand-earth-600" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-3">Our Vision</h3>
              <p className="text-brand-stone leading-relaxed">
                To be the leading provider of sustainable water and security infrastructure in Africa,
                recognized for innovation, reliability, and positive community impact. We envision a
                continent where every community has access to safe water and secure boundaries.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark">By The Numbers</h3>
          <p className="text-brand-stone mt-2">Our impact across East Africa and beyond</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
