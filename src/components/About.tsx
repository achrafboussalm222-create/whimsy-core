import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-28 bg-cream-soft overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <Reveal className="order-2 md:order-1">
          <p className="uppercase tracking-[0.3em] text-xs font-medium text-gold mb-4">Our Story</p>
          <h2 className="font-display text-4xl sm:text-5xl text-brown mb-6 leading-tight">
            Every creation, <span className="italic text-olive">handmade with care</span>
          </h2>
          <p className="text-brown/70 leading-relaxed mb-5">
            At Whimsy Core, nothing is mass-produced. Each piece begins as a single strand of yarn
            and takes shape slowly, loop by loop, in someone's hands — not a machine.
          </p>
          <p className="text-brown/70 leading-relaxed">
            We choose soft, high-quality yarns and take our time with every detail, because a
            handmade gift should feel like one. The small imperfections are part of the charm —
            proof that something was made just for you.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="order-1 md:order-2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto max-w-sm aspect-square rounded-full bg-cream flex items-center justify-center shadow-inner"
          >
            <svg viewBox="0 0 220 220" className="w-2/3 h-2/3">
              <circle cx="110" cy="110" r="100" fill="none" stroke="#B89B5E" strokeWidth="1" strokeDasharray="2 8" opacity="0.6" />
              <path
                d="M60 100c0-30 22-52 50-52s50 22 50 52-22 60-50 78c-28-18-50-48-50-78z"
                fill="#5A5C3A"
                opacity="0.85"
              />
              <path d="M85 96c8-10 18-14 25-14s17 4 25 14" fill="none" stroke="#F7F2E8" strokeWidth="2" opacity="0.5" />
            </svg>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
