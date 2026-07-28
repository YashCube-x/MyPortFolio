import { X, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaFacebookF } from "react-icons/fa6";

export default function ProjectModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#12100D] border border-white/[0.08] w-full max-w-5xl max-h-[90dvh] overflow-y-auto rounded-xl shadow-2xl animate-fade-in-scale">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-11 h-11 bg-[#0C0B09]/80 border border-white/10 rounded-full flex items-center justify-center text-[#9C958A] hover:text-[#0C0B09] hover:bg-[#D4AF6A] hover:border-[#D4AF6A] transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12">
          {/* Project image header */}
          <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-br from-[#1A1713] to-[#0C0B09] border border-white/[0.05] rounded-2xl mb-10 flex items-center justify-center relative overflow-hidden group">
            {/* Gold ring glow */}
            <div className="absolute inset-0 opacity-60">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#D4AF6A]/20 rounded-full group-hover:scale-110 transition duration-700"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#D4AF6A]/10 rounded-full group-hover:scale-110 transition duration-700 delay-75"></div>
            </div>
            <img
              src={project.image}
              alt={project.title}
              className="relative z-10 max-h-[85%] max-w-[90%] object-contain drop-shadow-2xl group-hover:scale-[1.03] transition duration-700"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* Left Column - Text */}
            <div className="flex-1">
              <p className="font-['JetBrains_Mono'] text-[10px] font-bold tracking-[0.25em] text-[#D4AF6A] uppercase mb-3">
                {project.category}
              </p>
              <h2 className="font-['Fraunces'] text-3xl md:text-4xl font-semibold text-[#F4EFE6] mb-6">{project.title}</h2>
              <p className="text-[#9C958A] leading-relaxed mb-8 text-sm md:text-base">
                {project.description}
              </p>

              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/[0.06]">
                <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase text-[#6B655C]">Stack :</span>
                <div className="flex gap-3 text-sm text-[#D4AF6A]">
                  <span>{project.type}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Project Info Card */}
            <div className="w-full lg:w-80 bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 h-fit">
              <div className="space-y-5 text-sm">
                <InfoRow label="Type" value={project.type} />
                <InfoRow label="Client" value={project.client} />
                <InfoRow label="Duration" value={project.duration} />
                <InfoRow label="Task" value={project.task} />
                <InfoRow label="License" value={project.budget} />
              </div>

              <div className="flex gap-3 mt-8">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF6A] text-[#0C0B09] px-5 py-3 text-[11px] font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-[#EBCB8B] transition"
                >
                  Live <ArrowUpRight size={13} />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-[#D4AF6A]/40 text-[#D4AF6A] px-5 py-3 text-[11px] font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-[#D4AF6A] hover:text-[#0C0B09] transition"
                >
                  Code <FaGithub size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Footer - Share */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/[0.06] text-[#6B655C]">
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase">Share :</span>
            <FaFacebookF size={14} className="cursor-pointer hover:text-[#D4AF6A] transition" />
            <FaXTwitter size={14} className="cursor-pointer hover:text-[#D4AF6A] transition" />
            <FaLinkedinIn size={14} className="cursor-pointer hover:text-[#D4AF6A] transition" />
          </div>

        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.04] pb-3">
      <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] uppercase text-[#6B655C]">{label}</span>
      <span className="text-[#F4EFE6] text-right">{value}</span>
    </div>
  );
}
