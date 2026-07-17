import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ImageOff } from "lucide-react";

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const go = (delta: number) => {
    setDirection(delta);
    setActive((a) => (a + delta + images.length) % images.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, active]);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/5] rounded-2xl bg-cream-soft shadow-soft flex flex-col items-center justify-center gap-3 text-brown/30">
        <ImageOff size={32} />
        <p className="text-sm">No photos yet</p>
      </div>
    );
  }

  return (
    <div>
      {/* Main image / carousel */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream-soft shadow-soft group">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={active}
            src={images[active]}
            alt={`${alt} — image ${active + 1}`}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          />
        </AnimatePresence>

        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 bg-cream/90 rounded-full p-2.5 text-brown/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Open full-screen view"
        >
          <ZoomIn size={18} />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-cream/85 hover:bg-cream rounded-full p-2 text-brown transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-cream/85 hover:bg-cream rounded-full p-2 text-brown transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto thin-scrollbar pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => {
                setDirection(i > active ? 1 : -1);
                setActive(i);
              }}
              className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                active === i ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-brown/95 flex items-center justify-center p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-cream/80 hover:text-cream transition-colors"
              aria-label="Close full-screen view"
            >
              <X size={30} />
            </button>

            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-cream/80 hover:text-cream transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={34} />
              </button>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={active}
                src={images[active]}
                alt={`${alt} — full view`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              />
            </AnimatePresence>

            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-cream/80 hover:text-cream transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={34} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
