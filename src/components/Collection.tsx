import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { StitchDivider } from "./Brand";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Category } from "../lib/products";
import { useProducts } from "../hooks/useProducts";

export default function Collection() {
  const { products, loading, error } = useProducts();
  const [category, setCategory] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  return (
    <section id="collection" className="py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-xl mx-auto mb-12">
          <p className="uppercase tracking-[0.3em] text-xs font-medium text-gold mb-4">The Collection</p>
          <h2 className="font-display text-4xl sm:text-5xl text-brown">Crocheted with intention</h2>
          <StitchDivider />
          <p className="text-brown/65 mt-2">Every piece below is made to order — no two are ever quite the same.</p>
        </Reveal>

        <Reveal className="flex flex-col gap-5 mb-14" delay={0.1}>
          <SearchBar value={query} onChange={setQuery} />
          <CategoryFilter active={category} onChange={setCategory} />
          {!loading && (
            <motion.p
              key={filtered.length}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xs uppercase tracking-widest text-brown/40"
            >
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} found
            </motion.p>
          )}
        </Reveal>

        {error && (
          <p className="text-center text-red-700/70 mb-8 text-sm">
            {error} — make sure your Supabase project is connected (see README).
          </p>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px]">
              <AnimatePresence mode="popLayout">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && !error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-brown/50 mt-16 font-display text-2xl italic"
              >
                No pieces match just yet — try another search or category.
              </motion.p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
