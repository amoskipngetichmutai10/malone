import { useState, useEffect } from 'react';
import { Menu, X, Droplets } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Partners', href: '#partners' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isScrolled ? 'bg-brand-green-700 text-white' : 'bg-white/20 text-white backdrop-blur-sm'}`}>
              <Droplets className="w-6 h-6" />
            </div>
            <span className={`font-bold text-xl hidden sm:block ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>
              Aqua<span className="text-brand-green-600">Secure</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`text-sm font-medium transition-colors hover:text-brand-green-600 ${isScrolled ? 'text-brand-dark' : 'text-white/90'}`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-brand-green-700 hover:bg-brand-green-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-lg shadow-brand-green-700/25"
            >
              Get a Quote
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 ${isScrolled ? 'text-brand-dark' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="block px-4 py-3 text-brand-dark hover:bg-brand-green-50 hover:text-brand-green-700 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t">
              <button
                onClick={() => scrollTo('#contact')}
                className="block w-full text-center bg-brand-green-700 text-white px-5 py-3 rounded-full font-semibold"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
