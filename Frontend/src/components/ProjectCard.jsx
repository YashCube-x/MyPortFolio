export default function ProjectCard({ title }) {
  return (
    <div className="bg-white rounded-xl p-6 hover:scale-105 transition border border-[#C6A15B]/20 shadow-sm">
      <div className="h-40 bg-[#F0EBE0] rounded mb-4"></div>
      <h3 className="font-semibold text-lg text-[#14130F]">{title}</h3>
    </div>
  );
}
