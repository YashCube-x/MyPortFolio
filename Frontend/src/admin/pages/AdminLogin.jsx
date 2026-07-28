import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import api from "../../lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#EFF8F7] px-4 font-sans">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border-2 border-[#1E8C86]/15 rounded-2xl p-8 shadow-[0_4px_20px_rgba(43,168,162,0.10)]"
      >
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-extrabold tracking-wide text-[#1E8C86]">Suyash</h1>
          <span className="text-2xl font-extrabold text-[#FFD23F] [text-shadow:1px_1px_0_#1E8C86]">.</span>
          <span className="text-2xl font-extrabold text-[#1E8C86]">Admin</span>
        </div>
        <p className="text-[#5F7876] text-sm mb-8">Sign in to manage your portfolio.</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#FFF8E7] border-2 border-[#1E8C86]/15 rounded-lg p-3 text-sm text-[#1E8C86] placeholder:text-[#9CB8B6] focus:outline-none focus:border-[#2BA8A2] focus:shadow-[0_0_0_4px_rgba(43,168,162,0.15)] transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-[#FFF8E7] border-2 border-[#1E8C86]/15 rounded-lg p-3 text-sm text-[#1E8C86] placeholder:text-[#9CB8B6] focus:outline-none focus:border-[#2BA8A2] focus:shadow-[0_0_0_4px_rgba(43,168,162,0.15)] transition"
          />
        </div>

        {error && (
          <p className="text-xs font-semibold text-[#E74C3C] mt-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#FFE47A] to-[#FFD23F] text-[#1E8C86] py-3.5 rounded-full text-xs font-extrabold tracking-[0.15em] uppercase shadow-[0_4px_20px_rgba(255,210,63,0.40)] hover:brightness-105 active:scale-95 transition disabled:opacity-50"
        >
          <LogIn size={14} />
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
