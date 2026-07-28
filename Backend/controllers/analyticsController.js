import Visit from "../models/Visit.js";
import Contact from "../models/Contact.js";

const ALLOWED_RANGES = [7, 30, 90];

export const recordVisit = async (req, res) => {
  try {
    const { visitorId, path, referrer, device } = req.body;

    if (!visitorId) {
      return res.status(400).json({ success: false, message: "visitorId is required" });
    }

    await Visit.create({
      visitorId,
      path: path || "/",
      referrer: referrer || "direct",
      device: device === "mobile" ? "mobile" : "desktop",
    });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Record Visit Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAnalyticsSummary = async (req, res) => {
  try {
    const days = ALLOWED_RANGES.includes(Number(req.query.days)) ? Number(req.query.days) : 7;

    const [totalVisits, uniqueVisitorIds, totalMessages, unreadMessages] = await Promise.all([
      Visit.countDocuments(),
      Visit.distinct("visitorId"),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false }),
    ]);

    const since = new Date();
    since.setUTCHours(0, 0, 0, 0);
    since.setUTCDate(since.getUTCDate() - (days - 1));

    const [grouped, referrerGroups, deviceGroups] = await Promise.all([
      Visit.aggregate([
        { $match: { createdAt: { $gte: since } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "UTC" } },
            count: { $sum: 1 },
          },
        },
      ]),
      Visit.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: "$referrer", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      Visit.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: "$device", count: { $sum: 1 } } },
      ]),
    ]);

    const countsByDay = Object.fromEntries(grouped.map((g) => [g._id, g.count]));

    const trend = Array.from({ length: days }, (_, i) => {
      const d = new Date(since);
      d.setUTCDate(since.getUTCDate() + i);
      const key = d.toISOString().slice(0, 10);
      return { date: key, count: countsByDay[key] || 0 };
    });

    const topReferrers = referrerGroups.map((g) => ({ referrer: g._id || "direct", count: g.count }));

    const deviceCounts = { desktop: 0, mobile: 0 };
    deviceGroups.forEach((g) => {
      deviceCounts[g._id] = g.count;
    });

    res.json({
      success: true,
      data: {
        totalVisits,
        uniqueVisitors: uniqueVisitorIds.length,
        totalMessages,
        unreadMessages,
        rangeDays: days,
        trend,
        topReferrers,
        deviceCounts,
      },
    });
  } catch (error) {
    console.error("Analytics Summary Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
