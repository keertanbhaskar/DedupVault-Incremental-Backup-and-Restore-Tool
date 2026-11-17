import {
  History,
  Search,
  RotateCcw,
  HardDrive,
  Calendar,
  Folder,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

const snapshots = [
  {
    id: "SNP-0001",
    name: "Initial project backup",
    source: "D:/Projects",
    type: "Full",
    date: "No snapshots yet",
    size: "—",
    status: "Waiting",
  },
];

function SnapshotCard({ snapshot }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <History size={21} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">{snapshot.name}</h3>
            <p className="mt-1 text-xs text-slate-500">{snapshot.id}</p>
          </div>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          {snapshot.status}
        </span>
      </div>

      <div className="mt-5 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs text-slate-400">Backup type</p>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {snapshot.type}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Created on</p>
          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Calendar size={14} />
            {snapshot.date}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Snapshot size</p>
          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
            <HardDrive size={14} />
            {snapshot.size}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Source folder</p>
          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Folder size={14} />
            {snapshot.source}
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
        <button
          disabled
          title="Restore will be available after backend integration"
          className="flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-400"
        >
          <RotateCcw size={15} />
          Restore snapshot
        </button>
      </div>
    </div>
  );
}

function Snapshots() {
  return (
    <div className="space-y-7">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-blue-600">Snapshots</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Snapshots
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Browse and manage your point-in-time backup versions.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500">
            <Clock3 size={16} />
            Snapshot history
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total snapshots</p>
            <History size={19} className="text-blue-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">0</p>
          <p className="mt-1 text-xs text-slate-400">Saved versions</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Latest snapshot</p>
            <Calendar size={19} className="text-teal-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
          <p className="mt-1 text-xs text-slate-400">No snapshot created</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Snapshot storage</p>
            <HardDrive size={19} className="text-violet-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">0 B</p>
          <p className="mt-1 text-xs text-slate-400">Total snapshot data</p>
        </div>
      </div>

      {/* Snapshot history */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5">
          <div>
            <h2 className="font-semibold text-slate-800">Snapshot History</h2>
            <p className="mt-1 text-xs text-slate-500">
              Your saved backup versions will appear here.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search snapshots..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-4 p-5">
          {snapshots.length === 0 ? (
            <div className="py-14 text-center">
              <History
                size={38}
                className="mx-auto text-slate-300"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 font-semibold text-slate-800">
                No snapshots available
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                Create your first backup to generate a snapshot. Each successful
                backup will create a recoverable version.
              </p>
            </div>
          ) : (
            snapshots.map((snapshot) => (
              <SnapshotCard key={snapshot.id} snapshot={snapshot} />
            ))
          )}
        </div>
      </section>

      {/* Information panel */}
      <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
        <ArrowUpRight size={19} className="shrink-0 text-blue-600" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900">
            What are snapshots?
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-blue-800/80">
            A snapshot represents the state of your backed-up files at a
            particular point in time. DedupVault will use manifests and content
            hashes to preserve versions without storing duplicate file chunks
            repeatedly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Snapshots;
