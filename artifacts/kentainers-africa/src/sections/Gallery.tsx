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

function cloudinaryThumb(videoUrl: string): string {
  return videoUrl
    .replace('/video/upload/', '/video/upload/so_0,w_800,h_600,c_fill/')
    .replace(/\.mp4$/, '.jpg');
}

const STATIC_VIDEOS: GalleryItem[] = [
  {
    id: 'wt1', title: 'Water Tank Installation', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963554/wt1_ehrqxa.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963554/wt1_ehrqxa.mp4'),
  },
  {
    id: 'wt2', title: 'Tank Delivery', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963565/wt2_hrv5ev.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963565/wt2_hrv5ev.mp4'),
  },
  {
    id: 'wt3', title: 'Tank Setup', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963622/wt3_cpf1no.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963622/wt3_cpf1no.mp4'),
  },
  {
    id: 'wt4', title: 'Water Storage Solution', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963546/wt4_zw0nrt.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963546/wt4_zw0nrt.mp4'),
  },
  {
    id: 'wt5', title: 'Tank Installation Process', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963548/wt5_uxp6ow.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963548/wt5_uxp6ow.mp4'),
  },
  {
    id: 'wt6', title: 'Community Water Project', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963546/wt6_d2rlg9.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963546/wt6_d2rlg9.mp4'),
  },
  {
    id: 'wt7', title: 'Large Capacity Tank', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963700/wt7_uzrrow.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963700/wt7_uzrrow.mp4'),
  },
  {
    id: 'wt8', title: 'Tank Commissioning', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963579/wt8_eosqi0.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963579/wt8_eosqi0.mp4'),
  },
  {
    id: 'wt9', title: 'Rural Water Access', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963671/wt9_yc1ecp.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963671/wt9_yc1ecp.mp4'),
  },
  {
    id: 'wt10', title: 'Commercial Tank Project', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963665/wt10_m4uzqn.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963665/wt10_m4uzqn.mp4'),
  },
  {
    id: 'wt11', title: 'Water Tank Overview', category: 'water_tanks', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780963671/wt11_fqere4.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780963671/wt11_fqere4.mp4'),
  },
  {
    id: 'cl1', title: 'Chainlink Installation', category: 'chainlink_fencing', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780967856/cl1_apyb4m.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780967856/cl1_apyb4m.mp4'),
  },
  {
    id: 'cl2', title: 'Security Fencing Project', category: 'chainlink_fencing', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780967773/cl2_u4rtau.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780967773/cl2_u4rtau.mp4'),
  },
  {
    id: 'cl3', title: 'Perimeter Fencing', category: 'chainlink_fencing', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780967720/cl3_rjuu8o.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780967720/cl3_rjuu8o.mp4'),
  },
  {
    id: 'cl4', title: 'Industrial Chainlink', category: 'chainlink_fencing', media_type: 'video',
    url: 'https://res.cloudinary.com/dvru78pi3/video/upload/v1780967735/cl4_ya9t8a.mp4',
    thumbnail_url: cloudinaryThumb('https://res.cloudinary.com/dvru78pi3/video/upload/v1780967735/cl4_ya9t8a.mp4'),
  },
];

const STATIC_IMAGES: GalleryItem[] = [
  {
    id: 'cli1', title: 'Galvanized Chainlink Rolls', category: 'chainlink_fencing', media_type: 'image',
    url: '/chainlink/cl-img1.jpeg', thumbnail_url: '/chainlink/cl-img1.jpeg',
  },
  {
    id: 'cli2', title: 'Heavy Duty Chainlink Roll', category: 'chainlink_fencing', media_type: 'image',
    url: '/chainlink/cl-img2.jpeg', thumbnail_url: '/chainlink/cl-img2.jpeg',
  },
  {
    id: 'cli3', title: 'Hexagonal Wire Mesh', category: 'chainlink_fencing', media_type: 'image',
    url: '/chainlink/cl-img3.jpeg', thumbnail_url: '/chainlink/cl-img3.jpeg',
  },
  {
    id: 'cli4', title: 'Chicken Wire Mesh', category: 'chainlink_fencing', media_type: 'image',
    url: '/chainlink/cl-img4.jpeg', thumbnail_url: '/chainlink/cl-img4.jpeg',
  },
  {
    id: 'cli5', title: 'Close-Knit Security Mesh', category: 'chainlink_fencing', media_type: 'image',
    url: '/chainlink/cl-img5.jpeg', thumbnail_url: '/chainlink/cl-img5.jpeg',
  },
  {
    id: 'cli6', title: 'Standard Chainlink Stock', category: 'chainlink_fencing', media_type: 'image',
    url: '/chainlink/cl-img6.jpeg', thumbnail_url: '/chainlink/cl-img6.jpeg',
  },
  {
    id: 'cli7', title: 'Bulk Chainlink Inventory', category: 'chainlink_fencing', media_type: 'image',
    url: '/chainlink/cl-img7.jpeg', thumbnail_url: '/chainlink/cl-img7.jpeg',
  },
  {
    id: 'cli8', title: 'PVC Coated Coloured Chainlink', category: 'chainlink_fencing', media_type: 'image',
    url: '/chainlink/cl-img8.jpeg', thumbnail_url: '/chainlink/cl-img8.jpeg',
  },
  {
    id: 'cli9', title: 'Kukunet Hexagonal Wire — 30m Roll', category: 'chainlink_fencing', media_type: 'image',
    url: '/chainlink/cl-img9.jpeg', thumbnail_url: '/chainlink/cl-img9.jpeg',
  },
];

