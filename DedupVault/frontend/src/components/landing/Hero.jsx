import {
  ArrowRight,
  ShieldCheck,
  Database,
  HardDrive,
  Zap,
  CheckCircle2,
} from "lucide-react";

import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#F5F8FC]">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
        {/* LEFT CONTENT */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
            ease: "easeOut",
          }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-[#174B86]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            INTELLIGENT BACKUP MANAGEMENT
          </div>

          <h1 className="max-w-xl text-5xl font-bold leading-[1.13] tracking-tight text-[#10243E] md:text-6xl">
            Intelligent Backups.
            <span className="mt-2 block text-[#2867B2]">
              Zero Redundant Storage.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-slate-600">
            Protect your data with content-based deduplication, incremental
            backups and reliable point-in-time recovery — all managed from one
            platform.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-3 rounded-lg bg-[#123B72] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-0.5 hover:bg-[#0D2D57]"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
            >
              Explore how it works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              SHA-256 verification
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              Incremental backups
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              Snapshot recovery
            </span>
          </div>
        </motion.div>

        {/* RIGHT PRODUCT PREVIEW */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 25 }}
          animate={
            shouldReduceMotion
              ? { opacity: 1, x: 0, y: 0 }
              : {
                  opacity: 1,
                  x: 0,
                  y: [0, -6, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.8 },
                  x: { duration: 0.8, ease: "easeOut" },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full bg-blue-200/40 blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/50">
            {/* PREVIEW HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-sm font-bold text-slate-800">
                  DedupVault Overview
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Backup and storage management
                </p>
              </div>

              <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                Demo Preview
              </span>
            </div>

            {/* METRIC CARDS */}
            <div className="grid grid-cols-2 gap-4 p-6">
              <div className="rounded-xl bg-slate-50 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <Database size={20} />
                </div>

                <p className="text-xs text-slate-500">Unique chunks</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-800">
                  1,284
                </h3>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <HardDrive size={20} />
                </div>

                <p className="text-xs text-slate-500">Storage optimized</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-800">42%</h3>
              </div>
            </div>

            {/* DEDUPLICATION VISUAL */}
            <div className="mx-6 rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  Data Deduplication
                </p>

                <Zap size={18} className="text-blue-600" />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 rounded-lg bg-blue-50 p-3 text-center">
                  <p className="text-xs font-semibold text-blue-800">File A</p>
                  <div className="mt-3 flex justify-center gap-1">
                    <span className="h-7 w-7 rounded bg-blue-400" />
                    <span className="h-7 w-7 rounded bg-emerald-400" />
                    <span className="h-7 w-7 rounded bg-indigo-400" />
                  </div>
                </div>

                <ArrowRight size={20} className="text-slate-400" />

                <div className="flex-1 rounded-lg bg-emerald-50 p-3 text-center">
                  <p className="text-xs font-semibold text-emerald-800">
                    Unique data
                  </p>
                  <div className="mt-3 flex justify-center gap-1">
                    <span className="h-7 w-7 rounded bg-blue-400" />
                    <span className="h-7 w-7 rounded bg-emerald-400" />
                    <span className="h-7 w-7 rounded bg-indigo-400" />
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-slate-500">
                Identical content is stored once and reused.
              </p>
            </div>

            {/* INTEGRITY STATUS */}
            <div className="m-6 flex items-center gap-3 rounded-xl bg-[#10243E] p-5 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <ShieldCheck size={22} className="text-emerald-400" />
              </div>

              <div>
                <p className="text-sm font-semibold">Data Integrity</p>
                <p className="mt-1 text-xs text-slate-300">
                  SHA-256 verification supported
                </p>
              </div>

              <CheckCircle2 className="ml-auto text-emerald-400" size={22} />
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-center text-xs text-slate-500">
              Illustrative preview · Sample data, not live metrics
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
