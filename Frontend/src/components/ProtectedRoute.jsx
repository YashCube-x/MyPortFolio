import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../lib/api";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // checking | ok | fail

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      // Defer to a microtask so this still counts as an async callback, not a
      // synchronous setState during the effect body.
      Promise.resolve().then(() => setStatus("fail"));
      return;
    }

    api
      .get("/auth/me")
      .then(() => setStatus("ok"))
      .catch(() => {
        localStorage.removeItem("adminToken");
        setStatus("fail");
      });
  }, []);

  if (status === "checking") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#EFF8F7] text-[#5F7876] text-sm font-semibold font-sans">
        Checking session...
      </div>
    );
  }

  if (status === "fail") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
