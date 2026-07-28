import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import heroConfident from "../assets/hero-confident.png";
import heroConfused from "../assets/hero-confused.png";
import heroSurprised from "../assets/hero-surprised.png";
import SplitText from "../components/SplitText";
import Magnetic from "../components/Magnetic";
import { scrollToId } from "../lib/scrollTo";

const PORTRAITS = [heroConfident, heroConfused, heroSurprised];

// Ambient glow colors behind each transparent portrait cutout
const GLOW_PRIMARY = ["#D4AF6A", "#B87333", "#8A6D3B"];
const GLOW_SECONDARY = ["#5C4520", "#6B3F1D", "#4A3A1E"];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const [active, setActive] = useState(0);

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const idx = percent < 1 / 3 ? 0 : percent < 2 / 3 ? 1 : 2;
    setActive(idx);
  };

  return (
    <div className="w-full min-h-[100dvh] relative overflow-hidden bg-[#0C0B09]">
      {/* Ambient color glow - crossfades per expression, spans the whole hero */}
      <motion.div
        animate={{ backgroundColor: GLOW_PRIMARY[active] }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute -top-32 right-[10%] w-[50%] h-[60%] rounded-full blur-[140px] opacity-[0.13] pointer-events-none"
      />
      <motion.div
        animate={{ backgroundColor: GLOW_SECONDARY[active] }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute -bottom-32 -left-24 w-[45%] h-[55%] rounded-full blur-[140px] opacity-[0.18] pointer-events-none"
      />

      {/* Grain texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:22px_22px] opacity-30 pointer-events-none" />

      {/* Ghost name in background */}
      <div className="absolute bottom-[4%] left-0 w-full overflow-hidden pointer-events-none select-none hidden lg:block">
        <p className="font-['Fraunces'] italic whitespace-nowrap text-[180px] leading-none stroke-ghost opacity-60">
          software developer — software developer —
        </p>
      </div>

      <div className="relative z-10 w-full min-h-[100dvh] px-4 md:px-10">
        <div className="max-w-6xl mx-auto w-full min-h-[100dvh] flex flex-col lg:flex-row items-stretch">
          {/* Text side */}
          <div className="flex-1 flex flex-col justify-center py-24 lg:py-0">
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] md:text-xs tracking-[0.35em] uppercase text-[#D4AF6A] mb-6"
            >
              <span className="inline-block w-8 h-[1px] bg-[#D4AF6A]/60" />
              Hello, I'm
            </motion.p>

            <h1 className="font-['Fraunces'] text-[length:var(--fluid-hero)] leading-[0.98] font-semibold tracking-tight select-none">
              <SplitText delay={0.2} className="text-[#F4EFE6]">Suyash</SplitText>
              <br />
              <SplitText delay={0.45} className="stroke-text italic">Prakash</SplitText>
            </h1>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-['JetBrains_Mono'] text-sm sm:text-base md:text-lg text-[#9C958A] flex items-center gap-1 min-h-[28px] flex-wrap"
            >
              <span className="text-[#6B655C]">$</span>
              <span>whoami</span>
              <span className="mx-2 text-[#6B655C]">→</span>
              <span className="text-[#EBCB8B]">
                <Typewriter text="Software Developer" delay={90} infinite />
              </span>
              <span className="animate-blink w-[8px] h-4 md:h-5 bg-[#D4AF6A]/80 ml-1 inline-block"></span>
            </motion.div>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-md text-[#9C958A] text-sm md:text-base leading-relaxed"
            >
              C++ &amp; MERN developer crafting efficient algorithms and clean,
              expressive interfaces. Currently seeking internship &amp; entry roles.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-5"
            >
              <Magnetic strength={0.25}>
                <button
                  onClick={() => scrollToId("contact")}
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-[#D4AF6A] text-[#0C0B09] px-9 md:px-11 py-4 text-xs font-bold tracking-[0.2em] rounded-sm hover:bg-[#EBCB8B] transition-colors duration-300 uppercase cursor-pointer"
                >
                  Say Hello
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={() => scrollToId("about")}
                  className="w-full sm:w-auto border border-white/15 text-[#F4EFE6] px-9 md:px-11 py-4 text-xs font-bold tracking-[0.2em] rounded-sm hover:border-[#D4AF6A] hover:text-[#D4AF6A] transition-colors duration-300 uppercase cursor-pointer"
                >
                  About Me
                </button>
              </Magnetic>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="hidden lg:flex items-center gap-3 mt-20 text-[#6B655C]"
            >
              <span className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
                <span className="absolute inset-x-0 h-1/2 bg-[#D4AF6A] animate-scroll-cue" />
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            </motion.div>
          </div>

          {/* Portrait side - hover/move to swap expression */}
          <div
            className="relative flex-1 lg:flex-[1.2] min-h-[62dvh] lg:min-h-[100dvh] overflow-visible cursor-pointer select-none"
            onMouseMove={handlePointerMove}
            onMouseLeave={() => setActive(0)}
            data-cursor-label="MOVE"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={PORTRAITS[active]}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                alt="Suyash Prakash portrait"
                className="absolute left-1/2 -translate-x-1/2 bottom-0 h-full w-auto max-w-full lg:max-w-none object-contain object-bottom drop-shadow-[0_0_60px_rgba(212,175,106,0.15)]"
                draggable={false}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Typewriter Component
const Typewriter = ({ text, delay, infinite }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      timeout = setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText('');
      }, 3000); // Wait 3 seconds before restarting
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <span>{currentText}</span>;
};