export default function Gallery() {
  const [dbItems, setDbItems] = useState<GalleryItem[]>([]);
  const [category, setCategory] = useState<'water_tanks' | 'chainlink_fencing'>('water_tanks');
  const [subTab, setSubTab] = useState<'images' | 'videos'>('videos');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchGallery() {
      if (!supabase) return;
      const { data } = await supabase.from('gallery_items').select('*').order('created_at');
      if (data) setDbItems(data);
    }
    fetchGallery();
  }, []);

  const allItems = [...STATIC_VIDEOS, ...STATIC_IMAGES, ...dbItems];

  const filtered = allItems.filter(
    (item) => item.category === category && item.media_type === (subTab === 'images' ? 'image' : 'video')
  );

  const categoryLabel = category === 'water_tanks' ? 'Water Tanks' : 'Chainlink Fencing';

  const openLightbox = (item: GalleryItem) => {
    const idx = filtered.findIndex((f) => f.id === item.id);
    setLightboxIdx(idx);
    setLightbox(item);
  };

  const navigate = (dir: 1 | -1) => {
    const next = (lightboxIdx + dir + filtered.length) % filtered.length;
    setLightboxIdx(next);
    setLightbox(filtered[next]);
  };

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

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {/* Category dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white border border-brand-earth-200 rounded-xl px-6 py-3 font-medium text-brand-dark hover:border-brand-green-500 transition-colors min-w-[220px] justify-between shadow-sm"
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

          {/* Image / Video tabs */}
          <div className="flex bg-white rounded-xl border border-brand-earth-200 p-1 shadow-sm">
            <button
              onClick={() => setSubTab('images')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                subTab === 'images' ? 'bg-brand-green-700 text-white shadow' : 'text-brand-dark hover:bg-brand-green-50'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Images
              {subTab === 'images' && filtered.length > 0 && (
                <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">{filtered.length}</span>
              )}
            </button>
            <button
              onClick={() => setSubTab('videos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                subTab === 'videos' ? 'bg-brand-green-700 text-white shadow' : 'text-brand-dark hover:bg-brand-green-50'
              }`}
            >
              <Film className="w-4 h-4" />
              Videos
              {subTab === 'videos' && filtered.length > 0 && (
                <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">{filtered.length}</span>
              )}
            </button>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <VideoCard key={item.id} item={item} onClick={() => openLightbox(item)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-brand-stone">
            <div className="w-16 h-16 rounded-2xl bg-brand-earth-100 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 opacity-40" />
            </div>
            <p className="text-lg font-medium">No {subTab} available for this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronDown className="w-5 h-5 rotate-90" />
            </button>
          )}

          {filtered.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronDown className="w-5 h-5 -rotate-90" />
            </button>
          )}

          <div className="max-w-4xl w-full mx-12" onClick={(e) => e.stopPropagation()}>
            {lightbox.media_type === 'video' ? (
              <video
                key={lightbox.id}
                src={lightbox.url}
                controls
                className="w-full rounded-2xl shadow-2xl"
                poster={lightbox.thumbnail_url || undefined}
              />
            ) : (
              <img
                src={lightbox.url}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
            )}
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="text-white font-semibold">{lightbox.title}</p>
              {filtered.length > 1 && (
                <span className="text-white/50 text-sm">{lightboxIdx + 1} / {filtered.length}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function VideoCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const thumb = item.media_type === 'video'
    ? (item.thumbnail_url ?? cloudinaryThumb(item.url))
    : item.url;

  return (
    <button
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left w-full"
    >
      <div className="relative aspect-video overflow-hidden bg-brand-earth-100">
        <img
          src={thumb}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {item.media_type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center group-hover:bg-brand-green-600/80 group-hover:border-brand-green-400 transition-all duration-300 shadow-lg">
              <Play className="w-6 h-6 text-white ml-0.5 drop-shadow" />
            </div>
          </div>
        )}

        {item.media_type === 'video' && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            <Film className="w-3 h-3" />
            Video
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        <p className="font-semibold text-brand-dark text-sm truncate group-hover:text-brand-green-700 transition-colors">
          {item.title}
        </p>
      </div>
    </button>
  );
}
