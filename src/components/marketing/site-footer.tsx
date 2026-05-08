import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-white/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-[var(--muted-ink)] lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p>VoiceLog keeps narrators out of spreadsheets and inside a real audition pipeline.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/acx-audition-tracker">ACX Audition Tracker</Link>
          <Link href="/voice-actor-crm">Voice Actor CRM</Link>
          <Link href="/royalty-share-calculator">Royalty Calculator</Link>
          <Link href="/app/account">Billing</Link>
        </div>
      </div>
    </footer>
  );
}
