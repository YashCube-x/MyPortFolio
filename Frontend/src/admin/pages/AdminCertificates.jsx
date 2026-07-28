import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, ImageOff } from "lucide-react";
import api from "../../lib/api";
import FileUploadField from "../components/FileUploadField";
import { Input, Textarea } from "../components/FormFields";
import ViewToggle from "../components/ViewToggle";

const EMPTY_FORM = {
  title: "",
  year: "",
  desc: "",
  link: "",
  image: "",
  imagePublicId: "",
};

export default function AdminCertificates() {
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
    const res = await api.get("/certificates");
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
    setForm({ ...EMPTY_FORM, ...item });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await api.put(`/certificates/${editingId}`, form);
      } else {
        await api.post("/certificates", form);
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
    if (!confirm("Delete this certificate?")) return;
    await api.delete(`/certificates/${id}`);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h2 className="text-3xl font-extrabold text-[#1E8C86]">Certificates</h2>
        <div className="flex items-center gap-3">
          <ViewToggle view={view} onChange={setView} />
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-gradient-to-b from-[#FFE47A] to-[#FFD23F] text-[#1E8C86] px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-[0_4px_20px_rgba(255,210,63,0.40)] hover:brightness-105 active:scale-95 transition"
          >
            <Plus size={14} /> Add Certificate
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#2BA8A2]/20 rounded-2xl p-6 mb-8 space-y-4 shadow-[0_4px_20px_rgba(43,168,162,0.10)]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[#1E8C86] font-extrabold">{editingId ? "Edit Certificate" : "New Certificate"}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-[#5F7876] hover:text-[#EF6C4A] transition">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
            <Input label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} required />
            <Input label="Verify Link" value={form.link} onChange={(v) => setForm({ ...form, link: v })} />
          </div>

          <Textarea label="Description" value={form.desc} onChange={(v) => setForm({ ...form, desc: v })} required />

          <FileUploadField
            label="Certificate Image"
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
            {saving ? "Saving..." : "Save Certificate"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-[#5F7876]">Loading...</p>
      ) : view === "list" ? (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white border-l-[6px] border-[#FFD23F] rounded-xl p-4 shadow-[0_4px_20px_rgba(43,168,162,0.10)]"
            >
              <div>
                <p className="text-[#1E3B3A] font-bold">{item.title}</p>
                <p className="text-[#E6B800] text-xs font-bold">{item.year}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="p-2 text-[#2BA8A2] hover:bg-[#E8F6F5] rounded-full transition">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-[#EF6C4A] hover:bg-[#EF6C4A]/10 rounded-full transition">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-[#9CB8B6] text-sm">No certificates yet.</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border-l-[6px] border-[#FFD23F] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(43,168,162,0.10)] flex flex-col"
            >
              <div className="w-full aspect-video bg-[#FFF8E7] flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageOff size={24} className="text-[#E6B800]/50" />
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-[#E6B800] text-xs font-bold mb-1">{item.year}</p>
                <p className="text-[#1E3B3A] font-bold mb-3">{item.title}</p>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => openEdit(item)} className="p-2 text-[#2BA8A2] hover:bg-[#E8F6F5] rounded-full transition">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-[#EF6C4A] hover:bg-[#EF6C4A]/10 rounded-full transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-[#9CB8B6] text-sm">No certificates yet.</p>}
        </div>
      )}
    </div>
  );
}
