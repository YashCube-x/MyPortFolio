import { Reveal } from "../components/Reveal";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaCloud, FaCrown } from "react-icons/fa";

export default function Home() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#15171E]">
      {/* Texture background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

      {/* Decorative Elements - Shining White */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-32 flex gap-4"
      >
         <span className="text-white text-xl font-light drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">x</span>
         <span className="text-white text-3xl font-light mt-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">x</span>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0], rotate: 12 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-1/4"
      >
        <svg width="40" height="40" viewBox="0 0 100 100" className="stroke-white fill-none drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            <path d="M20 20 L50 80 L80 20" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Extra Floating Elements */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-10"
      >
         <span className="text-white text-2xl font-light drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">+</span>
      </motion.div>

       <motion.div 
        animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20"
      >
         <span className="text-white text-4xl font-light drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">.</span>
      </motion.div>

      {/* Cloud Icon */}
      <motion.div 
        animate={{ y: [0, 15, 0], x: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 opacity-80"
      >
         <FaCloud className="text-white text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      </motion.div>

      {/* Crown Icon (King Throne) */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/4 opacity-80"
      >
         <FaCrown className="text-white text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      </motion.div>


      <div className="relative text-center z-10 px-4">
        <Reveal>
            <p className="tracking-[8px] text-sm font-semibold text-gray-400 mb-4 uppercase">Hello I'm</p>

            <h1 className="text-[80px] md:text-[110px] leading-[0.9] font-bold tracking-tight select-none">
            <span className="text-white">Suyash </span>
            <span className="stroke-text">Prakash</span>
            </h1>

            <div className="mt-8 text-2xl md:text-3xl text-gray-200 font-light flex items-center justify-center gap-1 min-h-[40px]">
                <span>I am a</span>
                <span className="font-semibold text-white ml-2 drop-shadow-md">
                    <Typewriter text="Software Developer" delay={100} infinite />
                </span>
                <span className="animate-blink w-[2px] h-8 bg-white/80 ml-1 inline-block"></span>
            </div>

            <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6">
            <button 
                onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                className="bg-white text-black px-12 py-4 text-xs font-bold tracking-widest rounded-sm hover:scale-105 active:scale-95 transition-all duration-300 uppercase cursor-pointer">
                Say Hello
            </button>
            <button 
                onClick={scrollToAbout} 
                className="border border-gray-600 text-white px-12 py-4 text-xs font-bold tracking-widest rounded-sm hover:border-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 uppercase cursor-pointer">
                About Me
            </button>
            </div>
        </Reveal>
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
      // Optional: Reset to loop, or just stay finished. 
      // User image shows "Software Developer_" implying mostly static typing or simple loop.
      // Let's hold for a bit then reset if we want a loop, but strictly "typing animation" usually means typing ONCE or loop.
      // I'll make it type once and hold, as that's less distracting, OR a slow loop.
      // Let's just type once for now to be safe, unless requested to loop. 
      // Actually, typically portfolios loop. Let's add a reset.
      timeout = setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText('');
      }, 3000); // Wait 3 seconds before restarting
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <span>{currentText}</span>;
};
