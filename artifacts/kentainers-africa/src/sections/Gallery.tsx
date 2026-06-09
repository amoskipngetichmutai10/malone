import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

const videos = [
  "https://res.cloudinary.com/demo/video/upload/w_800,h_450,c_fill,q_auto/factory-tour",
  "https://res.cloudinary.com/demo/video/upload/w_800,h_450,c_fill,q_auto/installation-process",
];

const images = [
  { src: "/chainlink/cl-img1.jpeg", alt: "Chainlink fence installation" },
  { src: "/chainlink/cl-img2.jpeg", alt: "Water tank delivery" },
  { src: "/chainlink/cl-img3.jpeg", alt: "Tank installation" },
  { src: "/chainlink/cl-img4.jpeg", alt: "Fencing project" },
  { src: "/chainlink/cl-img5.jpeg", alt: "PVC coated chainlink" },
  { src: "/chainlink/cl-img6.jpeg", alt: "Large water tank" },
];

export default function Gallery() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allItems = [
    ...videos.map((v, i) => ({ type: "video" as const, src: v, index: i })),
    ...images.map((img, i) => ({
      type: "image" as const,
      src: img.src,
      alt: img.alt,
      index: i + videos.length,
    })),
  ];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((p) =>
      p !== null ? (p - 1 + allItems.length) % allItems.length : null,
    );
  const next = () =>
    setLightboxIndex((p) =>
      p !== null ? (p + 1) % allItems.length : null,
    );

  return (
    <section id="gallery" ref={ref} className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            Gallery
          </h2>
          <p className="text-brand-stone-500 max-w-2xl mx-auto">
            See our products and projects in action
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <button
              key={`video-${i}`}
              onClick={() => openLightbox(i)}
              className="relative aspect-video bg-brand-stone-200 rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/30 group-hover:bg-brand-dark/50 transition-colors">
                <Play className="w-12 h-12 text-white" />
              </div>
            </button>
          ))}
          {images.map((img, i) => (
            <button
              key={`img-${i}`}
              onClick={() => openLightbox(i + videos.length)}
              className="relative aspect-square bg-brand-stone-200 rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl w-full px-4">
            {allItems[lightboxIndex]?.type === "video" ? (
              <div className="aspect-video bg-brand-stone-800 rounded-xl flex items-center justify-center">
                <Play className="w-16 h-16 text-white/50" />
              </div>
            ) : (
              <img
                src={allItems[lightboxIndex]?.src}
                alt={allItems[lightboxIndex]?.alt || "Gallery image"}
                className="w-full rounded-xl"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
