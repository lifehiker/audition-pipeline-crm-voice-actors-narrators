import { AppShell } from "@/components/app-shell";
import { getAppState } from "@/lib/store";

// No auth gate — the app runs in demo mode with local file storage and must be
// accessible to unauthenticated visitors (including health checks).
export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const state = await getAppState();

  return <AppShell user={state.user} plan={state.subscription.plan}>{children}</AppShell>;
}
