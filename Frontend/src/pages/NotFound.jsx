import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, TerminalSquare } from "lucide-react";
import Magnetic from "../components/Magnetic";

// Deterministic pseudo-random so particles don't jump between renders
const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  left: ((i * 37.7) % 100),
  top: ((i * 53.3) % 100),
  size: 1 + ((i * 7) % 3),
  duration: 5 + (i % 6),
  delay: (i % 10) * 0.4,
}));

function Digit({ children, mx, my, depth }) {
  const x = useTransform(mx, [0, 1], [-14 * depth, 14 * depth]);
  const y = useTransform(my, [0, 1], [-10 * depth, 10 * depth]);
  return (
    <motion.span style={{ x, y }} className="inline-block will-change-transform">
      {children}
    </motion.span>
  );
}

function TerminalLine({ text, start, className = "", speed = 45 }) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [start, text, speed]);
  if (!start) return null;
  return <p className={`font-['JetBrains_Mono'] text-xs md:text-sm ${className}`}>{typed}</p>;
}

export default function NotFound() {
  const location = useLocation();
  const [step, setStep] = useState(0);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  // Gold orb trails the cursor across the void
  const orbX = useTransform(smx, [0, 1], ["-10%", "70%"]);
  const orbY = useTransform(smy, [0, 1], ["-10%", "60%"]);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 2400);
    const t3 = setTimeout(() => setStep(3), 4200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  const onMouseMove = (e) => {
    mx.set(e.clientX / window.innerWidth);
    my.set(e.clientY / window.innerHeight);
  };

  const attempted = location.pathname.replace(/^\//, "") || "unknown";

  return (
    <div
      onMouseMove={onMouseMove}
      className="relative w-full min-h-screen bg-[#0C0B09] text-[#F4EFE6] font-['Outfit'] overflow-hidden flex flex-col items-center justify-center px-6"
    >
      {/* Trailing gold orb */}
      <motion.div
        style={{ left: orbX, top: orbY }}
        className="absolute w-[45vw] h-[45vw] rounded-full bg-[#D4AF6A]/[0.07] blur-[120px] pointer-events-none"
      />

      {/* Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:22px_22px] opacity-30 pointer-events-none" />

      {/* Drifting dust */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -26, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          className="absolute rounded-full bg-[#D4AF6A] pointer-events-none"
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Giant 404 with mouse parallax */}
        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Fraunces'] font-semibold leading-none select-none text-[120px] sm:text-[180px] md:text-[240px] lg:text-[300px]"
        >
          <Digit mx={smx} my={smy} depth={1.6}><span className="text-[#F4EFE6]">4</span></Digit>
          <Digit mx={smx} my={smy} depth={3}><span className="stroke-text italic">0</span></Digit>
          <Digit mx={smx} my={smy} depth={1.6}><span className="text-[#F4EFE6]">4</span></Digit>
        </motion.h1>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-md bg-[#12100D]/90 border border-white/[0.07] rounded-lg overflow-hidden text-left backdrop-blur-sm shadow-2xl -mt-4 md:-mt-8"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[#6B655C] font-['JetBrains_Mono']">
              <TerminalSquare size={11} /> suyash@portfolio
            </span>
          </div>
          <div className="px-4 py-4 space-y-2 min-h-[110px]">
            <TerminalLine start={step >= 1} text={`$ cd ~/suyash/${attempted}`} className="text-[#9C958A]" />
            <TerminalLine start={step >= 2} text={`bash: cd: ${attempted}: No such file or directory`} className="text-[#E5734D]" />
            <TerminalLine start={step >= 3} text={`$ cd ~/suyash/home  # let's get you back`} className="text-[#D4AF6A]" speed={35} />
            <span className="inline-block w-2 h-4 bg-[#D4AF6A]/80 animate-blink align-middle" />
          </div>
        </motion.div>

        {/* Back home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10"
        >
          <Magnetic strength={0.3}>
            <Link
              to="/"
              className="group inline-flex items-center gap-3 bg-[#D4AF6A] text-[#0C0B09] px-8 md:px-10 py-4 text-xs font-bold tracking-[0.2em] rounded-sm uppercase hover:bg-[#EBCB8B] transition-colors duration-300"
            >
              <Home size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Take Me Home
            </Link>
          </Magnetic>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-8 text-[11px] tracking-[0.3em] uppercase text-[#6B655C] font-['JetBrains_Mono']"
        >
          Error 404 — Lost in the void
        </motion.p>
      </div>
    </div>
  );
}
