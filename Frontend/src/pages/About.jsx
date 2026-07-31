import { useEffect, useState } from "react";
import profileImg from "../assets/profile.png";
import { Reveal } from "../components/Reveal";
import { Kicker, Title } from "../components/SectionHeading";
import { ArrowDownToLine } from "lucide-react";
import api from "../lib/api";

const SKILLS_CATEGORIZED = [
  {
    category: "Languages",
    skills: [
      { name: "C++", level: 92 },
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "Python", level: 75 },
      { name: "Java", level: 70 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 82 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "RESTful APIs", level: 90 },
      { name: "Unit Testing", level: 80 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 82 },
    ],
  },
  {
    category: "Tools & OS",
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 92 },
      { name: "Arch Linux", level: 85 },
      { name: "VS Code", level: 95 },
      { name: "Vercel", level: 88 },
      { name: "Postman", level: 88 },
    ],
  },
  {
    category: "Concepts & AI",
    skills: [
      { name: "Data Structures & Algorithms", level: 90 },
      { name: "OOP", level: 88 },
      { name: "Pinecone Vector DB", level: 80 },
      { name: "RAG", level: 85 },
      { name: "Prompt Engineering", level: 85 },
    ],
  },
];

function SkillPill({ name, level }) {
  // Touch devices have no real hover state, so tapping a pill toggles the
  // same "revealed" look that group-hover gives on desktop.
  const [tapped, setTapped] = useState(false);

  return (
    <div
      onClick={() => setTapped((v) => !v)}
      className={`relative group overflow-hidden px-3 py-1.5 bg-white/80 border border-black/[0.08] rounded-sm shadow-sm cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5 hover:z-20 hover:border-[#A9832F] hover:shadow-[0_6px_20px_rgba(169,131,47,0.25)] select-none ${
        tapped ? "scale-105 -translate-y-0.5 z-20 border-[#A9832F] shadow-[0_6px_20px_rgba(169,131,47,0.25)]" : ""
      }`}
    >
      {/* Liquid Paint fill animation from left-to-right on hover (desktop) or tap (mobile) */}
      <div
        className={`absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#D4AF6A] to-[#A9832F] opacity-0 group-hover:opacity-100 w-0 group-hover:w-full transition-all duration-500 ease-out pointer-events-none rounded-sm ${
          tapped ? "opacity-100 w-full" : ""
        }`}
        style={{
          maxWidth: `${level}%`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-2.5 text-xs">
        <span className={`text-[#3D372E] group-hover:text-white font-medium transition-colors duration-300 ${tapped ? "text-white" : ""}`}>
          {name}
        </span>
        <span className={`font-['JetBrains_Mono'] text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 ${tapped ? "opacity-100" : ""}`}>
          {level}%
        </span>
      </div>
    </div>
  );
}

export default function About() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get("/settings").then((res) => setSettings(res.data.data));
  }, []);

  return (
    <section className="w-full min-h-[100dvh] bg-[#F5F1E8] text-[#17150F] flex items-center justify-center py-10 md:py-14 px-4 md:px-10 font-['Outfit'] relative overflow-hidden">
      {/* Soft corner glow */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#D4AF6A]/[0.12] blur-[120px] rounded-full pointer-events-none" />

      {/* Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:22px_22px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">

        {/* Left Side - Image */}
        <div className="relative">
          <Reveal width="100%">
            {/* Gold frame offset behind */}
            <div className="absolute -top-5 -left-5 w-full h-full border border-[#A9832F]/30 rounded-sm hidden md:block pointer-events-none" />

            <div className="relative z-10 group overflow-hidden rounded-sm">
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition duration-700 rounded-sm border border-black/[0.06] shadow-xl"
              />
            </div>
          </Reveal>

          {/* Download CV Circular Button */}
          <a
            href={settings?.resumeUrl || "#"}
            download="Suyash_Prakash_Resume.pdf"
            className="absolute -bottom-8 -right-4 md:-bottom-10 md:-right-10 w-20 h-20 md:w-28 md:h-28 bg-[#17150F] rounded-full flex items-center justify-center animate-spin-slow shadow-[0_10px_40px_rgba(23,21,15,0.25)] z-20 cursor-pointer hover:bg-[#A9832F] transition"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="w-full h-full absolute inset-0 text-[#F5F1E8] p-1" viewBox="0 0 100 100">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="text-[11px] uppercase font-bold tracking-[2px] fill-current">
                  <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                    Download My CV • Download My CV •
                  </textPath>
                </text>
              </svg>
              <ArrowDownToLine className="absolute w-4 h-4 md:w-5 md:h-5 text-[#D4AF6A]" />
            </div>
          </a>
        </div>

        {/* Right Side - Content */}
        <div>
          <Reveal>
            <Kicker tone="light" className="mb-4">About Me</Kicker>
            <Title tone="light" className="mb-6">Skilled C++ & MERN Developer</Title>

            <p className="text-[#6F6A60] mb-6 leading-relaxed text-sm md:text-base">
              Software developer skilled in <span className="text-[#A9832F] font-medium">C++</span> (primary) and JavaScript.
              Strong in algorithms, clean web UIs and practical backend with Node/Express.
              Seeking internship/entry roles to build efficient, scalable software.
            </p>

            {/* Skills Section */}
            <div>
              <h3 className="font-['Fraunces'] text-xl font-bold text-[#17150F] uppercase tracking-wider mb-4 border-b border-black/[0.1] pb-2 flex items-center justify-between">
                <span>Technical Skills</span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#A9832F] font-normal tracking-normal normal-case hidden sm:inline">
                  (Hover for proficiency)
                </span>
              </h3>

              <div className="space-y-2.5">
                {SKILLS_CATEGORIZED.map((group) => (
                  <div key={group.category} className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                    <span className="font-['JetBrains_Mono'] text-[12px] text-[#A9832F] uppercase tracking-wider font-bold shrink-0 whitespace-nowrap min-w-[84px]">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-[11px] flex-1 min-w-0">
                      {group.skills.map((skill) => (
                        <SkillPill key={skill.name} name={skill.name} level={skill.level} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
