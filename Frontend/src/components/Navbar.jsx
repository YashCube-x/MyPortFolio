import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profileImage from "../assets/profile-navbar.jpg";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [showImageModal, setShowImageModal] = useState(false);

  const sections = ["home", "about", "works", "service", "contact", "blog"];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Check middle of screen

      for (const id of sections) {
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
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <aside className="fixed top-0 left-0 h-screen w-[280px] bg-[#1F222B] border-r border-white/5 px-8 py-12 flex flex-col justify-between items-center z-50 text-center">
        <div className="w-full flex flex-col items-center">
          {/* Logo */}
          <h1 className="text-3xl font-bold mb-16 flex flex-col items-center gap-3 tracking-wide">
            <div 
              className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
              onDoubleClick={() => setShowImageModal(true)}
              title="Double-click to view full image"
            >
              <img 
                src={profileImage} 
                alt="Suyash" 
                className="w-full h-full object-cover"
              />
            </div>
            Suyash
          </h1>

        {/* Menu */}
        <ul className="space-y-8 text-[15px] font-medium text-gray-400 w-full flex flex-col items-center">
          {sections.map((section) => (
            <li key={section} className="relative w-max cursor-pointer">
              <button 
                onClick={() => scrollToSection(section)} 
                className={`transition uppercase tracking-widest hover:text-white outline-none focus:outline-none ${activeSection === section ? "text-white" : ""}`}
              >
                {section}
              </button>
              {/* Active Indicator - Underline Animation */}
              {activeSection === section && (
                <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full border border-gray-600 py-3 rounded-none text-xs font-bold tracking-widest hover:bg-white hover:text-black hover:border-white transition duration-300 uppercase cursor-pointer">
        Download CV
      </button>
    </aside>

    {/* Image Popup Modal */}
    {showImageModal && (
      <div 
        className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 cursor-pointer"
        onClick={() => setShowImageModal(false)}
      >
        <div className="relative max-w-4xl w-full">
          <img 
            src={profileImage} 
            alt="Suyash Prakash - Full View" 
            className="w-full h-auto rounded-lg shadow-2xl"
          />
          <button 
            className="absolute top-4 right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-gray-200 transition"
            onClick={() => setShowImageModal(false)}
          >
            ✕
          </button>
        </div>
      </div>
    )}
  </>
  );
}
