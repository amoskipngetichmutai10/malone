import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Phone, Mail, Clock, Send, CheckCircle, Loader2, Globe, AlertCircle } from 'lucide-react';

const PHONE = '+254 752 045 374';
const EMAIL = 'mbakasmartcollections@gmail.com';
const WA_NUMBER = '254752045374';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useScrollReveal(0.1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!supabase) {
      const waText = encodeURIComponent(
        `Hello Kentainers East Africa!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCountry: ${formData.country}\n\nMessage:\n${formData.message}`
      );
      window.open(`https://wa.me/${WA_NUMBER}?text=${waText}`, '_blank');
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', country: '', message: '' });
      return;
    }

    const { error: dbError } = await supabase.from('contact_submissions').insert([formData]);

    if (dbError) {
      setError('Something went wrong. Please reach us directly via WhatsApp or email below.');
    } else {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', country: '', message: '' });
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-green-700 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mt-3 mb-4">Get In Touch</h2>
          <p className="text-brand-stone">
            Ready to secure your water supply or protect your property? Reach out for a free consultation and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="reveal-left">
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-brand-cream rounded-2xl p-6 border border-brand-earth-200">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="#25D366" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">WhatsApp</h3>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-stone text-sm hover:text-[#25D366] transition-colors"
                >
                  {PHONE}
                </a>
              </div>

              <div className="bg-brand-cream rounded-2xl p-6 border border-brand-earth-200">
                <div className="w-12 h-12 rounded-xl bg-brand-green-100 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-brand-green-700" />
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">Call Us</h3>
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-brand-stone text-sm hover:text-brand-green-700 transition-colors">
                  {PHONE}
                </a>
              </div>

              <div className="bg-brand-cream rounded-2xl p-6 border border-brand-earth-200">
                <div className="w-12 h-12 rounded-xl bg-brand-green-100 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-brand-green-700" />
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">Email Us</h3>
                <a href={`mailto:${EMAIL}`} className="text-brand-stone text-sm hover:text-brand-green-700 transition-colors break-all">
                  {EMAIL}
                </a>
              </div>

              <div className="bg-brand-cream rounded-2xl p-6 border border-brand-earth-200">
                <div className="w-12 h-12 rounded-xl bg-brand-green-100 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-brand-green-700" />
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">Working Hours</h3>
                <p className="text-brand-stone text-sm">Mon - Fri: 8AM - 6PM</p>
                <p className="text-brand-stone text-sm">Sat: 9AM - 2PM</p>
              </div>
            </div>

            <div className="bg-brand-green-50 rounded-2xl p-6 border border-brand-green-200">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-brand-green-700" />
                <h3 className="font-semibold text-brand-dark">Operating Across East Africa</h3>
              </div>
              <p className="text-brand-stone text-sm">
                We deliver to Kenya, Tanzania, Uganda, Rwanda, Burundi, South Sudan, Ethiopia, Somalia,
                DRC, Malawi, Zambia, Zimbabwe, Mozambique, and Madagascar.
              </p>
            </div>
          </div>

          <div className="reveal-right bg-brand-cream rounded-2xl p-8 sm:p-10 border border-brand-earth-200">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-brand-green-700" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Message Sent!</h3>
                <p className="text-brand-stone mb-6">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setError(null); }}
                  className="text-brand-green-700 font-semibold hover:text-brand-green-800"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                      <div className="flex gap-4 mt-2">
                        <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-[#25D366] text-sm font-semibold hover:underline">
                          WhatsApp
                        </a>
                        <a href={`mailto:${EMAIL}`} className="text-brand-green-700 text-sm font-semibold hover:underline">
                          Email
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {!supabase && (
                  <div className="flex items-start gap-3 bg-brand-green-50 border border-brand-green-200 rounded-xl p-4">
                    <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5 shrink-0 mt-0.5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <p className="text-brand-green-800 text-sm">
                      Submitting this form will open <strong>WhatsApp</strong> with your message pre-filled — the fastest way to reach us!
                    </p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-earth-200 focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-200 outline-none transition-all bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-earth-200 focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-200 outline-none transition-all bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-earth-200 focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-200 outline-none transition-all bg-white"
                      placeholder="+254 752 045 374"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-earth-200 focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-200 outline-none transition-all bg-white"
                      placeholder="Kenya"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-earth-200 focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-200 outline-none transition-all bg-white resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-green-700 hover:bg-brand-green-800 disabled:bg-brand-green-400 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-brand-green-700/25"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {supabase ? 'Send Message' : 'Send via WhatsApp'}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
