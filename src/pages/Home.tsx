import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Collection from "../components/Collection";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import Contact from "../components/Contact";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // wait a tick for the page to render before scrolling
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return () => clearTimeout(t);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Marquee />
      <Collection />
      <About />
      <WhyChooseUs />
      <Contact />
    </>
  );
}
