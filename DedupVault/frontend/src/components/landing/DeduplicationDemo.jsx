import {
  ArrowDown,
  CheckCircle2,
  Files,
  Layers3,
  ShieldCheck,
} from "lucide-react";

function DeduplicationDemo() {
  const files = [
    { name: "report.pdf", chunks: ["A", "B", "C"] },
    { name: "report-updated.pdf", chunks: ["A", "B", "D"] },
    { name: "backup-copy.pdf", chunks: ["A", "C", "E"] },
  ];

  const uniqueChunks = ["A", "B", "C", "D", "E"];

  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            How Deduplication Works
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Store More. Duplicate Less.
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            DedupVault identifies repeated data chunks using SHA-256 hashes and
            stores each unique chunk only once.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {/* STEP 1 */}
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Files size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Step 01
                </p>
                <h3 className="font-semibold text-slate-900">Select Files</h3>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Files are selected for backup. Each file is processed into smaller
              data chunks.
            </p>

            <div className="mt-6 space-y-3">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                >
                  <Files size={18} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 2 */}
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-violet-50 p-3 text-violet-600">
                <Layers3 size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
                  Step 02
                </p>
                <h3 className="font-semibold text-slate-900">
                  Identify Chunks
                </h3>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              SHA-256 hashes help identify chunks with matching content.
              Matching chunks can be reused.
            </p>

            <div className="mt-6 space-y-4">
              {files.map((file) => (
                <div key={file.name}>
                  <p className="mb-2 text-xs font-medium text-slate-500">
                    {file.name}
                  </p>
                  <div className="flex gap-2">
                    {file.chunks.map((chunk) => (
                      <div
                        key={chunk}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                          ["A", "B", "C"].includes(chunk)
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-violet-50 text-violet-700"
                        }`}
                      >
                        {chunk}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 3 */}
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Step 03
                </p>
                <h3 className="font-semibold text-slate-900">
                  Store Unique Data
                </h3>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Only unique chunks are stored. Backup manifests keep track of the
              chunks needed to reconstruct each file.
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="mb-3 text-xs font-semibold text-slate-500">
                UNIQUE STORED CHUNKS
              </p>

              <div className="grid grid-cols-5 gap-2">
                {uniqueChunks.map((chunk) => (
                  <div
                    key={chunk}
                    className="flex aspect-square items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 font-bold text-emerald-700"
                  >
                    {chunk}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-700">
                <CheckCircle2 size={17} />5 unique chunks in this example
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <ArrowDown size={22} className="text-blue-600" />
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            This is an illustrative example. Actual storage savings depend on
            how much duplicate content exists across your files.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DeduplicationDemo;
