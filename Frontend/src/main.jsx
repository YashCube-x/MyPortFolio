import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/NotFound";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminProjects from "./admin/pages/AdminProjects";
import AdminCertificates from "./admin/pages/AdminCertificates";
import AdminServices from "./admin/pages/AdminServices";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminAnalytics from "./admin/pages/AdminAnalytics";
import AdminMessages from "./admin/pages/AdminMessages";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScroll />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/analytics" replace />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
