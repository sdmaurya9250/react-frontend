import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import {useNavigate } from "react-router-dom";
// import axios from "axios";

export default function LoginModal({ onClose }) {

  const navigate = useNavigate();

  const loginWithGoogle = async () => {
  try {
      const result = await signInWithPopup(auth, googleProvider);
      // 1. Get the ID Token
      const idToken = await result.user.getIdToken();
      
      // 2. Send token to Node.js backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });
      const data = await response.json();
      console.log("Backend response:", data?.user?.name);
      onClose();
  localStorage.setItem("userName", data.user.name);
      navigate('/main-page',{
        state:{name: data?.user?.name}
      });

    } catch (error) {
      console.error("Login failed", error);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white/5 backdrop-blur-xl text-white
                      w-full max-w-md mx-4 p-8 rounded-2xl shadow-2xl
                      animate-fadeIn">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome to Random<span className="text-indigo-400">Connect</span>
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Login to start chatting instantly
        </p>

        {/* Google Login */}
        <button
        onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl
                     bg-white text-black font-medium
                     hover:bg-gray-200 transition mb-6"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.68 1.22 9.17 3.61l6.85-6.85C35.9 2.36 30.47 0 24 0 14.64 0 6.55 5.38 2.73 13.22l7.98 6.19C12.43 13.15 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9.02h12.4c-.54 2.91-2.16 5.38-4.6 7.05l7.04 5.48c4.12-3.8 6.46-9.4 6.46-15.8z"/>
            <path fill="#FBBC05" d="M10.71 28.41c-.48-1.45-.76-2.99-.76-4.41s.28-2.96.76-4.41l-7.98-6.19C.99 16.08 0 19.94 0 24s.99 7.92 2.73 11.19l7.98-6.78z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.9-2.14 15.87-5.81l-7.04-5.48c-1.95 1.31-4.45 2.09-8.83 2.09-6.26 0-11.57-3.65-13.29-8.91l-7.98 6.78C6.55 42.62 14.64 48 24 48z"/>
          </svg>
         Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-4">
          {/* <div className="flex-1 h-px bg-white/10"></div> */}
          {/* <span className="text-gray-400 text-sm">or</span> */}
          {/* <div className="flex-1 h-px bg-white/10"></div> */}
        </div>

        {/* Manual Login */}
        {/* <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-3 rounded-xl bg-slate-800 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-800 outline-none"
        />

        <button
          className="w-full py-3 bg-indigo-600 rounded-xl font-semibold
                     hover:bg-indigo-700 transition"
        >
          Login
        </button> */}
      </div>
    </div>
  );
}
