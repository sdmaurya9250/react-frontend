export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <div className="bg-white/5 p-8 rounded-2xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 px-4 py-3 rounded bg-slate-800 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-3 rounded bg-slate-800 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded bg-slate-800 outline-none"
        />

        <button className="w-full py-3 bg-indigo-600 rounded-lg font-semibold
                           hover:bg-indigo-700 transition">
          Register
        </button>
      </div>
    </div>
  );
}
