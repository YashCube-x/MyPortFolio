import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MIN_VISIBLE_MS = 900;
const NAME = "SUYASH";

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let finished = false;

    // Creep the counter up while we wait for the real page load, so it never
    // looks stuck, but never let it reach 100 until loading is actually done.
    const interval = setInterval(() => {
      setCount((prev) => (prev < 90 ? prev + 1 : prev));
    }, 25);

    const finish = () => {
      if (finished) return;
      finished = true;
      clearInterval(interval);
      setCount(100);

      const elapsed = performance.now() - start;
      const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);
      setTimeout(onComplete, remaining + 350);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", finish);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] bg-[#0C0B09] text-[#F4EFE6] font-['Outfit'] overflow-hidden"
    >
      {/* Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:22px_22px] opacity-40 pointer-events-none" />

      {/* Centered name reveal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-['JetBrains_Mono'] text-[10px] md:text-xs tracking-[0.5em] text-[#D4AF6A] mb-6 uppercase">
          Portfolio
        </p>
        <h1 className="font-['Fraunces'] font-semibold text-6xl md:text-8xl lg:text-9xl tracking-tight flex overflow-hidden">
          {NAME.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "115%", rotate: 5 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`inline-block will-change-transform ${i >= 2 && i <= 3 ? "text-[#D4AF6A] italic" : ""}`}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <div className="w-56 md:w-72 h-[1px] bg-white/10 relative overflow-hidden mt-10">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#A9832F] to-[#EBCB8B]"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>

      {/* Big ghost counter, bottom-right */}
      <div className="absolute bottom-6 right-8 md:bottom-10 md:right-14 font-['Fraunces'] italic text-7xl md:text-9xl text-transparent select-none" style={{ WebkitTextStroke: "1px rgba(212,175,106,0.35)" }}>
        {count}
      </div>

      <p className="absolute bottom-8 left-8 md:left-14 font-['JetBrains_Mono'] text-[10px] tracking-[0.4em] text-[#6B655C] uppercase">
        Loading Experience
      </p>
    </motion.div>
  );
}
