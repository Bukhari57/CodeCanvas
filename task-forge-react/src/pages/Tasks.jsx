const tasks = [];

export default function Tasks({ userEmail, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="w-full max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-xl shadow-xl shadow-black/40 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-lg text-slate-100">TaskForge</span>
          </div>
          <button
            onClick={onLogout} // isLoggedIn false hote hi App.jsx khud /login pe bhej dega
            className="text-sm text-slate-400 hover:text-slate-100 transition"
          >
            Logout
          </button>
        </div>

        <p className="text-sm text-slate-400 mb-1">Welcome back,</p>
        <h2 className="text-lg font-semibold text-slate-100 mb-6">
          {userEmail}
        </h2>

        <h3 className="text-sm font-medium text-slate-300 mb-3">Task List</h3>
      </div>
    </div>
  );
}
