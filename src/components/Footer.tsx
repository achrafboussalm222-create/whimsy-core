import { Instagram } from "lucide-react";
import { Logo } from "./Brand";
import { igLink } from "../config";

export default function Footer() {
  return (
    <footer className="bg-brown pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        <Logo dark />
        <p className="text-cream/55 text-sm max-w-xs mt-4 mb-8">
          Handmade crochet treasures, stitched with love — one loop at a time.
        </p>

        <div className="flex items-center gap-6 mb-10">
          <a href={igLink} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-gold transition-colors">
            <Instagram size={20} />
          </a>
        </div>

        <div className="w-full border-t border-cream/10 pt-6">
          <p className="text-cream/40 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Whimsy Core. All creations handmade to order — reach us on Instagram.
          </p>
        </div>
      </div>
    </footer>
  );
}
