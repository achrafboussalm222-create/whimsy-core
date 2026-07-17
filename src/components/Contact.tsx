import { Instagram } from "lucide-react";
import Reveal from "./Reveal";
import { StitchDivider } from "./Brand";
import { SITE, igLink } from "../config";

export default function Contact() {
  const cards = [
    { icon: Instagram, title: "Instagram", value: `@${SITE.instagramHandle}`, href: igLink, cta: "Message on Instagram" },
  ];

  return (
    <section id="contact" className="py-28 bg-cream-soft">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-xl mx-auto mb-16">
          <p className="uppercase tracking-[0.3em] text-xs font-medium text-gold mb-4">Get in Touch</p>
          <h2 className="font-display text-4xl sm:text-5xl text-brown">Let's make something for you</h2>
          <StitchDivider />
          <p className="text-brown/65 mt-2">Reach out with a photo, an idea, or just a hello — we'd love to hear from you.</p>
        </Reveal>

        <div className="grid max-w-sm mx-auto gap-7">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal delay={i * 0.1} key={c.title}>
                <div className="bg-cream rounded-2xl p-8 text-center h-full shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <div className="w-14 h-14 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-5">
                    <Icon size={22} className="text-olive" />
                  </div>
                  <h3 className="font-display text-2xl text-brown mb-1">{c.title}</h3>
                  <p className="text-brown/60 text-sm mb-6">{c.value}</p>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-olive text-cream rounded-full px-6 py-3 text-sm font-medium inline-block transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    {c.cta}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
