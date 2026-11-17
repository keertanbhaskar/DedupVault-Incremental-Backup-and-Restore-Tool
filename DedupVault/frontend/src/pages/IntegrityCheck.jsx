import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  Clock3,
  Database,
  FileSearch,
  RefreshCw,
  Info,
  LockKeyhole,
} from "lucide-react";

const integrityMetrics = [
  {
    title: "Total Chunks Checked",
    value: "0",
    description: "Chunks verified",
    icon: Database,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Healthy Chunks",
    value: "0",
    description: "Chunks with valid hashes",
    icon: CheckCircle2,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    title: "Corrupted Chunks",
    value: "0",
    description: "Chunks with hash mismatches",
    icon: ShieldAlert,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    title: "Last Scan",
    value: "—",
    description: "No scan performed yet",
    icon: Clock3,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const checks = [
  {
    name: "SHA-256 Hash Verification",
    description:
      "Recalculate chunk hashes and compare them with stored hashes.",
    icon: LockKeyhole,
  },
  {
    name: "Chunk Availability",
    description: "Check whether referenced chunk files exist in storage.",
    icon: Database,
  },
  {
    name: "Manifest Consistency",
    description: "Verify that snapshot manifests reference valid chunks.",
    icon: FileSearch,
  },
  {
    name: "Storage Reference Validation",
    description: "Check chunk references and metadata consistency.",
    icon: RefreshCw,
  },
];

function IntegrityCheck() {
  return (
    <div className="space-y-7">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-blue-600">Integrity Check</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Integrity Check
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Verify stored data and detect possible corruption.
            </p>
          </div>

          <button
            disabled
            title="Integrity scanning will be enabled after backend integration"
            className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white opacity-50"
          >
            <ShieldCheck size={17} />
            Run Integrity Scan
          </button>
        </div>
      </div>

      {/* Status banner */}
      <section className="flex flex-wrap items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
          <ShieldAlert size={25} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-amber-900">
            Integrity verification has not started
          </h2>
          <p className="mt-1 text-sm text-amber-800/80">
            No storage scan has been performed yet. Run a scan after creating
            your first backup to verify stored data.
          </p>
        </div>

        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          Not scanned
        </span>
      </section>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {integrityMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{metric.title}</p>
                <div
                  className={`rounded-lg p-2.5 ${metric.bg} ${metric.color}`}
                >
                  <Icon size={19} />
                </div>
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-900">
                {metric.value}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Verification checks */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800">
            Verification Components
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Checks that the integrity engine will perform.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {checks.map((check) => {
            const Icon = check.icon;

            return (
              <div key={check.name} className="flex items-center gap-4 p-5">
                <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {check.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {check.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  Pending
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Scan history */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800">Scan History</h2>
          <p className="mt-1 text-xs text-slate-500">
            Review previous integrity verification results.
          </p>
        </div>

        <div className="py-14 text-center">
          <FileSearch
            size={36}
            className="mx-auto text-slate-300"
            strokeWidth={1.5}
          />

          <h3 className="mt-4 font-semibold text-slate-700">No scan history</h3>

          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            Completed integrity scans and their verification reports will appear
            here.
          </p>
        </div>
      </section>

      {/* Technical information */}
      <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
        <Info size={19} className="shrink-0 text-blue-600" />

        <div>
          <h3 className="text-sm font-semibold text-blue-900">
            Why integrity verification matters
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-blue-800/80">
            A successful backup is useful only if its data can be recovered
            correctly. DedupVault will use SHA-256 checksums to detect
            unexpected changes to stored chunks before they cause restore
            failures.
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntegrityCheck;
