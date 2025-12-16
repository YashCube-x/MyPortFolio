import profileImg from "../assets/profile.png";
import resumeImg from "../assets/resume.jpg";
import { Reveal } from "../components/Reveal";

export default function About() {
  return (
    <section className="w-full min-h-screen bg-white text-black flex items-center justify-center py-16 md:py-24 px-4 md:px-10 font-['Outfit']">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* Left Side - Image */}
        <div className="relative">
          <Reveal width="100%">
            {/* Gray Background decoration - hidden on mobile */}
            <div className="absolute -top-10 -left-10 w-2/3 h-full bg-gray-100 -z-10 rounded-br-[100px] hidden md:block"></div>
            
            <div className="relative z-10">
                <img 
                src={profileImg} 
                alt="Profile" 
                className="w-full h-auto object-cover grayscale rounded-sm shadow-xl border-[15px] border-white"
                />
                

            </div>
          </Reveal>
            
            {/* Download CV Circular Button - Fixed Clipping & Linked */}
            <a 
                href={resumeImg} 
                download="Suyash_Prakash_Resume.jpg"
                className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center animate-spin-slow shadow-lg z-20 cursor-pointer hover:bg-gray-50 transition"
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <svg className="w-full h-full absolute inset-0 text-black p-1" viewBox="0 0 100 100">
                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                        <text className="text-[11px] uppercase font-bold tracking-[2px] hidden md:block">
                            <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                                Download My CV • Download My CV •
                            </textPath>
                        </text>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </div>
            </a>
        </div>

        {/* Right Side - Content */}
        <div>
          <Reveal>
            <h4 className="text-gray-500 uppercase tracking-[4px] text-xs md:text-sm font-semibold mb-4">About Me</h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 md:mb-8">
                Skilled <span className="text-gray-400">C++</span> & <span className="text-gray-400">MERN</span> Developer
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                Software developer skilled in C++ (primary) and JavaScript. Strong in algorithms, clean web UIs and practical backend with Node/Express. Seeking internship/entry roles to build efficient, scalable software.
            </p>
            
            <div className="grid grid-cols-2 gap-y-4 md:gap-y-6 gap-x-6 md:gap-x-12 text-sm md:text-md mb-8 md:mb-12">
                <div>
                    <p className="font-bold text-gray-900">Name</p>
                    <p className="text-gray-600">Suyash Prakash</p>
                </div>
                <div>
                    <p className="font-bold text-gray-900">Phone</p>
                    <p className="text-gray-600">+91-9125900756</p>
                </div>
                <div>
                    <p className="font-bold text-gray-900">Email</p>
                    <p className="text-gray-600 break-all">yashcube07@gmail.com</p>
                </div>
                <div>
                    <p className="font-bold text-gray-900">Education</p>
                    <p className="text-gray-600">B.Tech (CSE)</p>
                </div>
                <div>
                    <p className="font-bold text-gray-900">Location</p>
                    <p className="text-gray-600">Kanpur, India</p>
                </div>
            </div>

            {/* Skills Section */}
            <div>
                 <h4 className="font-bold text-lg mb-4">Technical Skills</h4>
                 <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                     <span className="px-4 py-2 bg-gray-100 rounded-sm">C++</span>
                     <span className="px-4 py-2 bg-gray-100 rounded-sm">JavaScript</span>
                     <span className="px-4 py-2 bg-gray-100 rounded-sm">React.js</span>
                     <span className="px-4 py-2 bg-gray-100 rounded-sm">Node.js</span>
                     <span className="px-4 py-2 bg-gray-100 rounded-sm">Express.js</span>
                     <span className="px-4 py-2 bg-gray-100 rounded-sm">MongoDB</span>
                     <span className="px-4 py-2 bg-gray-100 rounded-sm">SQL</span>
                     <span className="px-4 py-2 bg-gray-100 rounded-sm">Git/GitHub</span>
                     <span className="px-4 py-2 bg-gray-100 rounded-sm">DSA</span>
                 </div>
            </div>

          </Reveal>
        </div>
      </div>
    </section>
  );
}
