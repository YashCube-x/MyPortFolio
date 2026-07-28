import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FolderKanban, Award, Wrench, Settings as SettingsIcon, LogOut, BarChart3, Mail, Menu, X } from "lucide-react";
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    api
      .get("/contact")
      .then((res) => setUnreadCount(res.data.data.filter((m) => !m.read).length))
      .catch(() => {});
  }, [location.pathname]);

  // Close the drawer whenever the route changes (nav link clicked, back/forward, etc.)
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileNavOpen]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const NavContent = () => (
    <>
      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 lg:py-2.5 rounded-full text-sm font-semibold transition ${
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
        className="flex items-center gap-3 px-4 py-3 lg:py-2.5 rounded-full text-sm font-semibold text-[#EF6C4A] hover:bg-[#EF6C4A]/10 transition"
      >
        <LogOut size={16} />
        Logout
      </button>
    </>
  );

  return (
    <div className="w-full min-h-[100dvh] bg-[#EFF8F7] font-sans lg:flex">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-[#1E8C86]/10 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-1">
          <h1 className="text-lg font-extrabold text-[#1E8C86]">Suyash</h1>
          <span className="text-lg font-extrabold text-[#FFD23F]">.</span>
          <span className="text-lg font-extrabold text-[#1E8C86]">Admin</span>
        </div>
        <button
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
          className="relative p-2.5 text-[#1E8C86] hover:bg-[#E8F6F5] rounded-full transition"
        >
          <Menu size={22} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 bg-[#EF6C4A] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileNavOpen(false)} />
          <aside className="relative w-72 max-w-[85vw] h-[100dvh] bg-white p-6 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1">
                <h1 className="text-xl font-extrabold text-[#1E8C86]">Suyash</h1>
                <span className="text-xl font-extrabold text-[#FFD23F]">.</span>
                <span className="text-xl font-extrabold text-[#1E8C86]">Admin</span>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
                className="p-2.5 text-[#5F7876] hover:bg-[#E8F6F5] rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>
            <NavContent />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-white border-r-2 border-[#1E8C86]/10 p-6 flex-col">
        <div className="flex items-center gap-1 mb-10">
          <h1 className="text-xl font-extrabold text-[#1E8C86]">Suyash</h1>
          <span className="text-xl font-extrabold text-[#FFD23F]">.</span>
          <span className="text-xl font-extrabold text-[#1E8C86]">Admin</span>
        </div>
        <NavContent />
      </aside>

      <main className="lg:flex-1 p-5 pt-20 sm:p-8 sm:pt-20 lg:p-10 lg:pt-10 overflow-y-auto lg:max-h-[100dvh]">
        <Outlet />
      </main>
    </div>
  );
}
