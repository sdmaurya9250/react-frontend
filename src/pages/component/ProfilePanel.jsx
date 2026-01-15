export default function ProfilePanel({ onClose }) {
  return (
    <div className="fixed top-0 right-0 h-full w-72 bg-slate-900 text-white
                    shadow-2xl z-50 animate-slideIn">

      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src="https://i.pravatar.cc/60"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h4 className="font-semibold">John Doe</h4>
            <p className="text-xs text-gray-400">john@gmail.com</p>
          </div>
        </div>

        <button className="w-full text-left py-2 px-3 rounded hover:bg-white/10">
          👤 My Profile
        </button>
        <button className="w-full text-left py-2 px-3 rounded hover:bg-white/10">
          ⚙️ Settings
        </button>
        <button className="w-full text-left py-2 px-3 rounded hover:bg-white/10">
          🚪 Logout
        </button>
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400"
      >
        ✕
      </button>
    </div>
  );
}
