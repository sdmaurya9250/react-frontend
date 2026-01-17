import { useState } from "react";
import LoginModal from "./LoginModal";
import logo from "../blink.png";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
const [openMenu, setOpenMenu] = useState(false);
const navigate = useNavigate();

const toggleFaq = (i) => {
  setOpenFaq(openFaq === i ? null : i);
};

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="absolute top-0 left-0 w-full z-20 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 bg-white">
            <img className="w-full h-full object-cover" src={logo} alt="Blink" />
          </div>
          <span className="text-2xl font-bold">Blink</span>
        </div>

<div className="relative flex items-center gap-4">
  {/* Hamburger */}
  <button
    onClick={() => setOpenMenu(!openMenu)}
    className="flex flex-col gap-1"
  >
    <span className="w-6 h-0.5 bg-white"></span>
    <span className="w-6 h-0.5 bg-white"></span>
    <span className="w-6 h-0.5 bg-white"></span>
  </button>

  {/* Popup Menu */}
{openMenu && (
  <div className="absolute right-0 top-12 bg-slate-900/95 backdrop-blur border border-indigo-500/30 
                  rounded-2xl w-56 overflow-hidden shadow-2xl z-50">
    
    <div className="px-4 py-3 text-sm font-semibold text-indigo-400 border-b border-white/10">
      Menu
    </div>

    <button
      onClick={() => { navigate("/about"); setOpenMenu(false); }}
      className="group w-full text-left px-5 py-3 text-base hover:bg-indigo-600/20 transition flex justify-between"
    >
      <span className="group-hover:text-indigo-400">About</span>
      <span className="opacity-0 group-hover:opacity-100">→</span>
    </button>

    <button
      onClick={() => { navigate("/terms"); setOpenMenu(false); }}
      className="group w-full text-left px-5 py-3 text-base hover:bg-indigo-600/20 transition flex justify-between"
    >
      <span className="group-hover:text-indigo-400">Terms</span>
      <span className="opacity-0 group-hover:opacity-100">→</span>
    </button>

    <button
      onClick={() => { navigate("/privacy"); setOpenMenu(false); }}
      className="group w-full text-left px-5 py-3 text-base hover:bg-indigo-600/20 transition flex justify-between"
    >
      <span className="group-hover:text-indigo-400">Privacy Policy</span>
      <span className="opacity-0 group-hover:opacity-100">→</span>
    </button>
  </div>
)}



  {/* Login */}
  <button
    onClick={() => setShowLogin(true)}
    className="px-5 py-2 text-sm font-semibold border border-gray-400 rounded-full hover:bg-white hover:text-black transition"
  >
    Login
  </button>
</div>

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

        {/* FEATURES */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { t: "🌍 Global", d: "Connect with people worldwide instantly." },
            { t: "⚡ Fast", d: "Real-time chat with no delay." },
            { t: "🔒 Private", d: "Anonymous & secure conversations." },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/5 p-8 rounded-2xl text-center
                         hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{f.t}</h3>
              <p className="text-gray-300 text-sm">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

{/* FAQ */}
<section className="py-20 px-6 bg-slate-900">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

    <div className="space-y-4">
      {[
        {
          q: "Is Blink really anonymous?",
          a: "Yes. We do not ask for signup or personal information."
        },
        {
          q: "Is it free to use?",
          a: "100% free. No hidden charges."
        },
        {
          q: "Can I choose who I talk to?",
          a: "Random matching for now. Filters coming soon."
        },
        {
          q: "Is my chat safe?",
          a: "We use encrypted connections and do not store chats."
        }
      ].map((f, i) => (
        <div
          key={i}
          className="bg-white/5 rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => toggleFaq(i)}
            className="w-full flex justify-between items-center p-5 text-left hover:bg-white/10 transition"
          >
            <span className="font-semibold">{f.q}</span>
            <span className="text-xl">
              {openFaq === i ? "−" : "+"}
            </span>
          </button>

          {openFaq === i && (
            <div className="px-5 pb-5 text-gray-300 text-sm">
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>



      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © 2026 RandomConnect. All rights reserved.
      </footer>
    </div>
  );
}
