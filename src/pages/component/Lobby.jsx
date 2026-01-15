import { useEffect, useRef, useState } from "react";

export default function Lobby() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const [status, setStatus] = useState("idle"); 
  // idle | connecting | matched

  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  useEffect(() => {
    async function startCamera() {
      const s = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    }
    startCamera();

    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const toggleCamera = () => {
    stream.getVideoTracks()[0].enabled = !camOn;
    setCamOn(!camOn);
  };

  const toggleMic = () => {
    stream.getAudioTracks()[0].enabled = !micOn;
    setMicOn(!micOn);
  };

  const startChat = () => {
    setStatus("connecting");

    // 🔌 later this will be socket.io matching
    setTimeout(() => {
      setStatus("matched");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* ================= IDLE / LOBBY ================= */}
      {status === "idle" && (
        <div className="flex min-h-screen">
          {/* Left camera */}
          <div className="w-1/2 relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 flex gap-3">
              <ControlButton onClick={toggleCamera} active={camOn} label="🎥" />
              <ControlButton onClick={toggleMic} active={micOn} label="🎤" />
            </div>
          </div>

          {/* Right start */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="bg-white/5 p-10 rounded-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to meet someone?
              </h2>
              <button
                onClick={startChat}
                className="mt-6 px-12 py-4 bg-yellow-400 text-black rounded-full text-lg font-semibold hover:scale-105 transition"
              >
                Start Video Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONNECTING ================= */}
      {status === "connecting" && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-pulse text-2xl mb-6">
            Connecting to a stranger…
          </div>
          <div className="loader"></div>
        </div>
      )}

      {/* ================= MATCHED ================= */}
      {status === "matched" && (
        <div className="relative min-h-screen bg-black">

          {/* Remote user (placeholder) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-xl">
              🎥 Stranger’s Camera
            </div>
          </div>

          {/* Local preview */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute bottom-6 right-6 w-48 h-64 object-cover rounded-xl border-2 border-white"
          />

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
            <ControlButton onClick={toggleCamera} active={camOn} label="🎥" />
            <ControlButton onClick={toggleMic} active={micOn} label="🎤" />
            <ControlButton label="⏭️" danger />
          </div>
        </div>
      )}
    </div>
  );
}

function ControlButton({ label, onClick, active = true, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-14 h-14 rounded-full text-xl
        ${danger
          ? "bg-red-500"
          : active
          ? "bg-white text-black"
          : "bg-gray-700 text-gray-300"
        }`}
    >
      {label}
    </button>
  );
}
