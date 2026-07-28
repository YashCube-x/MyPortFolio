import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const AUTO_ADVANCE_MS = 2000;

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

export default function CertificateCarousel({ items }) {
  const [[index, direction], setSlide] = useState([0, 1]);
  const [isPaused, setIsPaused] = useState(false);

  const count = items.length;

  const goTo = useCallback((next) => {
    setSlide(([current]) => [next, next >= current ? 1 : -1]);
  }, []);

  const goNext = useCallback(() => {
    setSlide(([current, ]) => [(current + 1) % count, 1]);
  }, [count]);

  const goPrev = useCallback(() => {
    setSlide(([current, ]) => [(current - 1 + count) % count, -1]);
  }, [count]);

  // Auto-advance every 2s, paused while the card is hovered
  useEffect(() => {
    if (count < 2 || isPaused) return;
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [count, isPaused, goNext, index]);

  if (count === 0) return null;

  const item = items[index];

  return (
    <div
      className="w-full max-w-[63rem] mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="VIEW"
            className="group block"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Fixed-size rectangle box for the certificate image */}
            <div className="relative w-full h-[30rem] md:h-[39rem] rounded-xl overflow-hidden border border-black/[0.08] bg-white shadow-xl">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain p-9 group-hover:scale-[1.03] transition duration-500"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#B4AC9C] text-base uppercase tracking-widest font-['JetBrains_Mono']">
                  No Preview
                </div>
              )}

              {/* Year chip */}
              {item.year && (
                <span className="absolute top-6 right-6 bg-[#17150F] text-[#D4AF6A] px-5 py-3 rounded-full font-['JetBrains_Mono'] text-base tracking-wider shadow-md">
                  {item.year}
                </span>
              )}

              {/* Hover hint to open */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-end p-7 pointer-events-none">
                <span className="flex items-center gap-2 text-white text-base font-bold uppercase tracking-widest">
                  <ExternalLink size={20} /> View Certificate
                </span>
              </div>
            </div>

            <div className="mt-9 text-center px-2">
              <h3 className="font-['Fraunces'] text-4xl md:text-[45px] font-semibold text-[#17150F] group-hover:text-[#A9832F] transition-colors duration-300">
                {item.title}
              </h3>
              {item.desc && (
                <p className="text-xl md:text-2xl text-[#6F6A60] mt-4 leading-relaxed max-w-2xl mx-auto">{item.desc}</p>
              )}
            </div>
          </motion.a>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {count > 1 && (
        <div className="flex items-center justify-center gap-7 mt-14">
          <button
            onClick={goPrev}
            aria-label="Previous certificate"
            className="w-[72px] h-[72px] rounded-full border border-black/15 flex items-center justify-center text-[#6F6A60] hover:bg-[#17150F] hover:text-[#D4AF6A] hover:border-[#17150F] transition duration-300"
          >
            <ChevronLeft size={30} />
          </button>

          <div className="flex items-center gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to certificate ${i + 1}`}
                className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index ? "w-[42px] bg-[#A9832F]" : "w-3 bg-black/15 hover:bg-black/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next certificate"
            className="w-[72px] h-[72px] rounded-full border border-black/15 flex items-center justify-center text-[#6F6A60] hover:bg-[#17150F] hover:text-[#D4AF6A] hover:border-[#17150F] transition duration-300"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </div>
  );
}
