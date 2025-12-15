import { FaLinkedinIn, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

export default function SocialIcons() {
  const { scrollY } = useScroll();
  const [isHoveringEdge, setIsHoveringEdge] = useState(false);
  const [isOnHome, setIsOnHome] = useState(true);

  // Logic: Visible always on Home (scrollY < threshold), OR when hovering right edge
  useMotionValueEvent(scrollY, "change", (latest) => {
      const homeThreshold = window.innerHeight * 0.9; // 90% of viewport
      setIsOnHome(latest < homeThreshold);
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
        const threshold = window.innerWidth - 100; // 100px from right edge
        if (e.clientX > threshold) {
            setIsHoveringEdge(true);
        } else {
            setIsHoveringEdge(false);
        }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Visible if on Home OR Hovering Edge
  const shouldShow = isOnHome || isHoveringEdge;

  return (
    <AnimatePresence>
        {shouldShow && (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50"
            >
              <Icon href="https://www.linkedin.com/in/yashcube07/"><FaLinkedinIn /></Icon>
              <Icon href="https://www.instagram.com/itz__me__suyash_?igsh=MWIxbHhsN2N1d3d1eA=="><FaInstagram /></Icon>
              <Icon href="mailto:yashcube07@gmail.com"><FaEnvelope /></Icon>
            </motion.div>
        )}
    </AnimatePresence>
  );
}

function Icon({ children, href }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-12 h-12 border border-gray-700 rounded-sm flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer text-sm bg-[#131313] shadow-xl"
    >
      {children}
    </a>
  );
}
