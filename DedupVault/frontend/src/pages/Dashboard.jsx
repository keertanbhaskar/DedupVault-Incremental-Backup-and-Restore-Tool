import {
  Database,
  HardDrive,
  TrendingDown,
  History,
  Plus,
  ShieldCheck,
  RefreshCw,
  FolderArchive,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../services/api";

// Dashboard statistics
const stats = [
  {
    title: "Total Backups",
    value: "0",
    description: "No backups created yet",
    icon: Database,
    color: "blue",
  },
  {
    title: "Storage Used",
    value: "0 MB",
    description: "Physical chunk storage",
    icon: HardDrive,
    color: "purple",
  },
  {
    title: "Space Saved",
    value: "0 MB",
    description: "Through deduplication",
    icon: TrendingDown,
    color: "emerald",
  },
  {
    title: "Snapshots",
    value: "0",
    description: "Available restore points",
    icon: History,
    color: "orange",
  },
];

// No backup records available yet
const backups = [];

// Statistics card component
function StatCard({ item }) {
  const Icon = item.icon;

  const colors = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{item.title}</p>

        <div className={`rounded-xl p-3 ${colors[item.color]}`}>
          <Icon size={21} />
        </div>
      </div>

      <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-800">
        {item.value}
      </h3>

      <p className="mt-2 text-xs text-slate-500">{item.description}</p>
    </div>
  );
}

// Storage analytics component
function StorageAnalytics() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-800">Storage Analytics</h3>

          <p className="mt-1 text-xs text-slate-500">
            Understand your storage utilization
          </p>
        </div>

        <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">
          All time
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Physical Storage</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">0 MB</h2>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-0 rounded-full bg-blue-500" />
          </div>

          <p className="mt-3 text-xs text-slate-400">No chunks stored yet</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Deduplication Efficiency</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">0%</h2>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-0 rounded-full bg-emerald-500" />
          </div>

          <p className="mt-3 text-xs text-slate-400">Awaiting backup data</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center">
        <TrendingDown size={30} className="mx-auto text-slate-400" />

        <p className="mt-3 text-sm font-medium text-slate-600">
          Storage analytics will appear here
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Create your first backup to generate analytics.
        </p>
      </div>
    </section>
  );
}

// System health component
function BackupHealth() {
  const healthItems = [
    {
      label: "Backup Engine",
      description: "Awaiting configuration",
      icon: Database,
    },
    {
      label: "Chunk Storage",
      description: "Awaiting configuration",
      icon: HardDrive,
    },
    {
      label: "Integrity Checks",
      description: "No scans performed",
      icon: ShieldCheck,
    },
    {
      label: "Background Jobs",
      description: "Awaiting configuration",
      icon: RefreshCw,
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-slate-800">System Health</h3>

      <p className="mt-1 text-xs text-slate-500">
        Overview of backup infrastructure
      </p>

      <div className="mt-6 space-y-5">
        {healthItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-3 text-slate-500">
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-700">
                  {item.label}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {item.description}
                </p>
              </div>

              <span className="h-2 w-2 rounded-full bg-slate-300" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Recent backups component
function RecentBackups() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-800">
            Recent Backup Activity
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Your latest backup operations
          </p>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View all
        </button>
      </div>

      {backups.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <FolderArchive size={27} className="text-slate-400" />
          </div>

          <h4 className="mt-4 text-sm font-semibold text-slate-700">
            No backup history yet
          </h4>

          <p className="mt-2 text-xs text-slate-400">
            Your completed and running backups will appear here.
          </p>
        </div>
      ) : null}
    </section>
  );
}

// Main dashboard component
function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userError, setUserError] = useState("");

  // Fetch currently authenticated user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get("/auth/me");

        setCurrentUser(response.data);
        setUserError("");
      } catch (error) {
        console.error("Failed to fetch current user:", error);

        setUserError("Unable to load user details.");
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="mx-auto max-w-[1600px] space-y-7">
      {/* Welcome section */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">
            WORKSPACE OVERVIEW
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
            {currentUser
              ? `Welcome, ${currentUser.full_name}`
              : "Welcome to DedupVault"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage backups, optimize storage and protect your data.
          </p>

          {userError && (
            <p className="mt-2 text-sm text-red-500">{userError}</p>
          )}
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
          <Plus size={19} />
          Create Backup
        </button>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </section>

      {/* Analytics and Health */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <StorageAnalytics />
        </div>

        <BackupHealth />
      </section>

      {/* Recent Backups */}
      <RecentBackups />
    </div>
  );
}

export default Dashboard;
