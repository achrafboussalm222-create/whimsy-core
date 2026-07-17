export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <img src="/assets/logo.png" alt="Whimsy Core" className="w-9 h-9 rounded-full shrink-0 object-cover" />
      <span className={`font-display text-2xl tracking-wide ${dark ? "text-cream" : "text-brown"}`}>
        Whimsy <span className="text-gold italic">Core</span>
      </span>
    </div>
  );
}

export function StitchDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full flex justify-center py-2 ${flip ? "scale-y-[-1]" : ""}`}>
      <svg width="140" height="18" viewBox="0 0 140 18" className="opacity-55">
        <path
          d="M2 9 C 14 -3, 26 21, 38 9 C 50 -3, 62 21, 74 9 C 86 -3, 98 21, 110 9 C 116 3, 128 3, 138 9"
          fill="none"
          stroke="#B89B5E"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
