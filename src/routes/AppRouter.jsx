import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

// Protected Pages
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import Profile from "../pages/Profile";

// Protected Route Component
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes - with PublicLayout (Navbar, Body, Footer) */}
      <Route element={<PublicLayout />}>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <Home />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" replace /> : <Register />} 
        />
      </Route>

      {/* Protected Routes - with DashboardLayout (Navbar, Sidebar, Body, Footer) */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;