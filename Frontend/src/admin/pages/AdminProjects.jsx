import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, ImageOff, ArrowUp, ArrowDown } from "lucide-react";
import api from "../../lib/api";
import FileUploadField from "../components/FileUploadField";
import { Input, Textarea } from "../components/FormFields";
import ViewToggle from "../components/ViewToggle";

const EMPTY_FORM = {
  title: "",
  category: "",
  type: "",
  client: "Personal Project",
  duration: "",
  task: "",
  budget: "",
  description: "",
  github: "",
  demo: "",
  image: "",
  imagePublicId: "",
  order: 0,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("list");

  const load = async () => {
    setLoading(true);
    const res = await api.get("/projects");
    setProjects(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm({ ...EMPTY_FORM, order: projects.length + 1 });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (project) => {
    setForm({ ...EMPTY_FORM, ...project });
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, form);
      } else {
        await api.post("/projects", form);
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await api.delete(`/projects/${id}`);
    await load();
  };

  const handleReorder = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const current = projects[index];
    const target = projects[targetIndex];

    const currentOrder = current.order || index + 1;
    const targetOrder = target.order || targetIndex + 1;

    const newCurrentOrder = currentOrder === targetOrder ? targetOrder + direction : targetOrder;
    const newTargetOrder = currentOrder;

    try {
      await api.put(`/projects/${current._id}`, { ...current, order: newCurrentOrder });
      await api.put(`/projects/${target._id}`, { ...target, order: newTargetOrder });
      await load();
    } catch (err) {
      console.error("Reorder error:", err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h2 className="text-3xl font-extrabold text-[#1E8C86]">Projects</h2>
        <div className="flex items-center gap-3">
          <ViewToggle view={view} onChange={setView} />
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-gradient-to-b from-[#FFE47A] to-[#FFD23F] text-[#1E8C86] px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-[0_4px_20px_rgba(255,210,63,0.40)] hover:brightness-105 active:scale-95 transition"
          >
            <Plus size={14} /> Add Project
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#2BA8A2]/20 rounded-2xl p-6 mb-8 space-y-4 shadow-[0_4px_20px_rgba(43,168,162,0.10)]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[#1E8C86] font-extrabold">{editingId ? "Edit Project" : "New Project"}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-[#5F7876] hover:text-[#EF6C4A] transition">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
            <Input label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} required />
            <Input label="Display Order (1, 2, 3...)" type="number" value={form.order} onChange={(v) => setForm({ ...form, order: Number(v) })} />
            <Input label="Type" value={form.type} onChange={(v) => setForm({ ...form, type: v })} />
            <Input label="Client" value={form.client} onChange={(v) => setForm({ ...form, client: v })} />
            <Input label="Duration" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} />
            <Input label="Task" value={form.task} onChange={(v) => setForm({ ...form, task: v })} />
            <Input label="Budget" value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} />
            <Input label="GitHub Link" value={form.github} onChange={(v) => setForm({ ...form, github: v })} />
            <Input label="Demo Link" value={form.demo} onChange={(v) => setForm({ ...form, demo: v })} />
          </div>

          <Textarea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />

          <FileUploadField
            label="Project Thumbnail / Image (Upload File or Paste Google Drive Link)"
            value={form.image}
            accept="image/*"
            onUploaded={(url, publicId) => setForm({ ...form, image: url, imagePublicId: publicId })}
          />

          {error && <p className="text-xs font-semibold text-[#E74C3C]">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-b from-[#FFE47A] to-[#FFD23F] text-[#1E8C86] px-6 py-2.5 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-[0_4px_20px_rgba(255,210,63,0.40)] hover:brightness-105 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Project"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-[#5F7876]">Loading...</p>
      ) : view === "list" ? (
        <div className="space-y-3">
          {projects.map((p, idx) => (
            <div
              key={p._id}
              className="flex items-center justify-between gap-3 bg-white border-l-[6px] border-[#3CC4BD] rounded-xl p-4 shadow-[0_4px_20px_rgba(43,168,162,0.10)]"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="font-mono text-xs font-bold text-[#1E8C86] bg-[#E8F6F5] px-2.5 py-1 rounded-md shrink-0">
                  #{idx + 1}
                </span>
                {p.image && (
                  <img src={p.image} alt={p.title} className="w-10 h-10 rounded-md object-cover border shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[#1E3B3A] font-bold truncate">{p.title}</p>
                  <p className="text-[#5F7876] text-xs font-semibold uppercase tracking-wide truncate">{p.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleReorder(idx, -1)}
                  title="Move Up"
                  className="p-2 text-[#1E8C86] hover:bg-[#E8F6F5] rounded-full transition disabled:opacity-30 cursor-pointer"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  disabled={idx === projects.length - 1}
                  onClick={() => handleReorder(idx, 1)}
                  title="Move Down"
                  className="p-2 text-[#1E8C86] hover:bg-[#E8F6F5] rounded-full transition disabled:opacity-30 cursor-pointer"
                >
                  <ArrowDown size={16} />
                </button>
                <button onClick={() => openEdit(p)} className="p-2.5 text-[#2BA8A2] hover:bg-[#E8F6F5] rounded-full transition">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(p._id)} className="p-2.5 text-[#EF6C4A] hover:bg-[#EF6C4A]/10 rounded-full transition">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-[#9CB8B6] text-sm">No projects yet.</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, idx) => (
            <div
              key={p._id}
              className="bg-white border-l-[6px] border-[#3CC4BD] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(43,168,162,0.10)] flex flex-col"
            >
              <div className="w-full aspect-video bg-[#E8F6F5] flex items-center justify-center overflow-hidden relative">
                <span className="absolute top-2 left-2 font-mono text-xs font-bold text-[#1E8C86] bg-white/90 px-2 py-0.5 rounded shadow">
                  #{idx + 1}
                </span>
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageOff size={24} className="text-[#9CB8B6]" />
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-[#5F7876] text-xs font-semibold uppercase tracking-wide mb-1">{p.category}</p>
                <p className="text-[#1E3B3A] font-bold mb-3">{p.title}</p>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => openEdit(p)} className="p-2.5 text-[#2BA8A2] hover:bg-[#E8F6F5] rounded-full transition">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="p-2.5 text-[#EF6C4A] hover:bg-[#EF6C4A]/10 rounded-full transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-[#9CB8B6] text-sm">No projects yet.</p>}
        </div>
      )}
    </div>
  );
}
