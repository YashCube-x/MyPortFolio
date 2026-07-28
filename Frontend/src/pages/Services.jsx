import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { Kicker, Title } from "../components/SectionHeading";
import api from "../lib/api";
import { getIcon } from "../lib/iconMap";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data.data));
  }, []);

  return (
    <section className="w-full min-h-[100dvh] bg-[#0C0B09] text-[#F4EFE6] font-['Outfit'] flex flex-col justify-center py-20 md:py-28 relative overflow-hidden">
      {/* Soft glow */}
      <div className="absolute bottom-0 left-[20%] w-[50%] h-[40%] bg-[#D4AF6A]/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-10 w-full relative z-10">
        <div className="text-center mb-14 md:mb-20 flex flex-col items-center">
          <Kicker className="mb-5">Service</Kicker>
          <Title>What I offer</Title>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service._id} {...service} index={String(i + 1).padStart(2, "0")} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, index, title, desc, tags }) {
  const Icon = getIcon(icon);
  return (
    <Reveal width="100%">
      {/*
        @container: this card adapts to its OWN rendered width (via @sm:/@md:
        variants below), not the viewport. Same card looks right whether it's
        one of two columns on desktop, full-width on mobile, or dropped into a
        narrower sidebar layout later — see responsive-design skill's
        container-queries reference.
      */}
      <div className="@container">
        <div className="group relative bg-[#12100D] border border-white/[0.06] p-8 @sm:p-10 rounded-lg h-full overflow-hidden hover:border-[#D4AF6A]/30 hover:-translate-y-2 transition-all duration-500">
          {/* Hover glow */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#D4AF6A]/[0.07] blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="flex items-start justify-between mb-8">
            <div className="w-14 h-14 border border-[#D4AF6A]/30 rounded-sm flex items-center justify-center text-[#D4AF6A] group-hover:bg-[#D4AF6A] group-hover:text-[#0C0B09] transition-colors duration-500">
              {/* Icon resolves to a stable component reference from a static map, not a new one per render */}
              {/* eslint-disable-next-line react-hooks/static-components */}
              <Icon size={26} strokeWidth={1.5} />
            </div>
            <span className="font-['Fraunces'] italic text-4xl text-white/[0.06] group-hover:text-[#D4AF6A]/20 transition-colors duration-500">
              {index}
            </span>
          </div>

          <h3 className="font-['Fraunces'] text-2xl @sm:text-3xl font-semibold mb-4 flex items-center gap-2">
            {title}
            <ArrowUpRight size={18} className="text-[#D4AF6A] opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
          </h3>

          <p className="text-[#9C958A] leading-relaxed text-sm mb-8">
            {desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-[#6B655C] group-hover:text-[#9C958A] transition-colors duration-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
