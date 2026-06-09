import { Droplets, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-brand-dark text-brand-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand-green-700 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Aqua<span className="text-brand-green-400">Secure</span>
              </span>
            </div>
            <p className="text-brand-earth-300 text-sm leading-relaxed mb-6">
              East Africa's trusted provider of water tanks and chainlink fencing solutions. Serving 14 nations for over 21 years.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-brand-green-700 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Partners', 'Gallery', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-brand-earth-300 hover:text-brand-green-400 text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              {['Water Tanks', 'Chainlink Fencing', 'Tank Accessories', 'Fence Posts', 'Installation Services', 'Maintenance'].map((item) => (
                <li key={item}>
                  <a href="#gallery" className="text-brand-earth-300 hover:text-brand-green-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-green-500 shrink-0 mt-0.5" />
                <span className="text-brand-earth-300 text-sm">Nairobi, Kenya, East Africa</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-green-500 shrink-0" />
                <span className="text-brand-earth-300 text-sm">+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-green-500 shrink-0" />
                <span className="text-brand-earth-300 text-sm">info@aquasecure.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-earth-400 text-sm">
            &copy; {new Date().getFullYear()} AquaSecure. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-brand-green-700 hover:bg-brand-green-600 flex items-center justify-center transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
}
