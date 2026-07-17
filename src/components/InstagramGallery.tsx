import { Instagram, Heart } from "lucide-react";
import Reveal from "./Reveal";
import { useProducts } from "../hooks/useProducts";
import { igLink, SITE } from "../config";

const MOCK_LIKES = [128, 94, 211, 76, 153, 68];

export default function InstagramGallery() {
  const { products, loading } = useProducts();
  const tiles = products.slice(0, 6);

  if (!loading && tiles.length === 0) return null;

  return (
    <section id="gallery" className="py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-xl mx-auto mb-14">
          <p className="uppercase tracking-[0.3em] text-xs font-medium text-gold mb-4">Follow Along</p>
          <h2 className="font-display text-4xl sm:text-5xl text-brown mb-3">From our Instagram</h2>
          <p className="text-brown/65">
            @{SITE.instagramHandle} — this gallery is ready to connect to live Instagram posts.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-brown/10 animate-pulse" />
                ))
              : tiles.map((p, i) => {
                  const cover = p.images[1] ?? p.images[0];
                  return (
                    <a
                      key={p.id}
                      href={igLink}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative block aspect-square rounded-xl overflow-hidden shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift bg-cream-soft"
                    >
                      {cover && (
                        <img
                          src={cover}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/0 to-brown/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3">
                        <p className="text-cream text-xs font-medium truncate mb-1">{p.name}</p>
                        <div className="flex items-center gap-3 text-cream/80 text-[11px]">
                          <span className="flex items-center gap-1">
                            <Heart size={11} className="fill-current" /> {MOCK_LIKES[i % MOCK_LIKES.length]}
                          </span>
                          <span className="flex items-center gap-1">
                            <Instagram size={11} /> View
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
          </div>
        </Reveal>

        <Reveal className="text-center mt-12">
          <a
            href={igLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-[1.5px] border-olive text-olive rounded-full px-8 py-3.5 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive hover:text-cream"
          >
            <Instagram size={17} /> View on Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}
