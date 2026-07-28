import api from "./api";

const VISITOR_ID_KEY = "portfolio_visitor_id";
const SESSION_TRACKED_KEY = "portfolio_visit_tracked";

function getVisitorId() {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function getReferrer() {
  if (!document.referrer) return "direct";
  try {
    return new URL(document.referrer).hostname || "direct";
  } catch {
    return "direct";
  }
}

function getDevice() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? "mobile" : "desktop";
}

export function trackVisit(path = window.location.pathname) {
  // Only count once per browser tab session, not on every remount/reload loop.
  if (sessionStorage.getItem(SESSION_TRACKED_KEY)) return;
  sessionStorage.setItem(SESSION_TRACKED_KEY, "1");

  api
    .post("/analytics/visit", {
      visitorId: getVisitorId(),
      path,
      referrer: getReferrer(),
      device: getDevice(),
    })
    .catch(() => {
      // Analytics must never break the site for the visitor.
    });
}
