import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Letter-level staggered reveal. Words stay intact so lines wrap naturally.
export default function SplitText({ children, className = "", delay = 0, stagger = 0.025 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const text = String(children);
  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text} role="text">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden align-bottom whitespace-pre" aria-hidden="true">
          {(word + (wi < words.length - 1 ? " " : "")).split("").map((char, ci) => {
            const d = delay + letterIndex++ * stagger;
            return (
              <motion.span
                key={ci}
                className="inline-block will-change-transform"
                initial={{ y: "115%", rotate: 4, opacity: 0 }}
                animate={inView ? { y: "0%", rotate: 0, opacity: 1 } : {}}
                transition={{ duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
