import { useState } from "react";

import {
  Database,
  Plus,
  Search,
  Filter,
  RefreshCw,
  FolderOpen,
  Clock3,
  HardDrive,
  ArrowUpRight,
  X,
} from "lucide-react";

function Backups() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [backupType, setBackupType] = useState("full");

  return (
    <div className="mx-auto max-w-[1600px] space-y-7">
      {/* Page Header */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">DATA PROTECTION</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
            Backup Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create, monitor and manage your backup operations.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          <Plus size={19} />
          Create Backup
        </button>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Backups</p>
            <Database size={20} className="text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-800">0</h2>
          <p className="mt-2 text-xs text-slate-400">All backup operations</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Full Backups</p>
            <HardDrive size={20} className="text-purple-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-800">0</h2>
          <p className="mt-2 text-xs text-slate-400">
            Complete backup operations
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Incremental Backups</p>
            <RefreshCw size={20} className="text-emerald-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-800">0</h2>
          <p className="mt-2 text-xs text-slate-400">Changed data only</p>
        </div>
      </section>

      {/* Backup History */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6">
          <div>
            <h2 className="font-semibold text-slate-800">Backup History</h2>
            <p className="mt-1 text-xs text-slate-500">
              View and manage your backup operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search backups..."
                className="w-52 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400"
              />
            </div>

            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <FolderOpen size={30} className="text-blue-500" />
          </div>

          <h3 className="mt-5 text-base font-semibold text-slate-800">
            No backups found
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
            You haven't created any backups yet. Start protecting your data by
            creating your first backup.
          </p>

          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Create your first backup
          </button>
        </div>
      </section>

      {/* Create Backup Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Create New Backup
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Configure your backup operation.
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Backup Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. My Project Backup"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Source Folder Path
                </label>

                <div className="relative">
                  <FolderOpen
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter source folder path"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-400"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  The folder must be accessible to the backend service.
                </p>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Backup Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBackupType("full")}
                    className={`rounded-xl border p-4 text-left transition ${
                      backupType === "full"
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Database
                      size={21}
                      className={
                        backupType === "full"
                          ? "text-blue-600"
                          : "text-slate-400"
                      }
                    />

                    <p className="mt-3 text-sm font-semibold text-slate-800">
                      Full Backup
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Process all files.
                    </p>
                  </button>

                  <button
                    onClick={() => setBackupType("incremental")}
                    className={`rounded-xl border p-4 text-left transition ${
                      backupType === "incremental"
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <RefreshCw
                      size={21}
                      className={
                        backupType === "incremental"
                          ? "text-blue-600"
                          : "text-slate-400"
                      }
                    />

                    <p className="mt-3 text-sm font-semibold text-slate-800">
                      Incremental
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Process changed files.
                    </p>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4">
                <Clock3 size={19} className="mt-0.5 shrink-0 text-amber-600" />

                <p className="text-xs leading-relaxed text-amber-800">
                  Backup execution will be connected to the DedupVault storage
                  engine in the next implementation stage.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 p-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                disabled
                className="cursor-not-allowed rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white opacity-50"
              >
                Start Backup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Backups;
