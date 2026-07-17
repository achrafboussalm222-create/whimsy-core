import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Instagram } from "lucide-react";
import { Logo } from "./Brand";
import { igLink } from "../config";

const LINKS: [string, string][] = [
  ["Home", "home"],
  ["Collection", "collection"],
  ["About", "about"],
  ["Why Us", "why-us"],
  ["Contact", "contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section is currently in view (home page only).
  useEffect(() => {
    if (location.pathname !== "/") return;
    const sections = LINKS.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const goToSection = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur bg-cream/90 shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => goToSection("home")} aria-label="Whimsy Core home">
          <Logo />
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(([label, id]) => {
            const isActive = location.pathname === "/" && active === id;
            return (
              <button
                key={id}
                onClick={() => goToSection(id)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-brown" : "text-brown/70 hover:text-brown"
                }`}
              >
                <span className="relative z-10">{label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 bg-gold/20 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <a
          href={igLink}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-olive text-cream rounded-full px-5 py-2.5 text-sm font-medium shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
        >
          <Instagram size={16} /> Message Us
        </a>

        <button className="md:hidden text-brown" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream-soft border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
          {LINKS.map(([label, id]) => (
            <button key={id} onClick={() => goToSection(id)} className="text-left font-medium text-brown/85 text-base">
              {label}
            </button>
          ))}
          <a
            href={igLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-olive text-cream rounded-full px-5 py-3 text-sm font-medium mt-2"
          >
            <Instagram size={16} /> Message Us
          </a>
        </div>
      )}
    </header>
  );
}
