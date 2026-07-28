import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Dot + trailing ring cursor. Only mounts on fine pointers (mouse/trackpad).
// Elements can opt into a label via data-cursor-label="OPEN".
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 25, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target.closest("a, button, [data-cursor-label]");
      setHovering(!!target);
      setLabel(target?.dataset?.cursorLabel || "");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot — follows exactly */}
      <motion.div
        style={{ x, y }}
        className="fixed top-0 left-0 z-[10001] pointer-events-none"
      >
        <motion.div
          animate={{
            scale: hovering ? 0 : 1,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[#D4AF6A]"
        />
      </motion.div>

      {/* Ring — springs behind, morphs on hover */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
      >
        <motion.div
          animate={{
            scale: hovering ? (label ? 2.6 : 1.6) : 1,
            opacity: visible ? 1 : 0,
            backgroundColor: hovering ? "rgba(212,175,106,0.12)" : "rgba(212,175,106,0)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border border-[#D4AF6A]/50 flex items-center justify-center backdrop-blur-[1px]"
        >
          {label && (
            <span className="text-[5px] font-bold tracking-[0.2em] uppercase text-[#EBCB8B] font-['JetBrains_Mono']">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
