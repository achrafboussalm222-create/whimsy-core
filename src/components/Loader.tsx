import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center gap-4"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.svg
            width="54"
            height="54"
            viewBox="0 0 34 34"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="17" cy="17" r="14.5" fill="none" stroke="#B89B5E" strokeWidth="1.4" strokeDasharray="14 78" strokeLinecap="round" />
            <path
              d="M17 9c3 0 5.4 2.2 5.4 5.1 0 3.6-3.4 5.4-5.4 7.9-2-2.5-5.4-4.3-5.4-7.9C11.6 11.2 14 9 17 9z"
              fill="#5A5C3A"
              opacity="0.85"
            />
          </motion.svg>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display text-lg italic text-brown/60 tracking-wide"
          >
            stitching things together…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
