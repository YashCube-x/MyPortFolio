import { useEffect, useState } from "react";
import { Users, Eye, MessageSquare, Monitor, Smartphone } from "lucide-react";
import api from "../../lib/api";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const RANGES = [
  { days: 7, label: "7D" },
  { days: 30, label: "30D" },
  { days: 90, label: "90D" },
];

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(7);

  useEffect(() => {
    api.get(`/analytics/summary?days=${range}`).then((res) => {
      setData(res.data.data);
      setLoading(false);
    });
  }, [range]);

  if (loading || !data) return <p className="text-[#5F7876]">Loading...</p>;

  const maxCount = Math.max(1, ...data.trend.map((d) => d.count));
  // Show a label under every bar for 7D; thin out labels for longer ranges so they don't collide.
  const labelStride = range === 7 ? 1 : range === 30 ? 5 : 15;

  const totalReferrerVisits = data.topReferrers.reduce((sum, r) => sum + r.count, 0) || 1;

  const totalDeviceVisits = (data.deviceCounts.desktop || 0) + (data.deviceCounts.mobile || 0);
  const desktopPct = totalDeviceVisits ? Math.round((data.deviceCounts.desktop / totalDeviceVisits) * 100) : 0;
  const mobilePct = 100 - desktopPct;

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-[#1E8C86] mb-8">Analytics</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
        <StatCard icon={Eye} label="Total Visits" value={data.totalVisits} accent="#2BA8A2" accentBg="#E8F6F5" />
        <StatCard icon={Users} label="Unique Visitors" value={data.uniqueVisitors} accent="#3B8FC2" accentBg="#E3F1FA" />
        <StatCard icon={MessageSquare} label="Contact Submissions" value={data.totalMessages} accent="#E6B800" accentBg="#FFF8E7" />
        <StatCard icon={MessageSquare} label="Unread Messages" value={data.unreadMessages} accent="#EF6C4A" accentBg="#FDECE7" />
      </div>

      <div className="bg-white border-2 border-[#2BA8A2]/20 rounded-2xl p-6 shadow-[0_4px_20px_rgba(43,168,162,0.10)] mb-6 overflow-x-hidden">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h3 className="text-[#1E8C86] font-extrabold text-sm">Visits Trend</h3>
          <div className="flex items-center gap-1 bg-[#EFF8F7] rounded-full p-1">
            {RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setRange(r.days)}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition ${
                  range === r.days
                    ? "bg-[#2BA8A2] text-white shadow-[0_4px_20px_rgba(43,168,162,0.30)]"
                    : "text-[#5F7876] hover:text-[#1E8C86]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between gap-[3px] h-40">
          {data.trend.map((d, i) => {
            const heightPct = Math.max(4, (d.count / maxCount) * 100);
            const showLabel = i % labelStride === 0 || i === data.trend.length - 1;
            const label =
              range === 7
                ? DAY_LABELS[new Date(`${d.date}T00:00:00Z`).getUTCDay()]
                : new Date(`${d.date}T00:00:00Z`).getUTCDate();
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-2 group relative min-w-0">
                <div className="relative w-full flex flex-col justify-end h-32">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1E3B3A] text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                    {d.count} {d.count === 1 ? "visit" : "visits"}
                  </div>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#1E8C86] to-[#3CC4BD] transition-all"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#5F7876] h-3">
                  {showLabel ? label : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-[#2BA8A2]/20 rounded-2xl p-6 shadow-[0_4px_20px_rgba(43,168,162,0.10)]">
          <h3 className="text-[#1E8C86] font-extrabold text-sm mb-5">Top Referrers</h3>
          {data.topReferrers.length === 0 ? (
            <p className="text-[#9CB8B6] text-sm">No referrer data yet.</p>
          ) : (
            <div className="space-y-3">
              {data.topReferrers.map((r) => (
                <div key={r.referrer}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#1E3B3A]">{r.referrer}</span>
                    <span className="font-semibold text-[#5F7876]">{r.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#EFF8F7] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#1E8C86] to-[#3CC4BD]"
                      style={{ width: `${(r.count / totalReferrerVisits) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border-2 border-[#2BA8A2]/20 rounded-2xl p-6 shadow-[0_4px_20px_rgba(43,168,162,0.10)]">
          <h3 className="text-[#1E8C86] font-extrabold text-sm mb-5">Devices</h3>
          {totalDeviceVisits === 0 ? (
            <p className="text-[#9CB8B6] text-sm">No device data yet.</p>
          ) : (
            <>
              <div className="flex h-3 rounded-full overflow-hidden gap-[2px] mb-5">
                <div className="bg-[#2BA8A2]" style={{ width: `${desktopPct}%` }} />
                <div className="bg-[#5DADE2]" style={{ width: `${mobilePct}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor size={16} className="text-[#2BA8A2]" />
                  <span className="text-sm font-bold text-[#1E3B3A]">Desktop</span>
                </div>
                <span className="text-sm font-extrabold text-[#2BA8A2]">{desktopPct}%</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <Smartphone size={16} className="text-[#3B8FC2]" />
                  <span className="text-sm font-bold text-[#1E3B3A]">Mobile</span>
                </div>
                <span className="text-sm font-extrabold text-[#3B8FC2]">{mobilePct}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent, accentBg }) {
  return (
    <div className="bg-white border-l-[6px] rounded-xl p-5 shadow-[0_4px_20px_rgba(43,168,162,0.10)]" style={{ borderColor: accent }}>
      <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: accentBg }}>
        <Icon size={20} style={{ color: accent }} />
      </div>
      <p className="text-3xl font-extrabold text-[#1E3B3A]">{value.toLocaleString()}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#5F7876] mt-1">{label}</p>
    </div>
  );
}
