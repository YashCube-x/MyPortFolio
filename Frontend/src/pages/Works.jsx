import { useState, useEffect, useRef } from "react";
import ProjectModal from "../components/ProjectModal";
import { Reveal } from "../components/Reveal";
import { Kicker, Title } from "../components/SectionHeading";
import Magnetic from "../components/Magnetic";
import CertificateCarousel from "../components/CertificateCarousel";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { motion, AnimatePresence, animate, useInView } from "framer-motion";
import api from "../lib/api";

export default function Works() {
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    api.get("/projects").then((res) => {
      setProjects(res.data.data.map((p) => ({ ...p, id: p._id })));
    });
    api.get("/certificates").then((res) => {
      setCertifications(res.data.data.map((c) => ({ ...c, id: c._id })));
    });
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section className="w-full min-h-[100dvh] bg-[#F5F1E8] text-[#17150F] font-['Outfit'] relative overflow-hidden">

      {/* Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:22px_22px] opacity-40 pointer-events-none" />

      {/* Marquee Header */}
      <div className="pt-24 md:pt-36 pb-14 md:pb-24 relative overflow-hidden flex flex-col items-center justify-center gap-2">

        {/* Top Line - Moves Left - Ghost fill */}
        <div className="absolute top-8 left-0 w-full items-center justify-center select-none pointer-events-none whitespace-nowrap hidden md:flex">
          <div className="animate-marquee inline-block text-[60px] md:text-[80px] lg:text-[100px] font-black uppercase text-black/[0.04] w-max">
            C++ Programmer * MERN Developer * Problem Solver * C++ Programmer * MERN Developer * Problem Solver *
          </div>
        </div>

        {/* Bottom Line - Moves Right - Ghost outline */}
        <div className="absolute top-28 left-0 w-full items-center justify-center select-none pointer-events-none whitespace-nowrap hidden md:flex">
          <div className="animate-marquee-reverse inline-block text-[60px] md:text-[80px] lg:text-[100px] font-black uppercase stroke-ghost-light w-max">
            Open For Internships * Let's Work Together * Open For Internships * Let's Work Together *
          </div>
        </div>

        <div className="relative z-10 text-center mt-16 md:mt-24 flex flex-col items-center">
          <Title tone="light">My Projects</Title>
        </div>
      </div>

      {/* Project List */}
      <div className="max-w-5xl mx-auto px-4 md:px-10 pb-14 md:pb-24 relative z-10">
        <div className="border-t border-black/[0.08]">
          {visibleProjects.map((project, i) => (
            <Reveal key={project.id} width="100%">
              <div
                className="group border-b border-black/[0.08] py-7 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 hover:bg-black/[0.02] transition duration-300 px-4 md:px-6 cursor-pointer relative overflow-visible"
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                data-cursor-label="OPEN"
              >
                <div className="text-left z-10 relative pointer-events-none md:pointer-events-auto flex gap-5 md:gap-8 items-baseline">
                  <span className="font-['Fraunces'] italic text-lg md:text-xl text-[#B4AC9C] group-hover:text-[#A9832F] transition-colors duration-300">
                    0{i + 1}
                  </span>
                  <div>
                    <span className="font-['JetBrains_Mono'] text-[10px] font-bold tracking-[0.25em] text-[#A9832F]/80 uppercase mb-2 block group-hover:text-[#A9832F] transition">
                      {project.category}
                    </span>
                    <h3 className="font-['Fraunces'] text-2xl md:text-3xl font-semibold text-[#17150F] group-hover:translate-x-2 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#6F6A60] mt-2 max-w-md">{project.description}</p>
                  </div>
                </div>

                {/* Hover Image - Pop-out style */}
                <AnimatePresence>
                  {hoveredProject === project && project.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 100, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 100, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[350px] h-[220px] pointer-events-none z-20 overflow-hidden shadow-2xl hidden md:block rounded-md border border-black/10 bg-white"
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
                  {Boolean(project.github) && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="GitHub repository"
                      className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-black/15 flex items-center justify-center text-[#6F6A60] hover:bg-[#17150F] hover:text-[#D4AF6A] hover:border-[#17150F] transition duration-300 transform group-hover:scale-110"
                    >
                      <FaGithub size={18} />
                    </a>
                  )}
                  {Boolean(project.demo) && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Live demo"
                      className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-black/15 flex items-center justify-center text-[#6F6A60] hover:bg-[#17150F] hover:text-[#D4AF6A] hover:border-[#17150F] transition duration-300 transform group-hover:scale-110"
                    >
                      <ArrowUpRight size={18} />
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
            <Magnetic strength={0.25}>
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-9 py-3.5 border border-[#A9832F]/50 text-[#A9832F] text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#A9832F] hover:text-[#F5F1E8] transition-colors duration-300 cursor-pointer"
              >
                {showAll ? "Show Less" : "View All Projects"}
              </button>
            </Magnetic>
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
      <div className="py-16 md:py-28 border-t border-black/[0.06] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#D4AF6A]/[0.10] blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 md:px-10 relative z-10">
          <Reveal width="100%">
            <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
              <Kicker tone="light" className="mb-5">Competitive</Kicker>
              <Title tone="light">Coding Profiles</Title>
            </div>
          </Reveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            <ProfileCard
              title="LeetCode"
              rating={1491}
              watermark="LC"
              link="https://leetcode.com/u/YashCube_X/"
            />
            <ProfileCard
              title="CodeChef"
              rating={896}
              watermark="CC"
              link="https://www.codechef.com/users/yashcube_x"
            />
            <ProfileCard
              title="GeeksForGeeks"
              rating={1379}
              watermark="GFG"
              link="https://www.geeksforgeeks.org/profile/yashcube?from=explore"
            />
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="py-16 md:py-28 border-t border-black/[0.06] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[60%] bg-[#D4AF6A]/[0.08] blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 md:px-10 relative z-10">
          <Reveal width="100%">
            <div className="flex flex-col items-center text-center mb-12 md:mb-16">
              <Kicker tone="light" className="mb-5">Credentials</Kicker>
              <Title tone="light">Certifications</Title>
            </div>
          </Reveal>

          <Reveal width="100%">
            <CertificateCarousel items={certifications} />
          </Reveal>
        </div>
      </div>

      {/* Education Section */}
      <div className="py-16 md:py-28 border-t border-black/[0.06] bg-[#EDE7DA]/60 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Content */}
          <div>
            <Reveal>
              <Kicker tone="light" className="mb-5">Academics</Kicker>
              <Title tone="light" className="mb-6">My Education</Title>
              <p className="text-[#6F6A60] mb-10 md:mb-12 leading-relaxed text-sm md:text-base">
                A consistent academic record with a focus on Computer Science and engineering fundamentals.
              </p>

              <div className="space-y-9">
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
            <div className="relative h-[300px] md:h-[600px] w-full rounded-lg overflow-hidden group hidden md:block border border-black/[0.08] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17150F]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.3em] uppercase text-[#D4AF6A]">Est. 2023</p>
                <p className="font-['Fraunces'] text-xl text-[#F4EFE6] mt-1">UIET, CSJMU Kanpur</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  );
}

// Counting Number Component
function CountingNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          node.textContent = Math.round(v).toLocaleString();
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
}

// Card Component for Competitive Profile
function ProfileCard({ title, rating, watermark, link }) {
  return (
    <Reveal width="100%">
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full" data-cursor-label="VISIT">
        <div className="relative bg-white border border-black/[0.06] p-10 h-[280px] flex flex-col items-center justify-center group hover:border-[#A9832F]/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-lg cursor-pointer shadow-md">

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#A9832F]/40 group-hover:border-[#A9832F] group-hover:w-6 group-hover:h-6 transition-all duration-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#A9832F]/40 group-hover:border-[#A9832F] group-hover:w-6 group-hover:h-6 transition-all duration-500"></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h3 className="font-['Fraunces'] text-2xl font-semibold text-[#17150F] mb-4 tracking-wide">{title}</h3>
            <div className="text-6xl font-bold mb-4 font-['JetBrains_Mono'] text-[#A9832F]">
              <CountingNumber value={rating} />
            </div>
            <p className="font-['JetBrains_Mono'] text-[10px] font-bold tracking-[0.3em] text-[#B4AC9C] uppercase">Current Rating</p>
          </div>

          {/* Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] group-hover:opacity-[0.09] transition duration-500">
            <span className="text-[150px] font-black italic text-[#A9832F] transform -rotate-12 translate-y-4 font-['Fraunces']">
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
    <div className="flex gap-6 items-start group">
      <div className="w-14 h-14 min-w-[56px] border border-[#A9832F]/40 bg-white/60 rounded-sm flex items-center justify-center text-[#A9832F] group-hover:bg-[#17150F] group-hover:text-[#D4AF6A] group-hover:border-[#17150F] transition-colors duration-500">
        <GraduationCap size={24} strokeWidth={1.5} />
      </div>
      <div>
        <h4 className="font-['Fraunces'] text-lg md:text-xl font-semibold text-[#17150F]">{title}</h4>
        <p className="text-xs font-medium text-[#6F6A60] mt-1 mb-3">
          {school} <span className="text-[#A9832F] font-['JetBrains_Mono'] text-[10px]">({range})</span>
        </p>
        <p className="text-[#8A8375] text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
