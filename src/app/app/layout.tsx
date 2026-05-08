import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { getAppState } from "@/lib/store";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasDemoSession = cookieStore.get("voicelog-demo")?.value === "1";

  if (!hasDemoSession) {
    redirect("/signin");
  }

  const state = await getAppState();

  return <AppShell user={state.user} plan={state.subscription.plan}>{children}</AppShell>;
}
