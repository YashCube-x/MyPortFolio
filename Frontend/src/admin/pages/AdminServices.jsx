import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import api from "../../lib/api";
import { Input, Textarea } from "../components/FormFields";
import { ICON_MAP, ICON_NAMES, getIcon } from "../../lib/iconMap";
import ViewToggle from "../components/ViewToggle";

const EMPTY_FORM = {
  icon: "Code2",
  title: "",
  desc: "",
  tags: "",
};

export default function AdminServices() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("list");

  const load = async () => {
    setLoading(true);
    const res = await api.get("/services");
    setItems(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setForm({ ...item, tags: item.tags.join(", ") });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, payload);
      } else {
        await api.post("/services", payload);
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
    if (!confirm("Delete this service?")) return;
    await api.delete(`/services/${id}`);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h2 className="text-3xl font-extrabold text-[#1E8C86]">Services</h2>
        <div className="flex items-center gap-3">
          <ViewToggle view={view} onChange={setView} />
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-gradient-to-b from-[#FFE47A] to-[#FFD23F] text-[#1E8C86] px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-[0_4px_20px_rgba(255,210,63,0.40)] hover:brightness-105 active:scale-95 transition"
          >
            <Plus size={14} /> Add Service
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#2BA8A2]/20 rounded-2xl p-6 mb-8 space-y-4 shadow-[0_4px_20px_rgba(43,168,162,0.10)]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[#1E8C86] font-extrabold">{editingId ? "Edit Service" : "New Service"}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-[#5F7876] hover:text-[#EF6C4A] transition">
              <X size={18} />
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wide uppercase text-[#5F7876] mb-2">
              Icon
            </label>
            <div className="grid grid-cols-8 gap-2">
              {ICON_NAMES.map((name) => {
                const Icon = ICON_MAP[name];
                const active = form.icon === name;
                return (
                  <button
                    type="button"
                    key={name}
                    title={name}
                    onClick={() => setForm({ ...form, icon: name })}
                    className={`aspect-square flex items-center justify-center rounded-lg border-2 transition ${
                      active
                        ? "border-[#5DADE2] bg-[#5DADE2]/10 text-[#3B8FC2] shadow-[0_4px_16px_rgba(93,173,226,0.30)]"
                        : "border-[#1E8C86]/10 text-[#5F7876] hover:border-[#2BA8A2]/40"
                    }`}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </div>

          <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <Textarea label="Description" value={form.desc} onChange={(v) => setForm({ ...form, desc: v })} required />
          <Input
            label="Tags (comma separated)"
            value={form.tags}
            onChange={(v) => setForm({ ...form, tags: v })}
          />

          {error && <p className="text-xs font-semibold text-[#E74C3C]">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-b from-[#FFE47A] to-[#FFD23F] text-[#1E8C86] px-6 py-2.5 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-[0_4px_20px_rgba(255,210,63,0.40)] hover:brightness-105 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Service"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-[#5F7876]">Loading...</p>
      ) : view === "list" ? (
        <div className="space-y-3">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item._id}
                className="flex items-center justify-between gap-3 bg-white border-l-[6px] border-[#5DADE2] rounded-xl p-4 shadow-[0_4px_20px_rgba(43,168,162,0.10)]"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Icon size={18} className="text-[#3B8FC2] shrink-0" />
                  <p className="text-[#1E3B3A] font-bold truncate">{item.title}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(item)} className="p-2.5 text-[#2BA8A2] hover:bg-[#E8F6F5] rounded-full transition">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2.5 text-[#EF6C4A] hover:bg-[#EF6C4A]/10 rounded-full transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && <p className="text-[#9CB8B6] text-sm">No services yet.</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item._id}
                className="bg-white border-l-[6px] border-[#5DADE2] rounded-xl p-5 shadow-[0_4px_20px_rgba(43,168,162,0.10)] flex flex-col"
              >
                <div className="w-11 h-11 rounded-lg bg-[#5DADE2]/10 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-[#3B8FC2]" />
                </div>
                <p className="text-[#1E3B3A] font-bold mb-2">{item.title}</p>
                <p className="text-[#5F7876] text-xs leading-relaxed mb-3 line-clamp-3">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 bg-[#E8F6F5] text-[#1E8C86] rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => openEdit(item)} className="p-2.5 text-[#2BA8A2] hover:bg-[#E8F6F5] rounded-full transition">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2.5 text-[#EF6C4A] hover:bg-[#EF6C4A]/10 rounded-full transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && <p className="text-[#9CB8B6] text-sm">No services yet.</p>}
        </div>
      )}
    </div>
  );
}
