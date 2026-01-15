import { useState } from "react";
import LoginModal from "./LoginModal";
import logo from "../blink.png";
export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="min-h-screen bg-slate-950 text-white">

<header className="absolute top-0 left-0 w-full z-20 px-8 py-6 flex justify-between items-center">
  {/* Logo + Name Group (Left) */}
  <div className="flex items-center gap-3">
    {/* Circle Logo */}
    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 bg-white flex items-center justify-center">
      <img 
        className="w-full h-full object-cover" 
        src={logo}
        alt="Blink Logo" 
      />
    </div>
    
    {/* Website Name */}
    <span className="text-2xl font-bold tracking-tight text-white">
      Blink
    </span>
  </div>

  {/* Login Button (Right) */}
  <button
    onClick={() => setShowLogin(true)}
    className="px-5 py-2 text-sm font-semibold text-white bg-transparent border border-gray-400 rounded-full hover:bg-white hover:text-black transition-all duration-300"
  >
    Login
  </button>
</header>

      {/* Main Section */}
      <div className="flex min-h-screen">

        {/* LEFT IMAGE / VIDEO */}
        <div className="relative w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
            alt="People chatting"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-center w-full md:w-1/2 px-10 md:px-16">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Meet Random People <br />
            <span className="text-indigo-400">
              Anytime, Anywhere
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-md mb-10">
            Instantly connect with strangers around the world.
            No signup required. Just tap and start chatting.
          </p>

          <button
            className="w-fit px-10 py-4 rounded-full text-lg font-semibold
                       bg-indigo-600 hover:bg-indigo-700
                       transition transform hover:scale-105"
          >
            Start Chatting
          </button>

          <p className="mt-6 text-sm text-gray-400">
            Anonymous • Fast • Secure
          </p>
        </div>
      </div>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}
