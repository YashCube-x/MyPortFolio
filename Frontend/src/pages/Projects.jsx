import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section className="px-12 py-20">
      <h2 className="text-4xl font-bold mb-10">
        My <span className="text-green-400">Portfolio</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <ProjectCard title="Urban Issue Detector" />
        <ProjectCard title="Weather App" />
        <ProjectCard title="Tic Tac Toe" />
      </div>
    </section>
  );
}
