import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20); // 2 seconds total

    const timeout = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#15171E] text-white font-['Outfit']"
    >
      <div className="flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-8xl font-bold uppercase tracking-wider mb-4"
        >
          Welcome
        </motion.h1>
        
        <div className="w-64 h-[1px] bg-gray-800 relative overflow-hidden">
          <motion.div 
             className="absolute top-0 left-0 h-full bg-white"
             style={{ width: `${count}%` }}
          />
        </div>
        
        <p className="mt-4 text-xs font-mono text-gray-400">{count}%</p>
      </div>
    </motion.div>
  );
}
