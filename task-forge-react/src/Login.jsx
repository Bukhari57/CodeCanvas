import { useState } from "react";

const EMAIL = "admin@taskforge.com";
const PASSWORD = "forge123";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === EMAIL && password === PASSWORD) {
      setError("");
      alert(`Welcome back, ${email}!`);
    } else {
      alert("Login failed: invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl   bg-slate-900 border border-slate-800 rounded-xl shadow-xl shadow-black/40 p-8"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-bold text-lg text-slate-100">TaskForge</span>
        </div>

        <h2 className="text-xl font-semibold text-slate-100 mb-1">Sign in</h2>
        <p className="text-sm text-slate-400 mb-6">
          Enter your details to access your workspace.
        </p>
        {/* Email field */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Password field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium text-sm py-2 rounded-md transition"
        >
          Sign in
        </button>

        {/* Demo hint */}
        <p className="text-xs text-slate-500 text-center mt-4">
          Demo login: {EMAIL} / {PASSWORD}
        </p>
      </form>
    </div>
  );
}
