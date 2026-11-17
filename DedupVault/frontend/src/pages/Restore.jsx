import {
  RotateCcw,
  History,
  FolderOpen,
  HardDrive,
  ShieldCheck,
  Search,
  ArrowRight,
  AlertTriangle,
  FileCheck2,
  Clock,
} from "lucide-react";

function Restore() {
  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-blue-600">Restore</span>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Restore Center
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Recover your files from previously created backup snapshots.
          </p>
        </div>
      </div>

      {/* Restore status */}
      <section className="flex flex-wrap items-center gap-4 rounded-xl border border-blue-100 bg-blue-50/70 p-5">
        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
          <RotateCcw size={25} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-blue-900">
            Your recovery workspace
          </h2>
          <p className="mt-1 text-sm text-blue-800/80">
            Select a snapshot to prepare a recovery operation. No restore
            operations have been performed yet.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Ready for setup
        </span>
      </section>

      {/* Restore statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Available Snapshots</p>
            <History size={20} className="text-blue-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">0</p>
          <p className="mt-1 text-xs text-slate-400">Recoverable versions</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Successful Restores</p>
            <FileCheck2 size={20} className="text-teal-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">0</p>
          <p className="mt-1 text-xs text-slate-400">Completed recoveries</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Last Restore</p>
            <Clock size={20} className="text-violet-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">—</p>
          <p className="mt-1 text-xs text-slate-400">No recovery performed</p>
        </div>
      </div>

      {/* Restore workflow */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800">
            Start a Restore Operation
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Configure which backup version you want to recover.
          </p>
        </div>

        <div className="space-y-6 p-5">
          {/* Step 1 */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                1
              </span>
              <h3 className="font-semibold text-slate-800">
                Select a snapshot
              </h3>
            </div>

            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
              <History
                size={34}
                className="mx-auto text-slate-300"
                strokeWidth={1.5}
              />
              <h4 className="mt-3 font-semibold text-slate-700">
                No snapshots available
              </h4>
              <p className="mt-2 text-sm text-slate-500">
                Create a successful backup before starting a restore.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                2
              </span>
              <h3 className="font-semibold text-slate-800">
                Choose recovery destination
              </h3>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <FolderOpen size={21} className="mt-0.5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Destination folder
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Choose where recovered files should be placed.
                  </p>
                </div>
              </div>

              <input
                type="text"
                disabled
                placeholder="Destination selection will be available soon"
                className="mt-4 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400 outline-none"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                3
              </span>
              <h3 className="font-semibold text-slate-800">
                Review recovery settings
              </h3>
            </div>

            <div className="space-y-3 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" disabled className="h-4 w-4" />
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Verify chunk integrity before restoring
                  </p>
                  <p className="text-xs text-slate-500">
                    Validate stored chunks against their SHA-256 hashes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" disabled className="h-4 w-4" />
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Preserve existing destination files
                  </p>
                  <p className="text-xs text-slate-500">
                    Avoid overwriting files already present at the destination.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Restore button */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
            <p className="text-xs text-slate-500">
              A restore operation will be enabled after backend integration.
            </p>

            <button
              disabled
              className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white opacity-50"
            >
              <RotateCcw size={17} />
              Start Restore
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Safety information */}
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle size={19} className="shrink-0 text-amber-600" />
        <div>
          <h3 className="text-sm font-semibold text-amber-900">
            Recovery safety
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-amber-800/80">
            Restoring files can affect existing data. DedupVault will provide
            destination validation, overwrite protection, and integrity
            verification before executing a recovery operation.
          </p>
        </div>
      </div>

      {/* Recent restore activity */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800">
            Recent Restore Activity
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            History of completed recovery operations.
          </p>
        </div>

        <div className="py-12 text-center">
          <HardDrive
            size={34}
            className="mx-auto text-slate-300"
            strokeWidth={1.5}
          />
          <p className="mt-3 text-sm font-medium text-slate-600">
            No restore activity yet
          </p>
        </div>
      </section>
    </div>
  );
}

export default Restore;
