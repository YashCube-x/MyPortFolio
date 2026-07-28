import { Mail } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaGithub, FaFacebookF } from "react-icons/fa6";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import Magnetic from "./Magnetic";
import api from "../lib/api";

export default function SocialIcons() {
  const { scrollY } = useScroll();
  const [isHoveringEdge, setIsHoveringEdge] = useState(false);
  const [isOnHome, setIsOnHome] = useState(true);
  const [settings, setSettings] = useState({ email: "", social: {} });

  useEffect(() => {
    api.get("/settings").then((res) => setSettings(res.data.data));
  }, []);

  // Logic: Visible always on Home (scrollY < threshold), OR when hovering right edge
  useMotionValueEvent(scrollY, "change", (latest) => {
    const homeThreshold = window.innerHeight * 0.9; // 90% of viewport
    setIsOnHome(latest < homeThreshold);
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const threshold = window.innerWidth - 100; // 100px from right edge
      setIsHoveringEdge(e.clientX > threshold);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const shouldShow = isOnHome || isHoveringEdge;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-50"
        >
          <span className="w-[1px] h-10 bg-gradient-to-b from-transparent to-[#D4AF6A]/40" />
          {settings.social?.github && (
            <Icon href={settings.social.github} label="GitHub"><FaGithub size={15} /></Icon>
          )}
          {settings.social?.linkedin && (
            <Icon href={settings.social.linkedin} label="LinkedIn"><FaLinkedinIn size={15} /></Icon>
          )}
          {settings.social?.instagram && (
            <Icon href={settings.social.instagram} label="Instagram"><FaInstagram size={15} /></Icon>
          )}
          {settings.social?.facebook && (
            <Icon href={settings.social.facebook} label="Facebook"><FaFacebookF size={15} /></Icon>
          )}
          {settings.email && (
            <Icon href={`mailto:${settings.email}`} label="Email"><Mail size={16} /></Icon>
          )}
          <span className="w-[1px] h-10 bg-gradient-to-t from-transparent to-[#D4AF6A]/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Icon({ children, href, label }) {
  return (
    <Magnetic strength={0.45}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-11 h-11 border border-white/10 rounded-sm flex items-center justify-center text-[#9C958A] bg-[#12100D]/80 backdrop-blur-sm hover:bg-[#D4AF6A] hover:text-[#0C0B09] hover:border-[#D4AF6A] transition-colors duration-300 shadow-xl"
      >
        {children}
      </a>
    </Magnetic>
  );
}
