import { useState, useEffect, useRef } from "react";
import ProjectModal from "../components/ProjectModal";
import { Reveal } from "../components/Reveal";
import { FaGraduationCap, FaCode, FaTrophy, FaCertificate, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence, animate, useInView } from "framer-motion";

// Images
// Images
import urbanApiImg from "../assets/urban-api.png"; 
import certBlockchain from "../assets/cert-blockchain.png";
import certRobo from "../assets/cert-robo.png";
import certCyber from "../assets/cert-cyber.png";
import chatBotImg from "../assets/project-chatbot.png";
import weatherImg from "../assets/project-weather.png";
import ticTacToeImg from "../assets/project-tictactoe.png";
import rpsImg from "../assets/project-rps.png";

// Using same image as placeholder for others or generic placeholders if needed
const placeholderImg = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"; 

const projects = [
  {
    id: 1,
    category: "AI & BACKEND",
    title: "Urban Issue Detector API",
    type: "FastAPI / YOLO11",
    client: "Personal Project",
    duration: "Ongoing",
    task: "AI Model & API",
    budget: "Open Source",
    description: "AI-powered API (FastAPI + YOLO11) that detects city issues like potholes and garbage from images. Enables smart urban monitoring.",
    github: "https://github.com/YashCube-x/UrbanIssueDetector-API",
    demo: "https://urbanissuedetector.onrender.com/docs",
    image: urbanApiImg
  },
  {
    id: 4,
    category: "AI WEB APP",
    title: "YashBot",
    type: "React + Vite",
    client: "Personal Project",
    duration: "1 Week",
    task: "Frontend AI",
    budget: "Open Source",
    description: "Interactive AI ChatBot built with React & Vite. Features real-time responses and a modern, clean UI.",
    github: "https://github.com/YashCube-x/ChatBot",
    demo: "https://yashbot.netlify.app/",
    image: chatBotImg 
  },
  {
    id: 5,
    category: "WEB APP",
    title: "Weather App",
    type: "Javascript API",
    client: "Personal Project",
    duration: "2 Weeks",
    task: "API Integration",
    budget: "Open Source",
    description: "Responsive SPA that fetches weather via API; using async fetch/Promises. Deployed on GitHub Pages.",
    github: "https://github.com/YashCube-x/Weather-App",
    demo: "https://yashcube-x.github.io/Weather-App/",
    image: weatherImg
  },
  {
    id: 2,
    category: "GAME DEV",
    title: "Tic-Tac-Toe",
    type: "Web Game",
    client: "Personal Project",
    duration: "1 Week",
    task: "Game Logic",
    budget: "Open Source",
    description: "Two-player game with state handling and win/draw detection; responsive UI.",
    github: "https://github.com/YashCube-x/TicTocToe",
    demo: "https://yashcube-x.github.io/TicTocToe/",
    image: ticTacToeImg
  },
  {
    id: 3,
    category: "GAME DEV",
    title: "Stone-Paper-Scissors",
    type: "Web Game",
    client: "Personal Project",
    duration: "3 Days",
    task: "Logic Implementation",
    budget: "Open Source",
    description: "Classic game with randomized computer moves and scoring; lightweight UI.",
    github: "https://github.com/YashCube-x/Stone-Paper-Sicor",
    demo: "https://yashcube-x.github.io/Stone-Paper-Sicor/",
    image: rpsImg
  }
];


