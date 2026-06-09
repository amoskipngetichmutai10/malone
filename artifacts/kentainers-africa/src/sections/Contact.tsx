import { useState, FormEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const phone = "+254 752 045 374";
  const email = "mbakasmartcollections@gmail.com";
  const waLink = `https://wa.me/254752045374?text=${encodeURIComponent("Hello! I'm interested in your products.")}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (supabase) {
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert([{ name: form.name, email: form.email, phone: form.phone, message: form.message }]);

      if (dbError) {
        setError("Failed to submit. Please try WhatsApp or email instead.");
        return;
      }
      setSubmitted(true);
    } else {
      const waMessage = encodeURIComponent(
        `Hi, I'm ${form.name}. ${form.message} (${form.email}, ${form.phone})`,
      );
      window.open(`https://wa.me/254752045374?text=${waMessage}`, "_blank");
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            Contact Us
          </h2>
          <p className="text-brand-stone-500 max-w-2xl mx-auto">
            Get in touch for a quote or any inquiries
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-green-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-brand-green-700" />
                </div>
                <div>
                  <div className="text-sm text-brand-stone-500">Phone</div>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-brand-dark font-medium hover:text-brand-green-700 transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-green-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-brand-green-700" />
                </div>
                <div>
                  <div className="text-sm text-brand-stone-500">Email</div>
                  <a
                    href={`mailto:${email}`}
                    className="text-brand-dark font-medium hover:text-brand-green-700 transition-colors break-all"
                  >
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-green-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-green-700" />
                </div>
                <div>
                  <div className="text-sm text-brand-stone-500">Location</div>
                  <div className="text-brand-dark font-medium">
                    Nairobi, Kenya
                  </div>
                </div>
              </div>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          <div>
            {submitted ? (
              <div className="bg-brand-green-50 border border-brand-green-200 rounded-xl p-8 text-center">
                <div className="text-brand-green-700 text-xl font-semibold mb-2">
                  Thank you!
                </div>
                <p className="text-brand-stone-600">
                  We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-stone-300 focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-stone-300 focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-stone-300 focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-stone-300 focus:border-brand-green-500 focus:ring-1 focus:ring-brand-green-500 outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-green-700 hover:bg-brand-green-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
