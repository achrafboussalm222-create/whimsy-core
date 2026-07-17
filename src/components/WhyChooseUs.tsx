import { Heart, Sparkles, Gift, Star } from "lucide-react";
import Reveal from "./Reveal";

const REASONS = [
  { icon: Heart, title: "Handmade with love", text: "Every stitch is made by hand, never mass-produced or rushed." },
  { icon: Sparkles, title: "High-quality yarn", text: "We use soft, durable yarns chosen for comfort and longevity." },
  { icon: Gift, title: "Perfect gift ideas", text: "Thoughtful pieces for birthdays, anniversaries, and quiet everyday joys." },
  { icon: Star, title: "Crafted with detail", text: "Attention to every loop, petal, and seam, down to the finishing touch." },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-28 bg-olive relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal className="text-center max-w-xl mx-auto mb-16">
          <p className="uppercase tracking-[0.3em] text-xs font-medium text-gold-soft mb-4">Why Whimsy Core</p>
          <h2 className="font-display text-4xl sm:text-5xl text-cream">Why choose us</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal delay={i * 0.1} key={r.title}>
                <div className="bg-cream/[0.06] border border-cream/15 rounded-2xl p-8 h-full text-center transition-all duration-500 hover:-translate-y-2 hover:bg-cream/10">
                  <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-5">
                    <Icon size={24} className="text-gold-soft" />
                  </div>
                  <h3 className="font-display text-xl text-cream mb-2">{r.title}</h3>
                  <p className="text-cream/65 text-sm leading-relaxed">{r.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
