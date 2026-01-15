import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import logo from "../../blink.png";
export default function Header({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const [profile, setProfile] = useState({ gender: "", location: "" });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    queryClient.setQueryData(["authUser"], null);
    navigate("/");
  };

  useEffect(() => {
    if (user?.uid) {
      fetch(`http://localhost:5000/api/check-profile/${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.isComplete) {
            setProfile({ gender: data.gender, location: data.location });
          }
        });
    }
  }, [user]);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border border-orange-500 bg-white p-1">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-bold text-xl tracking-tight">Blink</span>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden hover:border-orange-500 transition"
        >
          <img
            src={user?.photoURL || "https://ui-avatars.com/api/?name=User"}
            alt="profile"
          />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 p-2">
            <div className="px-3 py-2 border-b border-white/5 mb-1 text-sm font-bold truncate">
              {user?.displayName}
            </div>
            <div className="px-3 py-2 border-b border-white/5 mb-1 text-sm font-bold truncate">
              Gender {profile?.gender}
            </div>
            <div className="px-3 py-2 border-b border-white/5 mb-1 text-sm font-bold truncate">
              Location {profile?.location}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
