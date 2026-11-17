import { useState } from "react";
import { ChevronDown, CircleHelp } from "lucide-react";

const questions = [
  {
    question: "What is DedupVault?",
    answer:
      "DedupVault is an incremental backup and restore platform designed to reduce redundant storage by identifying and reusing duplicate data chunks.",
  },
  {
    question: "How does data deduplication work?",
    answer:
      "Files are divided into smaller chunks. SHA-256 hashes help identify chunks with matching content, allowing identical chunks to be stored once and referenced by multiple backups.",
  },
  {
    question: "What is an incremental backup?",
    answer:
      "An incremental backup stores only the data that has changed since the previous backup, rather than storing the entire dataset again.",
  },
  {
    question: "How does SHA-256 help protect my data?",
    answer:
      "SHA-256 generates a hash from data content. The hash can be used to identify chunks and detect unexpected changes during integrity verification.",
  },
  {
    question: "Can I restore an older backup?",
    answer:
      "Yes. The platform is designed to use snapshots and backup manifests to identify and reconstruct files from a selected restore point.",
  },
  {
    question: "Where are backup chunks stored?",
    answer:
      "DedupVault is designed to store chunk data in a file-system-based content-addressed storage layer, while backup metadata and manifests are maintained separately.",
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <CircleHelp size={16} />
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl">
            Got Questions?
            <span className="block text-blue-600">We've Got Answers.</span>
          </h2>

          <p className="mt-4 text-slate-600">
            Learn more about how DedupVault handles backups, deduplication, and
            recovery.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {questions.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-xl border transition ${
                  isOpen
                    ? "border-blue-200 bg-blue-50/40"
                    : "border-slate-200 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="font-semibold text-slate-800">
                    {item.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-7 text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
