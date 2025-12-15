import { FaHeart } from "react-icons/fa";

export default function Blog() {
  const scrollToHome = () => {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full min-h-screen bg-[#15171E] text-white font-['Outfit'] flex items-center justify-center relative overflow-hidden">
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
             <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-blue-900 blur-[100px]"></div>
             <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-purple-900 blur-[100px]"></div>
        </div>

        <div className="text-center max-w-2xl px-10 relative z-10 animate-fade-in-scale">
            
            <div className="text-red-500 text-6xl mb-8 flex justify-center animate-heartbeat">
                <FaHeart />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Thank You <br />
                <span className="text-gray-500 text-3xl md:text-5xl">For Visiting My Website!</span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-12">
                I truly appreciate you stopping by. <br />
                The blog section is currently cooking up some great content. <br />
                Stay tuned for updates on Web Development & AI!
            </p>

            <button onClick={scrollToHome} className="inline-block border border-white px-10 py-4 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                Back To Home
            </button>
        </div>

    </section>
  );
}
