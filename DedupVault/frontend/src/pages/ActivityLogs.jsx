import {
  Activity,
  Search,
  Filter,
  Database,
  History,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Clock3,
  FileText,
  Download,
} from "lucide-react";

const activityTypes = [
  {
    name: "Backup",
    description: "Backup creation and execution events",
    icon: Database,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    name: "Snapshot",
    description: "Snapshot creation and management events",
    icon: History,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    name: "Restore",
    description: "File recovery and restore events",
    icon: RotateCcw,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    name: "Integrity",
    description: "Data verification and corruption alerts",
    icon: ShieldCheck,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

function ActivityLogs() {
  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-blue-600">Activity Logs</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Activity Logs
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor system events and track your backup operations.
            </p>
          </div>

          <button
            disabled
            title="Export will be available after backend integration"
            className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-400"
          >
            <Download size={17} />
            Export Logs
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Events</p>
            <Activity size={20} className="text-blue-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">0</p>
          <p className="mt-1 text-xs text-slate-400">Recorded system events</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Successful Events</p>
            <ShieldCheck size={20} className="text-teal-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">0</p>
          <p className="mt-1 text-xs text-slate-400">Completed operations</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Failed Events</p>
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">0</p>
          <p className="mt-1 text-xs text-slate-400">Failed operations</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Last Activity</p>
            <Clock3 size={20} className="text-violet-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
          <p className="mt-1 text-xs text-slate-400">No activity recorded</p>
        </div>
      </div>

      {/* Event categories */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold text-slate-800">Event Categories</h2>
          <p className="mt-1 text-xs text-slate-500">
            Types of operations tracked by DedupVault.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {activityTypes.map((type) => {
            const Icon = type.icon;

            return (
              <div
                key={type.name}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div
                  className={`mb-4 w-fit rounded-xl p-3 ${type.bg} ${type.color}`}
                >
                  <Icon size={21} />
                </div>

                <h3 className="font-semibold text-slate-800">{type.name}</h3>

                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {type.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Logs table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5">
          <div>
            <h2 className="font-semibold text-slate-800">System Activity</h2>
            <p className="mt-1 text-xs text-slate-500">
              Detailed history of system operations.
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <div className="relative min-w-0 flex-1 sm:w-64">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search activity..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
              />
            </div>

            <button
              disabled
              className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-400"
            >
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4 font-semibold">Event</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Timestamp</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={4} className="px-5 py-14 text-center">
                  <FileText
                    size={35}
                    className="mx-auto text-slate-300"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-4 font-semibold text-slate-700">
                    No activity recorded
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    System events will appear here when you start using
                    DedupVault.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Audit information */}
      <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
        <Activity size={19} className="shrink-0 text-blue-600" />

        <div>
          <h3 className="text-sm font-semibold text-blue-900">
            Audit trail and accountability
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-blue-800/80">
            DedupVault will maintain timestamped records of important
            operations, including backup execution, restore attempts, integrity
            checks, and system errors. These records will help troubleshoot
            problems and track system activity.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ActivityLogs;
