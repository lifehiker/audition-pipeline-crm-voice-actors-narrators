import Link from "next/link";
import { BarChart3, DollarSign, Home, KanbanSquare, LogOut, Mic2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AppUser, Plan } from "@/lib/types";

const links = [
  { href: "/app", label: "Dashboard", icon: Home },
  { href: "/app/pipeline", label: "Pipeline", icon: KanbanSquare },
  { href: "/royalty-share-calculator", label: "Calculator", icon: DollarSign },
  { href: "/app/account", label: "Account", icon: BarChart3 },
];

export function AppShell({
  children,
  user,
  plan,
}: {
  children: React.ReactNode;
  user: AppUser;
  plan: Plan;
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-4 lg:px-8">
      <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-72 flex-col rounded-[30px] border border-[var(--line)] bg-[var(--ink)] p-6 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Mic2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/60">VoiceLog</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
        </div>
        <Badge className="mt-5 w-fit bg-white/10 text-white" variant="neutral">
          {plan === "trial" ? "Pro Trial" : `${plan.charAt(0).toUpperCase()}${plan.slice(1)} plan`}
        </Badge>
        <nav className="mt-8 grid gap-2">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/76 transition hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <form action="/api/demo-logout" method="post" className="mt-auto">
          <Button variant="secondary" className="w-full bg-white text-[var(--ink)] hover:bg-[var(--paper)]">
            <LogOut className="mr-2 h-4 w-4" />
            Exit demo session
          </Button>
        </form>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
