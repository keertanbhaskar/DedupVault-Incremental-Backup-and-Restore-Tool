import {
  ShieldCheck,
  Fingerprint,
  History,
  RefreshCw,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";

const securityFeatures = [
  {
    icon: Fingerprint,
    title: "SHA-256 Integrity Verification",
    description:
      "Generate content hashes to identify chunks and verify that stored data has not changed unexpectedly.",
  },
  {
    icon: LockKeyhole,
    title: "Content-Addressed Storage",
    description:
      "Use chunk hashes as storage identifiers so identical content can reference the same stored chunk.",
  },
  {
    icon: History,
    title: "Snapshot-Based Recovery",
    description:
      "Maintain backup snapshots and manifests to identify the data required for a particular restore point.",
  },
  {
    icon: RefreshCw,
    title: "Controlled Restore Workflow",
    description:
      "Reconstruct files from their referenced chunks and verify integrity during the restoration process.",
  },
];

function SecuritySection() {
  return (
    <section className="bg-[#F5F8FC] px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <ShieldCheck size={16} />
            Data Protection & Reliability
          </span>

          <h2 className="mt-6 max-w-xl text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            Your Data Deserves
            <span className="block text-blue-600">
              More Than Just a Backup.
            </span>
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-slate-600">
            DedupVault is designed around data integrity, efficient storage, and
            dependable recovery. Every part of the backup workflow has a clear
            responsibility.
          </p>

          <div className="mt-8 space-y-5">
            {securityFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 md:p-9">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Integrity Verification
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Conceptual workflow preview
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <ShieldCheck size={25} />
            </div>
          </div>

          <div className="mt-7 space-y-5">
            {[
              "File content received",
              "SHA-256 hash generated",
              "Stored chunk referenced",
              "Integrity verification",
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                  {index + 1}
                </div>

                <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-sm font-medium text-slate-700">{step}</p>
                </div>

                {index === 3 && (
                  <CheckCircle2 size={20} className="text-emerald-600" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-xs font-medium text-slate-400">
              DESIGN PRINCIPLE
            </p>
            <p className="mt-2 text-lg font-semibold">
              Verify data. Preserve history. Restore with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecuritySection;
