import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../hook/useAuthUser";
import io from "socket.io-client";
import { auth } from "../../firebase";
import Header from "./Header";
import logo from "../../blink.png";
import { 
  FiMic, 
  FiMicOff, 
  FiCamera, 
  FiCameraOff, 
  FiSkipForward, 
  FiFlag, 
  FiPhoneOff 
} from "react-icons/fi";
import Update from "../Update";
export default function Dashboard() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const streamRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [connected, setConnected] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState(null);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const navigate = useNavigate();
  const { data: user, isLoading } = useAuthUser();

  // 1. Initialize Socket
  // useEffect(() => {
  //   const unsub = auth.onAuthStateChanged(async (u) => {
  //     if (!u) return;
  //     const token = await u.getIdToken();
  //     const s = io("https://node-backend-vp6v.onrender.com", { auth: { token } });
  //     setSocket(s);
  //   });
  //   return () => unsub();
  // }, []);

  useEffect(() => {
  const unsub = auth.onAuthStateChanged(async (u) => {
    if (!u) return;

    const token = await u.getIdToken();

    const s = io("https://node-backend-vp6v.onrender.com", {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    s.on("connect", () => {
      console.log("Socket connected:", s.id);
    });

    s.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message);
    });

    setSocket(s);
  });

  return () => unsub();
}, []);



  // 2. Local Camera Preview
  useEffect(() => {
    if (isLoading || !user) return;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((s) => {
        streamRef.current = s;
        if (localVideoRef.current) localVideoRef.current.srcObject = s;
      })
      .catch(console.error);
  }, [isLoading, user]);

  // 3. WebRTC Core Logic
  const createPC = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Handle incoming stream
    pc.ontrack = (e) => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0];
    };

    // Handle ICE candidates
    pc.onicecandidate = (e) => {
      if (e.candidate) socket.emit("ice-candidate", e.candidate);
    };

    // Add local tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, streamRef.current);
      });
    }

    pcRef.current = pc;
    return pc;
  };

  const startSearching = () => {
    setIsSearching(true);
    socket.emit("find-stranger");
  };

  // 4. Socket Signaling Handlers
  useEffect(() => {
    if (!socket) return;

    socket.on("match-found", async ({ role, partner }) => {
      setPartnerInfo(partner);
      setConnected(true);
      setIsSearching(false);

      const pc = createPC(); // Build connection logic immediately

      if (role === "caller") {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", offer);
      }
    });

    socket.on("offer", async (o) => {
      const pc = createPC();
      await pc.setRemoteDescription(new RTCSessionDescription(o));
      const ans = await pc.createAnswer();
      await pc.setLocalDescription(ans);
      socket.emit("answer", ans);
    });

    socket.on("answer", async (a) => {
      if (pcRef.current) {
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(a));
      }
    });

    socket.on("ice-candidate", async (c) => {
      if (pcRef.current) {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(c)).catch(e => {});
      }
    });

    socket.on("partner-disconnected", () => {
      resetConnection();
    });

    return () => {
      socket.off("match-found");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("partner-disconnected");
    };
  }, [socket]);

  // 5. Button Actions
  const resetConnection = () => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    setConnected(false);
    setPartnerInfo(null);
    setIsSearching(false);
  };

  const endCall = () => {
    resetConnection();
    socket.emit("next-user"); // Notifies server you are leaving
  };

  const nextUser = () => {
    resetConnection();
    socket.emit("next-user");
    startSearching();
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicOn(audioTrack.enabled);
      }
    }
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraOn(videoTrack.enabled);
      }
    }
  };

  if (isLoading) return <div className="h-screen bg-black flex items-center justify-center">Blinking...</div>;

  return (
    <div className="h-screen w-full bg-slate-950 text-white overflow-hidden flex flex-col">
      <Header user={user} />
      {user && <Update user={user} />}
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 min-h-0">
        {/* LEFT: YOU */}
        <div className="flex-1 bg-black rounded-3xl overflow-hidden relative border-2 border-orange-500/20">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-orange-500 text-[10px] font-bold px-2 py-1 rounded">YOU</div>
        </div>

{/* RIGHT: STRANGER */}
<div className="flex-1 bg-white/[0.03] rounded-3xl overflow-hidden relative border border-white/10">
  {connected ? (
    <>
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

      <div className="absolute top-4 left-4 bg-gray-800 text-[10px] font-bold px-2 py-1 rounded">
        STRANGER
      </div>

      {partnerInfo && (
        <div className="absolute bottom-4 left-4 bg-black/60 p-2 rounded-lg text-xs backdrop-blur-md">
          Chatting with:{" "}
          <span className="text-orange-400 font-bold">
            {partnerInfo.name}
          </span>
        </div>
      )}
    </>
  ) : isSearching ? (
    <SearchingView onCancel={resetConnection} />
  ) : (
    <LobbyView onStart={startSearching} />
  )}
</div>

      </main>
{/* Only show the control bar when connected to a stranger or searching */}
{(connected || isSearching) && (
  <div className="h-20 bg-slate-900 border-t border-white/10 flex items-center justify-center gap-4 px-6 shrink-0">
    
 {/* Mic Toggle */}
  <button
    onClick={toggleMic}
    className={`p-4 rounded-full transition text-white ${
      micOn ? "bg-indigo-600" : "bg-red-600"
    }`}
    title={micOn ? "Mute" : "Unmute"}
  >
    {micOn ? <FiMic size={22} /> : <FiMicOff size={22} />}
  </button>

  {/* Camera Toggle */}
  <button
    onClick={toggleCamera}
    className={`p-4 rounded-full transition text-white ${
      cameraOn ? "bg-indigo-600" : "bg-red-600"
    }`}
    title={cameraOn ? "Camera Off" : "Camera On"}
  >
    {cameraOn ? <FiCamera size={22} /> : <FiCameraOff size={22} />}
  </button>

  {/* Next */}
  <button
    onClick={nextUser}
    className="p-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition"
    title="Next"
  >
    <FiSkipForward size={22} />
  </button>

  {/* Report */}
  <button
    onClick={() => { alert("Reported!"); nextUser(); }}
    className="p-4 rounded-full bg-yellow-700 hover:bg-yellow-600 text-white transition"
    title="Report"
  >
    <FiFlag size={22} />
  </button>

  {/* End Call */}
  <button
    onClick={endCall}
    className="p-4 rounded-full bg-red-600 hover:bg-red-500 text-white transition"
    title="End Call"
  >
    <FiPhoneOff size={22} />
  </button>
  </div>
)}
    </div>
  );
}

// Logic components
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
              <div className="w-8 h-8 rounded-full border border-orange-500 bg-white p-1">
                <img src={logo} alt="logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-xl tracking-tight">Blink</span>
      <p className="text-gray-400 mb-8 max-w-xs text-sm">Start a chat to meet someone new.</p>
      <button onClick={onStart} className="px-12 py-4 bg-orange-500 rounded-full font-bold text-lg hover:scale-105 transition-all">
        Start Video Chat
      </button>
    </div>
  );
}