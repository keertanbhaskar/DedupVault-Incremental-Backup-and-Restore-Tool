import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "../components/landing/Reveal";

import {
  ArrowRight,
  ShieldCheck,
  HardDrive,
  Zap,
  Lock,
  Database,
  RefreshCw,
  CheckCircle2,
  Layers3,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import Hero from "../components/landing/Hero";
import DeduplicationDemo from "../components/landing/DeduplicationDemo";
import SecuritySection from "../components/landing/SecuritySection";
import FAQ from "../components/landing/FAQ";

function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const features = [
    {
      icon: Database,
      title: "Intelligent Deduplication",
      description:
        "Identify duplicate data chunks using SHA-256 hashing and store identical content only once.",
    },
    {
      icon: Zap,
      title: "Incremental Backups",
      description:
        "Back up only the data that has changed, reducing unnecessary storage and processing.",
    },
    {
      icon: ShieldCheck,
      title: "Data Integrity",
      description:
        "Verify stored chunks and detect corruption using cryptographic hash verification.",
    },
    {
      icon: RefreshCw,
      title: "Reliable Restoration",
      description:
        "Restore files from historical snapshots whenever you need them.",
    },
    {
      icon: HardDrive,
      title: "Storage Optimization",
      description:
        "Reduce redundant storage through content-addressed chunk storage.",
    },
    {
      icon: Lock,
      title: "Secure Backup Management",
      description:
        "Manage your backup history and monitor your stored data from one place.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Select your files",
      description:
        "Choose the files and folders you want DedupVault to protect.",
    },
    {
      number: "02",
      title: "Detect duplicate data",
      description:
        "Files are divided into chunks and SHA-256 hashes identify duplicate content.",
    },
    {
      number: "03",
      title: "Store and restore",
      description:
        "Unique chunks are stored efficiently and can be reconstructed when needed.",
    },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navigationLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "About", href: "#about" },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* LOGO */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123B72] text-white">
              <Layers3 size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">DedupVault</h1>
              <p className="text-[10px] font-medium tracking-[2px] text-slate-500">
                BACKUP. OPTIMIZE. RESTORE.
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-9 text-sm font-medium text-slate-600 md:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-blue-700"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* DESKTOP AUTH BUTTONS */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-lg bg-[#123B72] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0D2D57]"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-5 shadow-lg md:hidden">
            <div className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {link.label}
                </a>
              ))}

              <div className="my-2 border-t border-slate-100" />

              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#123B72] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D2D57]"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <Hero />

      {/* TRUST STRIP */}
      <section className="border-y border-slate-200 bg-white py-7">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-6 text-sm font-medium text-slate-500">
          <span className="flex items-center gap-2">
            <ShieldCheck size={18} />
            SHA-256 Verification
          </span>

          <span className="flex items-center gap-2">
            <Database size={18} />
            Content-Addressed Storage
          </span>

          <span className="flex items-center gap-2">
            <Zap size={18} />
            Incremental Backup
          </span>

          <span className="flex items-center gap-2">
            <RefreshCw size={18} />
            Snapshot Restoration
          </span>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="scroll-mt-24 bg-white px-6 py-20 md:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Platform Features
            </span>

            <h2 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl">
              Everything You Need for
              <span className="block text-blue-600">Smarter Data Backups.</span>
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A unified platform designed to simplify backup management,
              optimize storage, and support reliable recovery.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEDUPLICATION DEMO */}
      <Reveal>
        <DeduplicationDemo />
      </Reveal>

      {/* SECURITY */}
      <Reveal>
        <SecuritySection />
      </Reveal>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-24 bg-[#F5F8FC] px-6 py-20 md:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Simple Workflow
            </span>

            <h2 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl">
              How DedupVault Works
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Three essential stages make backup and recovery more organized and
              storage-efficient.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <span className="text-4xl font-bold text-blue-100">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {step.description}
                </p>

                {index !== 2 && (
                  <div className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 md:flex">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Reveal>
        <FAQ />
      </Reveal>

      {/* ABOUT / CTA */}
      <section id="about" className="scroll-mt-24 bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#10243E] px-8 py-16 text-center text-white md:px-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Layers3 size={28} />
          </div>

          <h2 className="mt-7 text-3xl font-bold md:text-4xl">
            Make Every Byte Count.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300">
            Experience a more efficient way to back up, organize, and restore
            your data with DedupVault.
          </p>

          <Link
            to="/signup"
            className="mt-9 inline-flex items-center gap-3 rounded-lg bg-white px-7 py-4 text-sm font-bold text-[#10243E] transition hover:bg-blue-50"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-9 md:flex-row lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#123B72] text-white">
              <Layers3 size={19} />
            </div>

            <div>
              <p className="font-bold text-slate-800">DedupVault</p>
              <p className="text-xs text-slate-500">
                Backup smarter. Store less.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} DedupVault. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/login" className="transition hover:text-blue-700">
              Login
            </Link>

            <Link to="/signup" className="transition hover:text-blue-700">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
