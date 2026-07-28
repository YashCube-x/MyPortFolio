import SplitText from "./SplitText";

// Shared section header: mono gold kicker + serif display title.
// tone="dark" (default) for dark sections, tone="light" for ivory sections.
export function Kicker({ children, className = "", tone = "dark" }) {
  const text = tone === "light" ? "text-[#A9832F]" : "text-[#D4AF6A]";
  const line = tone === "light" ? "bg-[#A9832F]/60" : "bg-[#D4AF6A]/60";
  return (
    <p className={`flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] md:text-xs tracking-[0.35em] uppercase ${text} ${className}`}>
      <span className={`inline-block w-8 h-[1px] ${line}`} />
      {children}
    </p>
  );
}

export function Title({ children, className = "", delay = 0, tone = "dark" }) {
  const text = tone === "light" ? "text-[#17150F]" : "text-[#F4EFE6]";
  return (
    <h2 className={`font-['Fraunces'] font-semibold text-3xl md:text-5xl lg:text-6xl leading-[1.05] ${text} ${className}`}>
      <SplitText delay={delay}>{children}</SplitText>
    </h2>
  );
}
