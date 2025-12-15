export default function ProjectCard({ title }) {
  return (
    <div className="bg-[#111827] rounded-xl p-6 hover:scale-105 transition border border-green-400/20">
      <div className="h-40 bg-black rounded mb-4"></div>
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );
}
