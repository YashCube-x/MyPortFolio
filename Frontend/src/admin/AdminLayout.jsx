import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FolderKanban, Award, Wrench, Settings as SettingsIcon, LogOut, BarChart3, Mail } from "lucide-react";
import api from "../lib/api";

const NAV_ITEMS = [
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    api
      .get("/contact")
      .then((res) => setUnreadCount(res.data.data.filter((m) => !m.read).length))
      .catch(() => {});
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="w-full min-h-[100dvh] flex bg-[#EFF8F7] font-sans">
      <aside className="w-64 shrink-0 bg-white border-r-2 border-[#1E8C86]/10 p-6 flex flex-col">
        <div className="flex items-center gap-1 mb-10">
          <h1 className="text-xl font-extrabold text-[#1E8C86]">Suyash</h1>
          <span className="text-xl font-extrabold text-[#FFD23F]">.</span>
          <span className="text-xl font-extrabold text-[#1E8C86]">Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#2BA8A2] text-white shadow-[0_4px_20px_rgba(43,168,162,0.30)]"
                    : "text-[#5F7876] hover:bg-[#E8F6F5] hover:text-[#1E8C86]"
                }`
              }
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {to === "/admin/messages" && unreadCount > 0 && (
                <span className="bg-[#EF6C4A] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-semibold text-[#EF6C4A] hover:bg-[#EF6C4A]/10 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 md:p-10 overflow-y-auto max-h-[100dvh]">
        <Outlet />
      </main>
    </div>
  );
}
