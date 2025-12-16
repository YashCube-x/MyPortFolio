import { FaCode, FaBrain } from "react-icons/fa";
import { Reveal } from "../components/Reveal";

export default function Services() {
  return (
    <section className="w-full min-h-screen bg-[#15171E] text-white font-['Outfit'] flex flex-col justify-center py-16 md:py-20">
        
        <div className="max-w-6xl mx-auto px-4 md:px-10 w-full">
            <div className="text-center mb-10 md:mb-16">
                 <p className="text-gray-400 text-xs tracking-[4px] uppercase font-bold mb-4">Service</p>
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">What I offer</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <ServiceCard 
                    icon={<FaCode />}
                    title="Web Development"
                    desc="Building modern, responsive web applications using React, Node.js, and Express. Focused on clean UI and efficient backend integration."
                />
                <ServiceCard 
                    icon={<FaBrain />}
                    title="Algorithms & Logic"
                    desc="Solving complex computational problems using C++ and Data Structures. Optimized solutions for performance and scalability."
                />
            </div>
        </div>

    </section>
  );
}

function ServiceCard({ icon, title, desc }) {
    return (
        <div className="bg-white text-[#1f2933] p-6 md:p-10 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 md:gap-6 items-start hover:-translate-y-2 transition-transform duration-300">
            <div className="text-3xl md:text-4xl text-gray-300 min-w-[3rem]">
                {icon}
            </div>
            <div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                    {desc}
                </p>
            </div>
        </div>
    );
}
