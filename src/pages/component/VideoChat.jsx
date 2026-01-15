import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { auth } from "../../firebase";

export default function VideoChat() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const streamRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [connected, setConnected] = useState(false);

  // ---- CONNECT SOCKET AFTER FIREBASE LOGIN ----
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      const token = await user.getIdToken();
      const s = io("http://localhost:5000", {
        auth: { token },
      });
      setSocket(s);
    });
    return () => unsub();
  }, []);

  const createPC = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pc.ontrack = (e) => (remoteVideoRef.current.srcObject = e.streams[0]);
    pc.onicecandidate = (e) => e.candidate && socket.emit("ice-candidate", e.candidate);
    return pc;
  };

  const startCamera = async () => {
    if (streamRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;
    localVideoRef.current.srcObject = stream;
  };

  const findStranger = async () => {
    await startCamera();
    pcRef.current = createPC();
    streamRef.current.getTracks().forEach((t) => pcRef.current.addTrack(t, streamRef.current));
    socket.emit("find-stranger");
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("match-found", async ({ role, partner }) => {
      setPartnerInfo(partner);
      setConnected(true);

      if (role === "caller") {
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        socket.emit("offer", offer);
      }
    });

    socket.on("offer", async (o) => {
      await pcRef.current.setRemoteDescription(o);
      const ans = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(ans);
      socket.emit("answer", ans);
    });

    socket.on("answer", async (a) => {
      await pcRef.current.setRemoteDescription(a);
    });

    socket.on("ice-candidate", async (c) => {
      await pcRef.current.addIceCandidate(c);
    });

    socket.on("partner-disconnected", () => {
      setConnected(false);
      setPartnerInfo(null);
    });

    return () => socket.off();
  }, [socket]);

  return (
    <div>
{partnerInfo && (
  <div>
    <b>Name:</b> {partnerInfo.name} <br />
    <b>Email:</b> {partnerInfo.email} <br />
    <b>Address:</b> {partnerInfo.address}
  </div>
)}


      <video ref={localVideoRef} autoPlay muted width="200" />
      <video ref={remoteVideoRef} autoPlay width="200" />

      {!connected && <button onClick={findStranger}>Start</button>}
      {connected && <button onClick={() => socket.emit("next-user")}>Next</button>}
    </div>
  );
}
