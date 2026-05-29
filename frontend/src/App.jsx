import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";

import WorkerLogin from "./pages/WorkerLogin";
import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerProtectedRoute from "./components/WorkerProtectedRoute";

function App() {
  // Dark mode removed — no-op
  return (
    <BrowserRouter>
      {/* dark mode toggle removed */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route
          path="/worker-dashboard"
          element={
            <WorkerProtectedRoute>
              <WorkerDashboard />
            </WorkerProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
