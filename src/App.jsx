import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/component/Dashboard";
import VideoChat from "./pages/component/VideoChat";
// import { Dashboard } from "./pages/component/Dashboard";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main-page" element={<Dashboard />} />
      <Route path="/video-chat" element={<VideoChat />} />
    </Routes>
  );
}
