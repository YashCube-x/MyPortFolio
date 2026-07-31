import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowDownToLine } from "lucide-react";
import profileImage from "../assets/profile-navbar.jpg";
import Magnetic from "./Magnetic";
import { scrollToId } from "../lib/scrollTo";
import api from "../lib/api";

const SECTIONS = ["home", "about", "works", "service", "contact", "blog"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [showImageModal, setShowImageModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("#");

  useEffect(() => {
    api.get("/settings").then((res) => setResumeUrl(res.data.data.resumeUrl || "#"));
  }, []);

  const scrollToSection = (id) => {
    // Lenis is stopped while the mobile menu is open (see effect below); closing
    // the menu only restarts it on the next render, which is too late for the
    // scrollToId call below, so restart it explicitly first.
    window.__lenis?.start();
    setIsMobileMenuOpen(false);
    scrollToId(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const id of SECTIONS) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pause smooth scroll while the mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "unset";
    }
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0C0B09]/85 backdrop-blur-xl border-b border-white/[0.06] px-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full overflow-hidden border border-[#D4AF6A]/30"
            onDoubleClick={() => setShowImageModal(true)}
          >
            <img
              src={profileImage}
              alt="Suyash"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-['Fraunces'] font-semibold text-lg text-[#F4EFE6]">
            Suyash<span className="text-[#D4AF6A]">.</span>
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#F4EFE6] p-2.5 hover:bg-white/5 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/70 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed top-16 left-0 h-[calc(100dvh-64px)] w-[300px] max-w-[85vw] bg-[#0C0B09]/95 backdrop-blur-xl border-r border-white/[0.06] px-8 py-10 z-50 overflow-y-auto"
            >
              {/* Menu Items */}
              <ul className="space-y-2">
                {SECTIONS.map((section, i) => (
                  <motion.li
                    key={section}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => scrollToSection(section)}
                      className={`w-full text-left font-['Fraunces'] text-3xl py-2 capitalize transition-colors outline-none focus:outline-none ${
                        activeSection === section ? "text-[#D4AF6A] italic" : "text-[#9C958A] hover:text-[#F4EFE6]"
                      }`}
                    >
                      <span className="font-['JetBrains_Mono'] not-italic text-[10px] text-[#6B655C] mr-3 align-middle">
                        0{i + 1}
                      </span>
                      {section}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Download CV Button */}
              <a
                href={resumeUrl}
                download="Suyash_Prakash_Resume.pdf"
                className="mt-10 flex items-center justify-center gap-2 w-full border border-[#D4AF6A]/40 text-[#D4AF6A] py-3.5 text-xs font-bold tracking-[0.2em] hover:bg-[#D4AF6A] hover:text-[#0C0B09] transition duration-300 uppercase rounded-sm"
              >
                <ArrowDownToLine size={14} />
                Download CV
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navbar */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 h-20 bg-[#0C0B09]/85 backdrop-blur-xl border-b border-white/[0.06] px-10 items-center justify-between z-50">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <div
            className="w-11 h-11 rounded-full overflow-hidden border border-[#D4AF6A]/30 hover:scale-110 hover:border-[#D4AF6A] transition-all duration-300"
            onDoubleClick={(e) => { e.stopPropagation(); setShowImageModal(true); }}
            title="Double-click to view full image"
          >
            <img
              src={profileImage}
              alt="Suyash"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-['Fraunces'] font-semibold text-xl text-[#F4EFE6]">
            Suyash<span className="text-[#D4AF6A]">.</span>
          </span>
        </div>

        {/* Menu */}
        <ul className="flex items-center gap-9 text-[12px] font-semibold tracking-[0.2em] text-[#9C958A]">
          {SECTIONS.map((section) => (
            <li key={section} className="relative w-max cursor-pointer">
              <button
                onClick={() => scrollToSection(section)}
                className={`transition-colors duration-300 uppercase hover:text-[#F4EFE6] outline-none focus:outline-none ${
                  activeSection === section ? "text-[#D4AF6A]" : ""
                }`}
              >
                {section}
              </button>
              {/* Active Indicator - Underline Animation */}
              {activeSection === section && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#D4AF6A]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Download CV Button */}
        <Magnetic strength={0.3}>
          <a
            href={resumeUrl}
            download="Suyash_Prakash_Resume.pdf"
            className="flex items-center gap-2 border border-[#D4AF6A]/40 text-[#D4AF6A] px-6 py-3 text-[11px] font-bold tracking-[0.2em] hover:bg-[#D4AF6A] hover:text-[#0C0B09] transition-colors duration-300 uppercase rounded-sm"
          >
            <ArrowDownToLine size={13} />
            Download CV
          </a>
        </Magnetic>
      </nav>

      {/* Image Popup Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={profileImage}
              alt="Suyash Prakash - Full View"
              className="w-full h-auto rounded-lg shadow-2xl border border-white/10"
            />
            <button
              className="absolute top-4 right-4 bg-[#0C0B09]/80 text-[#F4EFE6] w-11 h-11 rounded-full flex items-center justify-center hover:bg-[#D4AF6A] hover:text-[#0C0B09] transition border border-white/10"
              onClick={() => setShowImageModal(false)}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
