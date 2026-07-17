import { motion } from "framer-motion";

const ITEMS = [
  "Handmade with Love",
  "Made to Order",
  "Premium Soft Yarn",
  "Packed with Care",
  "One of a Kind",
];

export default function Marquee() {
  const loopItems = [...ITEMS, ...ITEMS];

  return (
    <div className="bg-olive py-4 overflow-hidden select-none">
      <motion.div
        className="flex gap-10 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {loopItems.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-cream/85 font-display italic text-lg tracking-wide">
            {item}
            <span className="text-gold-soft">&#10047;</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
