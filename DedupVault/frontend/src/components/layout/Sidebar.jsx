import {
  LayoutDashboard,
  Database,
  History,
  HardDrive,
  ShieldCheck,
  RotateCcw,
  Settings,
  Activity,
  Layers3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Backups", path: "/backups", icon: Database },
  { name: "Snapshots", path: "/snapshots", icon: History },
  { name: "Storage Explorer", path: "/storage", icon: HardDrive },
  { name: "Integrity Check", path: "/integrity", icon: ShieldCheck },
  { name: "Restore", path: "/restore", icon: RotateCcw },
  { name: "Activity Logs", path: "/activity", icon: Activity },
  { name: "Settings", path: "/settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-full flex-col bg-[#0B1220] text-white md:sticky md:top-0 md:h-screen md:w-64">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-6">
        <div className="rounded-xl bg-blue-600 p-2">
          <Layers3 size={25} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight">DedupVault</h1>

          <p className="text-xs text-slate-400">Backup smarter. Store less.</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-7">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Workspace
        </p>

        <nav className="flex flex-row gap-2 overflow-x-auto md:flex-col">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={19} strokeWidth={1.8} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Storage Information */}
        <div className="mt-10 hidden rounded-xl border border-slate-800 bg-[#131F32] p-4 md:block">
          <div className="flex items-center gap-2">
            <HardDrive size={17} className="text-teal-400" />

            <p className="text-sm font-semibold">Storage Engine</p>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Your storage analytics and chunk utilization will appear here.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-400" />

            <span className="text-xs text-teal-400">
              Awaiting configuration
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 px-6 py-5">
        <p className="text-xs text-slate-500">DedupVault v0.1.0</p>

        <p className="mt-1 text-xs text-slate-600">
          Incremental Backup Platform
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
