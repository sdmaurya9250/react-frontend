import { useEffect, useState } from "react";

export default function Update({ user }) {
  const [showPopup, setShowPopup] = useState(false);
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  // 1. Check profile status on mount
useEffect(() => {
  const checkStatus = async () => {
    if (!user?.uid) return;
    try {
      const response = await fetch(`http://localhost:5000/api/check-profile/${user.uid}`);
      const data = await response.json();
      
      if (data.isComplete) {
        // Pre-fill the states with fetched data
        setGender(data.gender);
        setLocation(data.location);
        setShowPopup(false); // Close if already complete
      } else {
        setShowPopup(true); // Open if data is missing
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };
  checkStatus();
}, [user]);
  const saveProfile = async () => {
    if (!gender || !location) {
      alert("Please select gender and enter location");
      return;
    }

    const uid = user?.uid;
    if (!uid) return;

    try {
      const response = await fetch("http://localhost:5000/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: uid,
          gender,
          location,
        }),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        setShowPopup(false); // 2. THIS CLOSES THE POPUP
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      }
    } catch (error) {
      console.error("API Call failed (update-profile):", error);
    }
  };

  // 3. IF FALSE, DON'T SHOW ANYTHING
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

      {/* Modal Card */}
      <div className="relative bg-slate-900 text-white w-full max-w-md mx-4 p-10 rounded-3xl shadow-2xl border border-white/10 animate-fadeIn">
        
        {/* Close Button - Optional if you want to allow skipping */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
        >
          ✕
        </button>

        <h2 className="text-3xl font-black text-center mb-1 tracking-wide">
          Complete <span className="text-indigo-400">Profile</span>
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">Tell us a little about yourself</p>

        <select 
          value={gender} 
          onChange={e => setGender(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition text-white"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter Location (e.g. New York, US)"
          className="w-full mb-8 px-4 py-3 rounded-xl bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition text-white"
        />

        <button
          onClick={saveProfile}
          className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-500/20"
        >
          Save & Start Chatting
        </button>
      </div>
    </div>
  );
}