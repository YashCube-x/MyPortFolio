import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import SocialIcons from "./components/SocialIcons";
import Preloader from "./components/Preloader";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex font-['Outfit'] bg-[#15171E] text-white">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Fixed Sidebar */}
      <Navbar />

      {/* Main Content - Native Scroll */}
      <main className="flex-1 lg:ml-[280px] pt-16 lg:pt-0">
        
        {/* Sections */}
        <section id="home" className="min-h-screen w-full snap-start">
            <Home />
        </section>

        <section id="about" className="min-h-screen snap-start w-full">
            <About />
        </section>

        <section id="works" className="min-h-screen snap-start w-full">
             {/* Works has its own internal padding/layout, we just wrap it */}
            <Works />
        </section>

        <section id="service" className="min-h-screen snap-start w-full">
            <Services />
        </section>

        <section id="contact" className="min-h-screen snap-start w-full">
            <Contact />
        </section>

        <section id="blog" className="min-h-screen snap-start w-full">
            <Blog />
        </section>

      </main>

      {/* Fixed Social Icons */}
      <SocialIcons />
    </div>
  );
}
