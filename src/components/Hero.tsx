import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";

const headingWords = ["Handmade", "Crochet", "Treasures"];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const word = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="home" className="relative hero-bg min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center w-full">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.3em] text-xs font-medium text-gold mb-6"
          >
            Stitched by hand &middot; Made with love
          </motion.p>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-brown mb-6"
          >
            <span className="block overflow-hidden">
              <motion.span variants={word} className="inline-block">
                {headingWords[0]}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={word} className="inline-block italic text-olive mr-3">
                {headingWords[1]}
              </motion.span>
              <motion.span variants={word} className="inline-block">
                {headingWords[2]}
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-brown/70 text-lg max-w-md mb-10 leading-relaxed"
          >
            Beautiful handcrafted crochet creations made with love — every stitch shaped by
            hand, one gentle loop at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              href="#collection"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 bg-olive text-cream rounded-full px-8 py-4 font-medium shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              Shop Collection <ArrowRight size={17} />
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 border-[1.5px] border-olive text-olive rounded-full px-8 py-4 font-medium transition-colors duration-300 hover:bg-olive hover:text-cream"
            >
              Contact
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <HeroBlob />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brown/40 text-xs tracking-widest uppercase flex flex-col items-center gap-2"
      >
        scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6 bg-brown/30"
        />
      </motion.div>
    </section>
  );
}

/** Illustration gently follows the cursor for a subtle, alive feel. */
function HeroBlob() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 14 });
  const springY = useSpring(my, { stiffness: 60, damping: 14 });
  const rotateX = useTransform(springY, [-40, 40], [8, -8]);
  const rotateY = useTransform(springX, [-40, 40], [-8, 8]);

  const handleMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 80);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 80);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX, rotateY, x: springX, y: springY, transformPerspective: 800 }}
      animate={{ y: [0, -18, 0] }}
      transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
    >
      <svg viewBox="0 0 420 420" className="w-full max-w-md mx-auto drop-shadow-xl">
        <defs>
          <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D9C79A" />
            <stop offset="100%" stopColor="#5A5C3A" />
          </linearGradient>
        </defs>
        <path
          d="M210,36 C300,22 388,96 392,196 C396,296 320,388 214,392 C108,396 26,320 24,212 C22,104 120,50 210,36 Z"
          fill="url(#heroGrad)"
          opacity="0.16"
        />
        <g fill="none" stroke="#5A5C3A" strokeWidth="1.4" opacity="0.9">
          <circle cx="210" cy="210" r="120" strokeDasharray="4 8" />
          <circle cx="210" cy="210" r="86" strokeDasharray="2 7" />
        </g>
        {[
          [210, 150, 34, "#B89B5E"],
          [150, 230, 26, "#5A5C3A"],
          [268, 232, 26, "#5A5C3A"],
          [210, 270, 22, "#D9C79A"],
        ].map(([cx, cy, r, fill]: any, i) => (
          <g key={i}>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse key={deg} cx={cx} cy={cy} rx={r * 0.42} ry={r * 0.78} fill={fill} opacity="0.85" transform={`rotate(${deg} ${cx} ${cy})`} />
            ))}
            <circle cx={cx} cy={cy} r={r * 0.28} fill="#2E261F" opacity="0.7" />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
