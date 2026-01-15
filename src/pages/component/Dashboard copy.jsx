import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../hook/useAuthUser";

import Header from "./Header";

export default function Dashboard() {
  const videoRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { data: user, isLoading } = useAuthUser();

  // Redirect if no user
  useEffect(() => {
    if (!isLoading && !user) navigate("/");
  }, [user, isLoading, navigate]);

  // Camera logic
  useEffect(() => {
    if (isLoading || !user) return;
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((s) => { if (videoRef.current) videoRef.current.srcObject = s; })
      .catch(console.error);
  }, [isLoading, user]);

  if (isLoading) return <div className="h-screen bg-black flex items-center justify-center text-white">Blinking...</div>;

  return (
    <div className="h-screen w-full bg-slate-950 text-white overflow-hidden flex flex-col">
      <Header user={user} />

      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 min-h-0">
        {/* LEFT: CAMERA */}
        <div className="flex-1 bg-black rounded-3xl overflow-hidden relative border-2 border-orange-500/20">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-orange-500 text-[10px] font-bold px-2 py-1 rounded">YOU</div>
        </div>

        {/* RIGHT: INTERACTIVE */}
        <div className="flex-1 bg-white/[0.03] rounded-3xl overflow-hidden relative border border-white/10">
          {isSearching ? (
             <SearchingView onCancel={() => setIsSearching(false)} />
          ) : (
             <LobbyView onStart={() => setIsSearching(true)} />
          )}
        </div>
      </main>
    </div>
  );
}

// Small sub-components for the right side
function SearchingView({ onCancel }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-t-orange-500 border-orange-500/20 rounded-full animate-spin mb-6" />
      <h3 className="text-xl font-medium animate-pulse text-orange-400">Finding Someone...</h3>
      <button onClick={onCancel} className="mt-8 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm">Stop</button>
    </div>
  );
}

function LobbyView({ onStart }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-10">
      <h2 className="text-3xl font-black mb-2">Blink</h2>
      <p className="text-gray-400 mb-8">Ready to blink? Start a video chat now.</p>
      <button onClick={onStart} className="px-12 py-4 bg-orange-500 rounded-full font-bold text-lg hover:scale-105 transition-all">
        Start Video Chat
      </button>
    </div>
  );
}