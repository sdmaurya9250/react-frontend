import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
// import { auth } from "../firebase";



export default function ProfileModal({ user, onClose }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
      // optionally redirect: navigate("/") if you import useNavigate
      window.location.href = "/"; // safe simple redirect
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      <div className="relative bg-white/5 backdrop-blur-lg text-white w-full max-w-sm p-6 rounded-2xl shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-300">✕</button>

        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-400">
            <img src={user?.photoURL || "/monkeycool.JPG"} alt="avatar" className="w-full h-full object-cover" />
          </div>

          <h3 className="text-xl font-bold">{user?.displayName || "Unknown"}</h3>
          <p className="text-sm text-gray-300">{user?.email}</p>

          <div className="w-full mt-4">
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-400 font-semibold"
            >
              Sign out
            </button>
          </div>

          <div className="w-full mt-3 text-sm text-gray-300">
          </div>
        </div>
      </div>
    </div>
  );
}
