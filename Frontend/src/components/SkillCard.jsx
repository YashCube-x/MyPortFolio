export default function SkillCard({ skill }) {
  return (
    <div className="border rounded-lg p-4 text-center shadow">
      <p className="font-semibold">{skill}</p>
    </div>
  );
}
