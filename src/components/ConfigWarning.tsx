export default function ConfigWarning() {
  return (
    <div className="bg-[#7a1f1f] text-cream text-sm text-center px-4 py-3">
      ⚠ Your database isn't connected yet. Copy <code className="bg-black/20 px-1.5 py-0.5 rounded">.env.example</code> to{" "}
      <code className="bg-black/20 px-1.5 py-0.5 rounded">.env</code>, fill in your Supabase URL and key, then restart{" "}
      <code className="bg-black/20 px-1.5 py-0.5 rounded">npm run dev</code>. See the README for step-by-step setup.
    </div>
  );
}
