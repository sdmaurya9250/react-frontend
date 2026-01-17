import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/component/Dashboard";
import { useAuthUser } from "./hook/useAuthUser";

export default function App() {
  const { data: user, isLoading } = useAuthUser();

if (isLoading)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin"></div>
      </div>
    </div>
  );



  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={user ? <Navigate to="/main-page" /> : <Home />} />
      {/* Protected Routes */}
      <Route
        path="/main-page"
        element={user ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
