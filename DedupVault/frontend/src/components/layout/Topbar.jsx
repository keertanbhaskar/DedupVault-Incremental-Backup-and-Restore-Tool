import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Topbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Log out the current user
  const handleLogout = () => {
    logout();
    setShowProfile(false);
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-5 dark:border-slate-800 dark:bg-slate-900 md:px-8">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search backups, files..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:bg-slate-700"
        />
      </div>

      {/* Right Controls */}
      <div className="ml-4 flex shrink-0 items-center gap-3">
        {/* Theme Controls */}
        <div className="hidden items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800 sm:flex">
          <button
            onClick={() => toggleTheme("light")}
            aria-label="Select light theme"
            aria-pressed={theme === "light"}
            className={`rounded-full p-2 transition ${
              theme === "light"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <Sun size={17} />
          </button>

          <button
            onClick={() => toggleTheme("dark")}
            aria-label="Select dark theme"
            aria-pressed={theme === "dark"}
            className={`rounded-full p-2 transition ${
              theme === "dark"
                ? "bg-slate-700 text-blue-400 shadow-sm"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <Moon size={17} />
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            aria-label="Notifications"
            className="relative rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                Notifications
              </h3>

              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                No new notifications. Your backup alerts will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
              {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {user?.full_name || "User"}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.email || "Administrator"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className="text-slate-500 dark:text-slate-400"
            />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-14 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <button
                onClick={() => setShowProfile(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <User size={17} />
                My Profile
              </button>

              <button
                onClick={() => {
                  setShowProfile(false);
                  navigate("/settings");
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <Settings size={17} />
                Preferences
              </button>

              <div className="my-2 border-t border-slate-100 dark:border-slate-700" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