export default function Works() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredCert, setHoveredCert] = useState(null);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  const certifications = [
    {
        id: 1,
        title: "Blockchain Fundamentals Certificate",
        year: "2024",
        desc: "Certified in blockchain concepts and dApp basics.",
        link: "https://drive.google.com/file/d/1oTP4s-8wlIh4jxLMLTCrPBVt3Jm2rJTR/view",
        image: certBlockchain
    },
    {
        id: 2,
        title: "Robo Rumble — Participation",
        year: "2025",
        desc: "Participation certificate from CSJMU Innovation Cell.",
        link: "https://drive.google.com/file/d/1OpZ07odHO3EdXIHIUU7iUBy_CJBmjUpv/view",
        image: certRobo
    },
    {
        id: 3,
        title: "Cyber Security Course — IIT Kanpur",
        year: "2024",
        desc: "Completed course on cyber security fundamentals.",
        link: "https://drive.google.com/file/d/1FxVyPBWPBe8DRrWVTByMWBsYie19n9xn/view",
        image: certCyber
    }
  ];

  return (
    <section className="w-full min-h-screen bg-white text-black font-['Outfit'] relative overflow-hidden">
        
        {/* Marquee Header */}
        <div className="pt-20 md:pt-32 pb-12 md:pb-20 relative overflow-hidden flex flex-col items-center justify-center gap-2">
            
            {/* Top Line - Moves Left - Solid Black - Hidden on small screens */}
            <div className="absolute top-10 left-0 w-full items-center justify-center opacity-10 select-none pointer-events-none whitespace-nowrap hidden md:flex">
                <div className="animate-marquee inline-block text-[60px] md:text-[80px] lg:text-[100px] font-black uppercase text-[#1f2933] w-max">
                     C++ Programmer * MERN Developer * Problem Solver * C++ Programmer * MERN Developer * Problem Solver *
                </div>
            </div>

            {/* Bottom Line - Moves Right - Outline - Hidden on small screens */}
            <div className="absolute top-28 left-0 w-full items-center justify-center opacity-10 select-none pointer-events-none whitespace-nowrap hidden md:flex">
                <div className="animate-marquee-reverse inline-block text-[60px] md:text-[80px] lg:text-[100px] font-black uppercase text-transparent stroke-text-black w-max">
                     Open For Internships * Let's Work Together * Open For Internships * Let's Work Together *
                </div>
            </div>
            
            <div className="relative z-10 text-center mt-4 md:mt-8">
                 <p className="text-gray-400 text-xs tracking-[4px] uppercase font-bold mb-4">Portfolio</p>
                 <h2 className="text-3xl md:text-4xl font-bold text-[#1f2933]">My Projects</h2>
            </div>
        </div>

        {/* Project List */}
        <div className="max-w-5xl mx-auto px-4 md:px-10 pb-12 md:pb-20">
            <div className="border-t border-gray-100">
                {visibleProjects.map((project) => (
                    <Reveal key={project.id} width="100%">
                         <div 
                              className="group border-b border-gray-100 py-6 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 hover:bg-gray-50 transition duration-300 px-4 md:px-6 cursor-pointer relative overflow-visible"
                              onClick={() => setSelectedProject(project)}
                              onMouseEnter={() => setHoveredProject(project)}
                              onMouseLeave={() => setHoveredProject(null)}
                         >
                             
                             <div className="text-left z-10 relative pointer-events-none md:pointer-events-auto">
                                 <span className="text-[10px] font-bold tracking-widest text-[#666] uppercase mb-2 block group-hover:text-black transition">{project.category}</span>
                                 <h3 className="text-2xl font-bold text-[#1f2933]">{project.title}</h3>
                                 <p className="text-xs text-gray-500 mt-2 max-w-md">{project.description}</p>
                             </div>

                             {/* Hover Image - Pop-out style */}
                             <AnimatePresence>
                                {hoveredProject === project && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, y: 100, rotate: -5 }}
                                        animate={{ 
                                            opacity: 1, 
                                            scale: 1, 
                                            y: 0, 
                                            rotate: 0 
                                        }}
                                        exit={{ opacity: 0, scale: 0.8, y: 100, rotate: -5 }}
                                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[350px] h-[220px] pointer-events-none z-20 overflow-hidden shadow-2xl hidden md:block"
                                    >
                                        <img 
                                            src={project.image} 
                                            alt={project.title} 
                                            className="w-full h-full object-contain"
                                        />
                                    </motion.div>
                                )}
                             </AnimatePresence>

                             <div className="flex gap-3 z-30 relative">
                                {project.github !== "#" && (
                                    <a 
                                        href={project.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition duration-300 transform group-hover:scale-110"
                                    >
                                        <FaGithub size={20} />
                                    </a>
                                )}
                                {project.demo !== "#" && (
                                    <a 
                                        href={project.demo} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition duration-300 transform group-hover:scale-110"
                                    >
                                        <FaExternalLinkAlt size={18} />
                                    </a>
                                )}
                             </div>
                         </div>
                    </Reveal>
                ))}
            </div>

            {/* Show More Button */}
            {projects.length > 3 && (
                <div className="flex justify-center mt-12">
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="px-8 py-3 bg-[#1f252b] text-white text-xs font-bold tracking-widest uppercase rounded-sm hover:opacity-90 transition"
                    >
                        {showAll ? "Show Less" : "View All Projects"}
                    </button>
                </div>
            )}
        </div>
        
        {/* Modal */}
        <ProjectModal 
            isOpen={!!selectedProject} 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
        />

        {/* Competitive Profile - Card Section */}
        <div className="bg-white py-16 md:py-24 border-t border-gray-100">
             <div className="max-w-6xl mx-auto px-4 md:px-10">
                 <Reveal width="100%">
                    <div className="text-center mb-10 md:mb-16 relative">
                        {/* Title Background Box */}
                        <div className="inline-block px-6 md:px-12 py-4 mb-4">
                             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1f2933] uppercase tracking-wider">Competitive Profile</h2>
                        </div>
                    </div>
                 </Reveal>

                 {/* Cards Grid */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    
                    {/* LeetCode Card */}
                    <ProfileCard 
                        title="LeetCode"
                        rating={1491}
                        color="text-[#E6B00F]" // Yellow/Gold
                        watermark="LC"
                        link="https://leetcode.com/u/YashCube_X/"
                    />

                    {/* CodeChef Card */}
                    <ProfileCard 
                        title="CodeChef"
                        rating={896}
                        color="text-[#5B88A5]" // Muted Blue
                        watermark="CC"
                        link="https://www.codechef.com/users/yashcube_x"
                    />

                    {/* GeeksForGeeks Card */}
                    <ProfileCard 
                        title="GeeksForGeeks"
                        rating={1379}
                        color="text-[#D65D45]" // Soft Red
                        watermark="GFG"
                        link="https://www.geeksforgeeks.org/profile/yashcube?from=explore"
                    />
                 </div>
             </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-white py-16 md:py-24 border-t border-gray-100">
             <div className="max-w-5xl mx-auto px-4 md:px-10">
                 <Reveal width="100%">
                    <h2 className="text-2xl md:text-3xl font-serif text-[#1f2933] uppercase tracking-widest mb-10 md:mb-16 border-b border-gray-200 pb-4">Certifications</h2>

                    <div className="border-t border-gray-100">
                        {certifications.map((item) => (
                           <Reveal key={item.id} width="100%">
                               <a 
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group border-b border-gray-100 py-6 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 hover:bg-gray-50 transition duration-300 px-4 md:px-6 cursor-pointer relative overflow-visible block"
                                    onMouseEnter={() => setHoveredCert(item.id)}
                                    onMouseLeave={() => setHoveredCert(null)}
                               >
                                   
                                   <div className="text-left z-10 relative pointer-events-none md:pointer-events-auto flex-1">
                                       <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#1f2933] flex items-center gap-3">
                                            {item.title}
                                            <FaExternalLinkAlt className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                                       </h3>
                                       <p className="text-xs text-gray-500 mt-2 max-w-md">{item.desc}</p>
                                   </div>

                                   <div className="z-10 relative">
                                        <span className="text-xl font-bold text-[#1f2933]">{item.year}</span>
                                   </div>

                                   {/* Hover Image - Pop-out style (Identical to Projects) */}
                                   <AnimatePresence>
                                        {hoveredCert === item.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, y: 100, rotate: -5 }}
                                                animate={{ 
                                                    opacity: 1, 
                                                    scale: 1, 
                                                    y: 0, 
                                                    rotate: 0 
                                                }}
                                                exit={{ opacity: 0, scale: 0.8, y: 100, rotate: -5 }}
                                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                                className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[350px] h-[220px] pointer-events-none z-20 overflow-hidden shadow-2xl hidden md:block"
                                            >
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-contain"
                                                />
                                            </motion.div>
                                        )}
                                   </AnimatePresence>
                               </a>
                           </Reveal>
                        ))}
                    </div>
                 </Reveal>
             </div>
        </div>

        {/* Education Section */}
        <div className="bg-[#f9f9f9] py-16 md:py-24">
             <div className="max-w-6xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                 {/* Left Content */}
                 <div>
                    <Reveal>
                        <p className="text-gray-400 text-xs tracking-[4px] uppercase font-bold mb-4">Academics</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f2933] mb-4 md:mb-6">My Education</h2>
                        <p className="text-gray-500 mb-8 md:mb-12 leading-relaxed text-sm md:text-base">
                            A consistent academic record with a focus on Computer Science and engineering fundamentals.
                        </p>

                        <div className="space-y-8">
                            <EducationItem 
                                title="B.Tech (Computer Science & Eng.)"
                                school="University Institute of Engineering and Technology, CSJMU"
                                range="Oct 2023 - May 2027"
                                desc="CPI: 8.53/10.00. Main focus on Data Structures, Algorithms, and Software Development."
                            />
                            <EducationItem 
                                title="Intermediate (Class 12)"
                                school="Ram Lakhan Public School, Varanasi"
                                range="2023"
                                desc="Science (PCM) Stream. Secured 93%."
                            />
                            <EducationItem 
                                title="Secondary School (Class 10)"
                                school="Ram Lakhan Public School, Varanasi"
                                range="2021"
                                desc="Secured 87%."
                            />
                        </div>
                    </Reveal>
                 </div>

                 {/* Right Image - Hidden on mobile */}
                 <Reveal width="100%">
                     <div className="relative h-[300px] md:h-[600px] w-full rounded-lg overflow-hidden shadow-xl group hidden md:block">
                         {/* Placeholder for the student image */}
                         <div className="absolute inset-0 bg-gray-200 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition duration-700">
                         </div>
                     </div>
                 </Reveal>
             </div>
        </div>

    </section>
  );
}

