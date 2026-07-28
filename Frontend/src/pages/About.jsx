import { useEffect, useState } from "react";
import profileImg from "../assets/profile.png";
import { Reveal } from "../components/Reveal";
import { Kicker, Title } from "../components/SectionHeading";
import { ArrowDownToLine } from "lucide-react";
import api from "../lib/api";

const STATIC_DETAILS = [
  { label: "Name", value: "Suyash Prakash" },
  { label: "Education", value: "B.Tech (CSE)" },
];

const SKILLS = ["C++", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "SQL", "Git/GitHub", "DSA"];

export default function About() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get("/settings").then((res) => setSettings(res.data.data));
  }, []);

  const details = [
    STATIC_DETAILS[0],
    { label: "Phone", value: settings?.phone || "" },
    { label: "Email", value: settings?.email || "" },
    STATIC_DETAILS[1],
    { label: "Location", value: settings?.location || "" },
  ];

  return (
    <section className="w-full min-h-screen bg-[#F5F1E8] text-[#17150F] flex items-center justify-center py-20 md:py-28 px-4 md:px-10 font-['Outfit'] relative overflow-hidden">
      {/* Soft corner glow */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#D4AF6A]/[0.12] blur-[120px] rounded-full pointer-events-none" />

      {/* Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:22px_22px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">

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
            <Kicker tone="light" className="mb-5">About Me</Kicker>
            <Title tone="light" className="mb-8">Skilled C++ & MERN Developer</Title>

            <p className="text-[#6F6A60] mb-8 leading-relaxed text-sm md:text-base">
              Software developer skilled in <span className="text-[#A9832F] font-medium">C++</span> (primary) and JavaScript.
              Strong in algorithms, clean web UIs and practical backend with Node/Express.
              Seeking internship/entry roles to build efficient, scalable software.
            </p>

            <div className="grid grid-cols-2 gap-y-5 md:gap-y-6 gap-x-6 md:gap-x-12 text-sm mb-10 border-t border-black/[0.08] pt-8">
              {details.map((d) => (
                <div key={d.label}>
                  <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase text-[#A29A8B] mb-1">{d.label}</p>
                  <p className="text-[#17150F] break-all">{d.value}</p>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div>
              <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase text-[#A29A8B] mb-4">Technical Skills</p>
              <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/70 border border-black/[0.07] rounded-sm text-[#5F594E] hover:text-[#A9832F] hover:border-[#A9832F]/50 transition-colors duration-300 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
