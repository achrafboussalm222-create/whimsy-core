import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative max-w-md mx-auto w-full">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search a piece — e.g. tulip, bunny, keychain…"
        className="w-full bg-cream-soft border border-brown/10 rounded-full pl-11 pr-10 py-3.5 text-sm placeholder:text-brown/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-brown/40 hover:text-brown transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
