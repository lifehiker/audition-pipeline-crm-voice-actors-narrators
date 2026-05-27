import { AppShell } from "@/components/app-shell";
import { getAppState } from "@/lib/store";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const state = await getAppState();

  return <AppShell user={state.user} plan={state.subscription.plan}>{children}</AppShell>;
}
