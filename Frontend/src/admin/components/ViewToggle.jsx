import { List, LayoutGrid } from "lucide-react";

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-white border-2 border-[#2BA8A2]/20 rounded-full p-1">
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-label="List view"
        className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
          view === "list"
            ? "bg-[#2BA8A2] text-white shadow-[0_4px_20px_rgba(43,168,162,0.30)]"
            : "text-[#5F7876] hover:bg-[#E8F6F5]"
        }`}
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => onChange("card")}
        aria-label="Card view"
        className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
          view === "card"
            ? "bg-[#2BA8A2] text-white shadow-[0_4px_20px_rgba(43,168,162,0.30)]"
            : "text-[#5F7876] hover:bg-[#E8F6F5]"
        }`}
      >
        <LayoutGrid size={16} />
      </button>
    </div>
  );
}
