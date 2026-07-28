import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import api from "../../lib/api";
import { Input } from "../components/FormFields";
import FileUploadField from "../components/FileUploadField";

const EMPTY_FORM = {
  email: "",
  phone: "",
  location: "",
  social: { github: "", instagram: "", facebook: "", linkedin: "" },
  resumeUrl: "",
  resumePublicId: "",
};

export default function AdminSettings() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/settings").then((res) => {
      setForm({ ...EMPTY_FORM, ...res.data.data, social: { ...EMPTY_FORM.social, ...res.data.data.social } });
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await api.put("/settings", form);
      setForm({ ...EMPTY_FORM, ...res.data.data, social: { ...EMPTY_FORM.social, ...res.data.data.social } });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-[#5F7876]">Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-[#1E8C86] mb-8">Settings</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-[#2BA8A2]/20 rounded-2xl p-6 space-y-6 max-w-2xl shadow-[0_4px_20px_rgba(43,168,162,0.10)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        </div>
        <Input label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />

        <div>
          <h3 className="text-[#1E8C86] font-extrabold text-sm mb-3">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="GitHub"
              value={form.social.github}
              onChange={(v) => setForm({ ...form, social: { ...form.social, github: v } })}
            />
            <Input
              label="Instagram"
              value={form.social.instagram}
              onChange={(v) => setForm({ ...form, social: { ...form.social, instagram: v } })}
            />
            <Input
              label="Facebook"
              value={form.social.facebook}
              onChange={(v) => setForm({ ...form, social: { ...form.social, facebook: v } })}
            />
            <Input
              label="LinkedIn"
              value={form.social.linkedin}
              onChange={(v) => setForm({ ...form, social: { ...form.social, linkedin: v } })}
            />
          </div>
        </div>

        <FileUploadField
          label="Resume (PDF)"
          value={form.resumeUrl}
          accept="application/pdf"
          onUploaded={(url, publicId) => setForm({ ...form, resumeUrl: url, resumePublicId: publicId })}
        />

        {error && <p className="text-xs font-semibold text-[#E74C3C]">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-b from-[#FFE47A] to-[#FFD23F] text-[#1E8C86] px-6 py-2.5 rounded-full text-xs font-extrabold tracking-wide uppercase shadow-[0_4px_20px_rgba(255,210,63,0.40)] hover:brightness-105 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
          {saved && <CheckCircle2 size={14} className="text-[#27AE60]" />}
        </button>
      </form>
    </div>
  );
}
