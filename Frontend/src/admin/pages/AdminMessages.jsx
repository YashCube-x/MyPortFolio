import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, ChevronDown, Phone } from "lucide-react";
import api from "../../lib/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const load = async () => {
    const res = await api.get("/contact");
    setMessages(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleExpand = async (msg) => {
    const opening = expandedId !== msg._id;
    setExpandedId(opening ? msg._id : null);

    if (opening && !msg.read) {
      const res = await api.patch(`/contact/${msg._id}/read`, { read: true });
      setMessages((prev) => prev.map((m) => (m._id === msg._id ? res.data.data : m)));
    }
  };

  const toggleRead = async (msg, e) => {
    e.stopPropagation();
    const res = await api.patch(`/contact/${msg._id}/read`, { read: !msg.read });
    setMessages((prev) => prev.map((m) => (m._id === msg._id ? res.data.data : m)));
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Delete this message?")) return;
    await api.delete(`/contact/${id}`);
    await load();
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-extrabold text-[#1E8C86]">Messages</h2>
        {unreadCount > 0 && (
          <span className="bg-[#EF6C4A] text-white text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-[#5F7876]">Loading...</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => {
            const expanded = expandedId === msg._id;
            return (
              <div
                key={msg._id}
                className={`bg-white border-l-[6px] rounded-xl shadow-[0_4px_20px_rgba(43,168,162,0.10)] transition ${
                  msg.read ? "border-[#3CC4BD]" : "border-[#EF6C4A]"
                }`}
              >
                <button
                  onClick={() => toggleExpand(msg)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-[#EF6C4A] shrink-0" />}
                    <div className="min-w-0">
                      <p className={`text-[#1E3B3A] truncate ${msg.read ? "font-medium" : "font-extrabold"}`}>
                        {msg.subject}
                      </p>
                      <p className="text-[#5F7876] text-xs font-semibold">
                        {msg.name} &middot; {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => toggleRead(msg, e)}
                      title={msg.read ? "Mark unread" : "Mark read"}
                      className="p-2 text-[#2BA8A2] hover:bg-[#E8F6F5] rounded-full transition"
                    >
                      {msg.read ? <Mail size={16} /> : <MailOpen size={16} />}
                    </button>
                    <button
                      onClick={(e) => handleDelete(msg._id, e)}
                      title="Delete"
                      className="p-2 text-[#EF6C4A] hover:bg-[#EF6C4A]/10 rounded-full transition"
                    >
                      <Trash2 size={16} />
                    </button>
                    <ChevronDown
                      size={16}
                      className={`text-[#5F7876] transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {expanded && (
                  <div className="px-4 pb-4 border-t border-[#1E8C86]/10 pt-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-[#5F7876] font-semibold mb-3">
                      <span className="flex items-center gap-1.5">
                        <Mail size={13} /> {msg.email}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone size={13} /> {msg.phone}
                      </span>
                    </div>
                    <p className="text-[#1E3B3A] text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  </div>
                )}
              </div>
            );
          })}
          {messages.length === 0 && <p className="text-[#9CB8B6] text-sm">No messages yet.</p>}
        </div>
      )}
    </div>
  );
}
