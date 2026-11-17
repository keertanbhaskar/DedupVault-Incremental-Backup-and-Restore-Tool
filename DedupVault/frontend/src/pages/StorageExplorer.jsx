import {
  HardDrive,
  Search,
  Database,
  Layers3,
  FileText,
  ShieldCheck,
  Info,
} from "lucide-react";

const storageStats = [
  {
    title: "Total Chunks",
    value: "0",
    description: "Unique chunks stored",
    icon: Layers3,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Physical Storage",
    value: "0 B",
    description: "Actual disk space used",
    icon: HardDrive,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Logical Storage",
    value: "0 B",
    description: "Original data represented",
    icon: Database,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    title: "Deduplication Ratio",
    value: "0%",
    description: "Storage optimization",
    icon: ShieldCheck,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

function StorageExplorer() {
  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-blue-600">Storage Explorer</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Storage Explorer
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Explore stored chunks, storage usage, and deduplication.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600">
            <HardDrive size={17} />
            Storage overview
          </div>
        </div>
      </div>

      {/* Storage statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {storageStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{stat.title}</p>
                <div className={`rounded-lg p-2.5 ${stat.bg} ${stat.color}`}>
                  <Icon size={19} />
                </div>
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-slate-400">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Storage utilization */}
      <div className="grid gap-5 xl:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800">
                Storage Utilization
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Physical storage compared with original data size.
              </p>
            </div>
            <Database size={20} className="text-blue-500" />
          </div>

          <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center">
            <HardDrive
              size={35}
              className="mx-auto text-slate-300"
              strokeWidth={1.5}
            />
            <h3 className="mt-4 font-semibold text-slate-700">
              No storage data available
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
              Storage analytics will appear after the first successful backup.
            </p>
          </div>
        </section>

        {/* Deduplication summary */}
        <section className="rounded-xl border border-slate-200 bg-[#101C30] p-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Deduplication Engine</h2>
            <Layers3 size={20} className="text-teal-400" />
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Content-addressed storage performance.
          </p>

          <div className="mt-8">
            <p className="text-xs text-slate-400">Duplicate data eliminated</p>
            <p className="mt-2 text-3xl font-bold">0 B</p>
          </div>

          <div className="mt-6 border-t border-slate-700 pt-5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Engine status</span>
              <span className="text-amber-400">Awaiting data</span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-0 rounded-full bg-teal-400" />
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              SHA-256 chunk hashing and duplicate detection will be connected to
              the backend storage engine.
            </p>
          </div>
        </section>
      </div>

      {/* Chunk storage table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-5">
          <div>
            <h2 className="font-semibold text-slate-800">Stored Chunks</h2>
            <p className="mt-1 text-xs text-slate-500">
              Browse unique content-addressed data chunks.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by chunk hash..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4 font-semibold">Chunk Hash</th>
                <th className="px-5 py-4 font-semibold">Size</th>
                <th className="px-5 py-4 font-semibold">References</th>
                <th className="px-5 py-4 font-semibold">Integrity</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={4} className="px-5 py-14 text-center">
                  <FileText
                    size={34}
                    className="mx-auto text-slate-300"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-4 font-semibold text-slate-700">
                    No chunks stored yet
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Unique file chunks will appear here after backup.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical information */}
      <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
        <Info size={19} className="shrink-0 text-blue-600" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900">
            How DedupVault stores data
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-blue-800/80">
            Files will be divided into chunks. Each chunk receives a SHA-256
            hash that identifies its content. If the same chunk already exists,
            DedupVault can reuse it instead of storing another copy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StorageExplorer;
