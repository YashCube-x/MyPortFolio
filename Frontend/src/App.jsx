import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import SocialIcons from "./components/SocialIcons";
import Preloader from "./components/Preloader";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { trackVisit } from "./lib/analytics";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <div className="font-['Outfit'] bg-[#0C0B09] text-[#F4EFE6]">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Scroll progress hairline */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#A9832F] via-[#D4AF6A] to-[#EBCB8B] origin-left z-[60]"
      />

      {/* Fixed Top Navbar */}
      <Navbar />

      {/* Main Content - Native Scroll */}
      <main className="pt-16 lg:pt-20">

        {/* Sections */}
        <section id="home" className="min-h-screen w-full">
            <Home />
        </section>

        <section id="about" className="min-h-screen w-full">
            <About />
        </section>

        <section id="works" className="min-h-screen w-full">
            <Works />
        </section>

        <section id="service" className="min-h-screen w-full">
            <Services />
        </section>

        <section id="contact" className="min-h-screen w-full">
            <Contact />
        </section>

        <section id="blog" className="min-h-screen w-full">
            <Blog />
        </section>

      </main>

      {/* Fixed Social Icons */}
      <SocialIcons />
    </div>
  );
}
