export function Input({ label, value, onChange, required, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-bold tracking-wide uppercase text-[#5F7876] mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-[#FFF8E7] border-2 border-[#1E8C86]/15 rounded-lg p-2.5 text-sm text-[#1E3B3A] focus:outline-none focus:border-[#2BA8A2] focus:shadow-[0_0_0_4px_rgba(43,168,162,0.15)] transition"
      />
    </div>
  );
}

export function Textarea({ label, value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs font-bold tracking-wide uppercase text-[#5F7876] mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={3}
        className="w-full bg-[#FFF8E7] border-2 border-[#1E8C86]/15 rounded-lg p-2.5 text-sm text-[#1E3B3A] focus:outline-none focus:border-[#2BA8A2] focus:shadow-[0_0_0_4px_rgba(43,168,162,0.15)] transition resize-none"
      />
    </div>
  );
}
