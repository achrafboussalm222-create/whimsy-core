import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Instagram, ArrowLeft, Check } from "lucide-react";
import ProductGallery from "../components/ProductGallery";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import { useProducts } from "../hooks/useProducts";
import { getRelatedProducts } from "../lib/products";
import { igLink } from "../config";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading } = useProducts();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
        <p className="font-display italic text-brown/50">Loading…</p>
      </div>
    );
  }

  const product = products.find((p) => p.slug === slug);
  if (!product) return <Navigate to="/" replace />;

  const related = getRelatedProducts(products, product);

  return (
    <div className="pt-28 pb-24 bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          to="/#collection"
          className="inline-flex items-center gap-2 text-sm text-brown/60 hover:text-olive transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Collection
        </Link>

        <div className="grid md:grid-cols-2 gap-14">
          <Reveal>
            <ProductGallery images={product.images} alt={product.name} />
          </Reveal>

          <Reveal delay={0.1}>
            <span className="uppercase tracking-[0.3em] text-xs font-medium text-gold">{product.category}</span>
            <h1 className="font-display text-4xl sm:text-5xl text-brown mt-3 mb-5">{product.name}</h1>
            <p className="text-brown/70 leading-relaxed mb-8">{product.description}</p>

            {product.details.length > 0 && (
              <ul className="space-y-3 mb-10">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-brown/70">
                    <Check size={16} className="text-olive mt-0.5 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            )}

            <a
              href={igLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-olive text-cream rounded-full px-8 py-4 font-medium shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <Instagram size={18} /> Contact to Order
            </a>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-28">
            <Reveal className="mb-10">
              <h2 className="font-display text-3xl text-brown">You might also love</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
