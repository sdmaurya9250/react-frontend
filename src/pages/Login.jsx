import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-black px-4 text-white">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-wide">
            Random<span className="text-indigo-400">Connect</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Login to start chatting instantly
          </p>
        </div>

        {/* Google Login */}
        <button
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
          {/* Continue with :contentReference[oaicite:0]{index=0} */}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Manual Login */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl bg-slate-800
                       outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-slate-800
                       outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          className="w-full mt-6 py-3 rounded-xl font-semibold
                     bg-indigo-600 hover:bg-indigo-700
                     transition transform hover:scale-[1.02]"
        >
          Login
        </button>

        {/* Register */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}
