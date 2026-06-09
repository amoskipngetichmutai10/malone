import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { X, Play, ChevronDown, Image as ImageIcon, Film } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  media_type: string;
  url: string;
  thumbnail_url: string | null;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [category, setCategory] = useState<'water_tanks' | 'chainlink_fencing'>('water_tanks');
  const [subTab, setSubTab] = useState<'images' | 'videos'>('images');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchGallery() {
      if (!supabase) return;
      const { data } = await supabase.from('gallery_items').select('*').order('created_at');
      if (data) setItems(data);
    }
    fetchGallery();
  }, []);

  const filtered = items.filter(
    (item) => item.category === category && item.media_type === (subTab === 'images' ? 'image' : 'video')
  );

  const categoryLabel = category === 'water_tanks' ? 'Water Tanks' : 'Chainlink Fencing';

  return (
    <section id="gallery" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-green-700 font-semibold text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mt-3 mb-4">Our Gallery</h2>
          <p className="text-brand-stone max-w-2xl mx-auto">
            Browse our installations across East Africa — from community water projects to industrial security fencing.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white border border-brand-earth-200 rounded-xl px-6 py-3 font-medium text-brand-dark hover:border-brand-green-500 transition-colors min-w-[220px] justify-between"
            >
              <span>{categoryLabel}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-brand-earth-200 rounded-xl shadow-lg overflow-hidden z-20">
                <button
                  onClick={() => { setCategory('water_tanks'); setIsDropdownOpen(false); }}
                  className={`w-full text-left px-6 py-3 hover:bg-brand-green-50 transition-colors ${category === 'water_tanks' ? 'text-brand-green-700 font-semibold bg-brand-green-50' : 'text-brand-dark'}`}
                >
                  Water Tanks
                </button>
                <button
                  onClick={() => { setCategory('chainlink_fencing'); setIsDropdownOpen(false); }}
                  className={`w-full text-left px-6 py-3 hover:bg-brand-green-50 transition-colors ${category === 'chainlink_fencing' ? 'text-brand-green-700 font-semibold bg-brand-green-50' : 'text-brand-dark'}`}
                >
                  Chainlink Fencing
                </button>
              </div>
            )}
          </div>

          <div className="flex bg-white rounded-xl border border-brand-earth-200 p-1">
            <button
              onClick={() => setSubTab('images')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                subTab === 'images' ? 'bg-brand-green-700 text-white' : 'text-brand-dark hover:bg-brand-green-50'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Images
            </button>
            <button
              onClick={() => setSubTab('videos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                subTab === 'videos' ? 'bg-brand-green-700 text-white' : 'text-brand-dark hover:bg-brand-green-50'
              }`}
            >
              <Film className="w-4 h-4" />
              Videos
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.media_type === 'video' && item.thumbnail_url ? item.thumbnail_url : item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.media_type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-brand-green-700/80 rounded-full flex items-center justify-center group-hover:bg-brand-green-700 transition-colors">
                      <Play className="w-7 h-7 text-white ml-1" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-brand-dark text-sm">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-brand-stone">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No {subTab} available for this category.</p>
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.media_type === 'video' ? (
              <video
                src={lightbox.url}
                controls
                autoPlay
                className="w-full rounded-xl"
                poster={lightbox.thumbnail_url || undefined}
              />
            ) : (
              <img
                src={lightbox.url}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            )}
            <p className="text-white text-center mt-4 font-medium">{lightbox.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
