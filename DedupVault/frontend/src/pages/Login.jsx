import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ShieldCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  HardDrive,
  CheckCircle2,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  // Access global authentication state
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      // Send login credentials to FastAPI
      const response = await api.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      // Extract token and user information
      const { access_token, user } = response.data;

      // Clear previously stored tokens
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");

      // Store token based on Remember Me selection
      if (rememberMe) {
        localStorage.setItem("access_token", access_token);
      } else {
        sessionStorage.setItem("access_token", access_token);
      }

      // Update global authentication state
      setUser(user);

      console.log("Login successful:", user);

      // Navigate to Dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);

      const detail = err.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(detail.map((item) => item.msg).join(" "));
      } else {
        setError(
          detail || "Login failed. Please check your connection and try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1220]">
            <ShieldCheck className="h-6 w-6 text-blue-400" />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Dedup<span className="text-blue-600">Vault</span>
          </span>
        </Link>

        <p className="text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign up
          </Link>
        </p>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 md:grid-cols-2">
          {/* Left Panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0B1220] p-10 text-white md:flex">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                <HardDrive className="h-7 w-7 text-blue-400" />
              </div>

              <h1 className="max-w-sm text-3xl font-bold leading-tight">
                Your data deserves a smarter backup system.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                Manage backups, reduce duplicate storage and recover your
                important files through one unified platform.
              </p>
            </div>

            <div className="relative z-10 space-y-5">
              {[
                "Intelligent data deduplication",
                "Snapshot-based recovery",
                "SHA-256 integrity verification",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}

              <p className="border-t border-white/10 pt-6 text-xs text-slate-500">
                Secure storage. Smarter backups. Greater control.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex items-center justify-center p-7 sm:p-12">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold text-blue-600">
                  WELCOME BACK
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Sign in to your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Enter your credentials to access your DedupVault workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      onClick={() =>
                        alert("Password reset will be implemented later.")
                      }
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                  />

                  <label htmlFor="remember" className="text-sm text-slate-600">
                    Remember me
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Signing in..." : "Sign in"}

                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                  New to DedupVault?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4" />
                Your backup workspace, protected.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 text-center text-xs text-slate-400">
        © 2026 DedupVault. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;
