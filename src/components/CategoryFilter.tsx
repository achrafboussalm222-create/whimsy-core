import { motion } from "framer-motion";
import { Category, categories } from "../lib/products";

interface Props {
  active: Category | "All";
  onChange: (c: Category | "All") => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  const all: (Category | "All")[] = ["All", ...categories];
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {all.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`relative px-5 py-2.5 rounded-full text-sm font-medium border transition-colors duration-300 ${
            active === c ? "text-cream border-olive" : "text-brown/70 border-brown/15 hover:border-olive hover:text-olive"
          }`}
        >
          {active === c && (
            <motion.span
              layoutId="category-pill"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-0 bg-olive rounded-full -z-10"
            />
          )}
          {c}
        </button>
      ))}
    </div>
  );
}
