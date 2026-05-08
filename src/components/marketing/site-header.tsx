import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-[rgba(247,242,232,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--ink)] text-sm font-semibold text-white">
            VL
          </span>
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] text-[var(--muted-ink)]">
              {APP_NAME}
            </p>
            <p className="text-xs text-[var(--muted-ink)]">Audition CRM for narrators</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--muted-ink)] md:flex">
          <Link href="/acx-audition-tracker">ACX Tracker</Link>
          <Link href="/voice-actor-crm">Voice Actor CRM</Link>
          <Link href="/royalty-share-calculator">Calculator</Link>
          <Link href="/blog/acx-royalty-share-vs-flat-fee">Guide</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Badge variant="accent" className="hidden sm:inline-flex">
            30-day Pro trial
          </Badge>
          <Link href="/signin">
            <Button variant="secondary">Sign in</Button>
          </Link>
          <Link href="/app">
            <Button>Open app</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
