import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import api from "../../lib/api";

export default function FileUploadField({ label, value, accept = "image/*", onUploaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/upload", formData);
      onUploaded(res.data.url, res.data.publicId);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const isPdf = accept.includes("pdf");

  return (
    <div>
      <label className="block text-xs font-bold tracking-wide uppercase text-[#5F7876] mb-2">
        {label}
      </label>

      <div className="flex items-center gap-4">
        {value ? (
          isPdf ? (
            <div className="flex items-center gap-2 text-[#2BA8A2] text-xs font-semibold">
              <FileText size={16} />
              <a href={value} target="_blank" rel="noopener noreferrer" className="underline">
                View current file
              </a>
            </div>
          ) : (
            <img src={value} alt="preview" className="w-16 h-16 object-cover rounded-lg border-2 border-[#1E8C86]/15" />
          )
        ) : (
          <div className="w-16 h-16 flex items-center justify-center rounded-lg border-2 border-dashed border-[#2BA8A2]/30 text-[#2BA8A2]/60">
            <UploadCloud size={20} />
          </div>
        )}

        <label className="cursor-pointer bg-white border-2 border-[#2BA8A2]/30 text-[#1E8C86] px-4 py-2 rounded-full text-xs font-extrabold tracking-wide uppercase hover:bg-[#E8F6F5] hover:border-[#2BA8A2] transition">
          {loading ? "Uploading..." : value ? "Replace" : "Upload"}
          <input type="file" accept={accept} onChange={handleChange} className="hidden" disabled={loading} />
        </label>

        {!loading && value && !error && <CheckCircle2 size={16} className="text-[#27AE60]" />}
      </div>

      {error && <p className="text-xs font-semibold text-[#E74C3C] mt-2">{error}</p>}
    </div>
  );
}
