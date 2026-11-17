import { useState } from "react";

import {
  Settings as SettingsIcon,
  Database,
  ShieldCheck,
  Bell,
  HardDrive,
  Clock,
  Save,
  Info,
  RefreshCw,
} from "lucide-react";

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function Settings() {
  const [settings, setSettings] = useState({
    automaticIntegrity: true,
    backupNotifications: true,
    failureNotifications: true,
    compression: false,
    verifyBeforeRestore: true,
    preserveFiles: true,
  });

  const [retention, setRetention] = useState("30");
  const [chunkSize, setChunkSize] = useState("4");
  const [storagePath, setStoragePath] = useState("./storage");

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-blue-600">Settings</span>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure your backup, storage, and security preferences.
          </p>
        </div>
      </div>

      {/* Application information */}
      <section className="flex flex-wrap items-center gap-4 rounded-xl border border-blue-100 bg-blue-50/70 p-5">
        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
          <SettingsIcon size={25} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-blue-900">
            DedupVault Configuration
          </h2>
          <p className="mt-1 text-sm text-blue-800/80">
            Manage how your backup and recovery platform behaves.
          </p>
        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Version 0.1.0
        </span>
      </section>

      {/* Storage settings */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
            <HardDrive size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">
              Storage Configuration
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Configure chunk storage preferences.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Storage directory
            </label>
            <input
              type="text"
              value={storagePath}
              onChange={(e) => setStoragePath(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
            />
            <p className="mt-2 text-xs text-slate-400">
              Directory where unique file chunks will be stored.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Chunk size
            </label>
            <select
              value={chunkSize}
              onChange={(e) => setChunkSize(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white sm:max-w-xs"
            >
              <option value="1">1 MB</option>
              <option value="2">2 MB</option>
              <option value="4">4 MB</option>
              <option value="8">8 MB</option>
              <option value="16">16 MB</option>
            </select>
            <p className="mt-2 text-xs text-slate-400">
              Initial fixed-size chunking configuration.
            </p>
          </div>

          <Toggle
            label="Enable compression"
            description="Compress chunks before writing them to storage. Actual compression support is not implemented yet."
            checked={settings.compression}
            onChange={(value) => updateSetting("compression", value)}
          />
        </div>
      </section>

      {/* Backup settings */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <div className="rounded-lg bg-violet-50 p-2.5 text-violet-600">
            <Database size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">Backup Preferences</h2>
            <p className="mt-1 text-xs text-slate-500">
              Manage backup retention and verification.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Snapshot retention period
            </label>
            <select
              value={retention}
              onChange={(e) => setRetention(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white sm:max-w-xs"
            >
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="365">365 days</option>
            </select>
            <p className="mt-2 text-xs text-slate-400">
              Intended retention period for backup snapshots.
            </p>
          </div>

          <Toggle
            label="Automatic integrity verification"
            description="Enable scheduled checks of stored chunk integrity."
            checked={settings.automaticIntegrity}
            onChange={(value) => updateSetting("automaticIntegrity", value)}
          />
        </div>
      </section>

      {/* Restore and security */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <div className="rounded-lg bg-teal-50 p-2.5 text-teal-600">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">
              Restore and Security
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Configure recovery safety preferences.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 px-5">
          <Toggle
            label="Verify before restore"
            description="Check chunk hashes before reconstructing files."
            checked={settings.verifyBeforeRestore}
            onChange={(value) => updateSetting("verifyBeforeRestore", value)}
          />

          <Toggle
            label="Preserve existing files"
            description="Avoid overwriting existing files during recovery."
            checked={settings.preserveFiles}
            onChange={(value) => updateSetting("preserveFiles", value)}
          />
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600">
            <Bell size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">Notifications</h2>
            <p className="mt-1 text-xs text-slate-500">
              Choose which system events should generate alerts.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 px-5">
          <Toggle
            label="Backup notifications"
            description="Receive notifications when backup operations complete."
            checked={settings.backupNotifications}
            onChange={(value) => updateSetting("backupNotifications", value)}
          />

          <Toggle
            label="Failure alerts"
            description="Receive alerts when backup or recovery operations fail."
            checked={settings.failureNotifications}
            onChange={(value) => updateSetting("failureNotifications", value)}
          />
        </div>
      </section>

      {/* Save configuration */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Configuration changes
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Current changes are held in frontend state only.
          </p>
        </div>

        <button
          disabled
          title="Persistent settings will be implemented with backend integration"
          className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white opacity-50"
        >
          <Save size={17} />
          Save Settings
        </button>
      </div>

      {/* About */}
      <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <Info size={19} className="shrink-0 text-slate-500" />
        <div>
          <h3 className="text-sm font-semibold text-slate-700">
            About DedupVault
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            DedupVault is an incremental backup and restore platform built
            around content-addressed storage, SHA-256 hashing, and
            deduplication.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Application version: 0.1.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
