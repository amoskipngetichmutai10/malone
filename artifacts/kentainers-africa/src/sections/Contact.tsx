import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2, Globe } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', country: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useScrollReveal(0.1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from('contact_submissions').insert([formData]);
    if (!error) {
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
              {[
                { icon: MapPin, title: 'Visit Us', lines: ['Nairobi, Kenya', 'East Africa HQ'] },
                { icon: Phone, title: 'Call Us', lines: ['+254 700 000 000', '+254 711 111 111'] },
                { icon: Mail, title: 'Email Us', lines: ['info@aquasecure.co.ke', 'sales@aquasecure.co.ke'] },
                { icon: Clock, title: 'Working Hours', lines: ['Mon - Fri: 8AM - 6PM', 'Sat: 9AM - 2PM'] },
              ].map((item) => (
                <div key={item.title} className="bg-brand-cream rounded-2xl p-6 border border-brand-earth-200">
                  <div className="w-12 h-12 rounded-xl bg-brand-green-100 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-brand-green-700" />
                  </div>
                  <h3 className="font-semibold text-brand-dark mb-2">{item.title}</h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-brand-stone text-sm">{line}</p>
                  ))}
                </div>
              ))}
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

            <div className="rounded-2xl overflow-hidden h-72 mt-6 bg-brand-earth-100 border border-brand-earth-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19891906806!2d36.68258735!3d-1.3028611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </div>

          <div className="reveal-right bg-brand-cream rounded-2xl p-8 sm:p-10 border border-brand-earth-200">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-brand-green-700" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Message Sent!</h3>
                <p className="text-brand-stone mb-6">Thank you for reaching out. We will get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-brand-green-700 font-semibold hover:text-brand-green-800"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="+254 700 000 000"
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
                      Send Message
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
