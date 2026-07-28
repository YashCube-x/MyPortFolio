import { Heart, ArrowUp } from "lucide-react";
import Magnetic from "../components/Magnetic";
import SplitText from "../components/SplitText";
import { scrollToId } from "../lib/scrollTo";

export default function Blog() {
  return (
    <section className="w-full min-h-screen bg-[#0C0B09] text-[#F4EFE6] font-['Outfit'] flex items-center justify-center relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-48 md:w-[500px] h-48 md:h-[500px] rounded-full bg-[#D4AF6A]/[0.06] blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-48 md:w-[500px] h-48 md:h-[500px] rounded-full bg-[#A9832F]/[0.05] blur-[120px]"></div>
      </div>

      {/* Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:22px_22px] opacity-30 pointer-events-none" />

      <div className="text-center max-w-2xl px-4 md:px-10 relative z-10">

        <div className="text-[#D4AF6A] mb-8 md:mb-10 flex justify-center animate-heartbeat drop-shadow-[0_0_20px_rgba(212,175,106,0.4)]">
          <Heart size={52} strokeWidth={1.2} fill="currentColor" />
        </div>

        <h1 className="font-['Fraunces'] font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
          <SplitText>Thank You</SplitText>
          <br />
          <span className="stroke-ghost italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <SplitText delay={0.3}>For Visiting My Website!</SplitText>
          </span>
        </h1>

        <p className="text-[#9C958A] text-sm md:text-lg leading-relaxed mb-10 md:mb-14">
          I truly appreciate you stopping by. <br />
          The blog section is currently cooking up some great content. <br />
          Stay tuned for updates on Web Development &amp; AI!
        </p>

        <Magnetic strength={0.3}>
          <button
            onClick={() => scrollToId("home")}
            className="group inline-flex items-center gap-2.5 border border-[#D4AF6A]/40 text-[#D4AF6A] px-8 md:px-11 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#D4AF6A] hover:text-[#0C0B09] transition-colors duration-300 cursor-pointer"
          >
            <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-1" />
            Back To Home
          </button>
        </Magnetic>

        <p className="mt-14 font-['JetBrains_Mono'] text-[10px] tracking-[0.35em] uppercase text-[#6B655C]">
          © {new Date().getFullYear()} Suyash Prakash — Crafted with care
        </p>
      </div>

    </section>
  );
}
