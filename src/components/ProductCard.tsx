import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Eye, ImageOff } from "lucide-react";
import { Product } from "../lib/products";
import { igLink } from "../config";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -10 }}
      transition={{ layout: { duration: 0.4 } }}
      className="group bg-cream-soft rounded-2xl overflow-hidden shadow-soft h-full flex flex-col transition-shadow duration-500 hover:shadow-lift"
    >
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/5]">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-cream flex items-center justify-center text-brown/25">
            <ImageOff size={28} />
          </div>
        )}
        <span className="absolute top-3 left-3 bg-cream/90 text-brown/80 text-[11px] tracking-wide uppercase px-3 py-1 rounded-full">
          {product.category}
        </span>

        <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/25 transition-colors duration-500 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90 transition-all duration-300 inline-flex items-center gap-2 bg-cream/95 text-brown text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full"
          >
            <Eye size={13} /> Quick View
          </motion.span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display text-2xl text-brown mb-2 hover:text-olive transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-brown/65 leading-relaxed mb-6 flex-1">{product.shortDescription}</p>
        <div className="flex gap-2">
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 text-center border border-olive/30 text-olive rounded-full px-4 py-3 text-sm font-medium transition-all duration-300 hover:bg-olive hover:text-cream"
          >
            View Details
          </Link>
          <a
            href={igLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 text-center bg-gold text-cream-soft rounded-full px-4 py-3 text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Instagram size={14} /> Order
          </a>
        </div>
      </div>
    </motion.div>
  );
}