// Counting Number Component
// Counting Number Component
function CountingNumber({ value }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" }); // Trigger when well inside viewport
    
    useEffect(() => {
        if (isInView) {
            const node = ref.current;
            const controls = animate(0, value, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(v) {
                    node.textContent = Math.round(v).toLocaleString(); // Add commas
                }
            });
            return () => controls.stop();
        }
    }, [isInView, value]);

    return <span ref={ref}>0</span>;
}

// New Card Component for Competitive Profile
function ProfileCard({ title, rating, color, watermark, link }) {
    return (
        <Reveal width="100%">
            <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="relative bg-white border border-gray-200 p-10 h-[280px] flex flex-col items-center justify-center group hover:shadow-xl transition duration-500 overflow-hidden rounded-lg cursor-pointer">
                    
                    {/* Corner Accents - Changed to subtle dark gray */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-black transition-colors"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-300 group-hover:border-black transition-colors"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-bold text-[#1f2933] mb-4 tracking-wide">{title}</h3>
                        <div className={`text-6xl font-bold mb-4 font-mono ${color}`}>
                            <CountingNumber value={rating} />
                        </div>
                        <p className="text-[10px] font-bold tracking-[3px] text-gray-400 uppercase">Current Rating</p>
                    </div>

                    {/* Watermark Background */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] transition duration-500">
                        <span className="text-[150px] font-black italic text-black transform -rotate-12 translate-y-4">
                            {watermark}
                        </span>
                    </div>
                </div>
            </a>
        </Reveal>
    );
}

function EducationItem({ title, school, range, desc }) {
    return (
        <div className="flex gap-6 items-start">
            <div className="w-14 h-14 min-w-[56px] border border-gray-200 rounded-md flex items-center justify-center text-[#1f2933] text-2xl">
                <FaGraduationCap />
            </div>
            <div>
                <h4 className="text-xl font-bold text-[#1f2933]">{title}</h4>
                <p className="text-xs font-bold text-[#1f2933] mt-1 mb-3">{school} <span className="text-gray-400 font-normal">({range})</span></p>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}


