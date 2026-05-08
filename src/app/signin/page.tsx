import Link from "next/link";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hasGoogleOAuthConfig } from "@/lib/env";

export default function SignInPage() {
  const googleReady = hasGoogleOAuthConfig();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-16 lg:px-10">
        <div className="grid w-full gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-[var(--ink)] text-white">
            <CardHeader>
              <Badge variant="warning" className="w-fit">
                Sign in
              </Badge>
              <CardTitle className="text-4xl text-white">Choose live Google auth or the local demo workflow.</CardTitle>
              <CardDescription className="text-white/72">
                The app is production-shaped, but it stays fully usable without external credentials by falling back to a safe local demo mode.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-white/76">
              <p>Google OAuth is wired through NextAuth and becomes available when `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` are provided.</p>
              <p>The local demo path creates a safe session so you can test the pipeline, analytics, billing fallback, export gating, and calculator flows immediately.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enter VoiceLog</CardTitle>
              <CardDescription>Use the demo workflow now, then add production credentials later.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {googleReady ? (
                <form action="/api/auth/signin/google" method="post">
                  <Button className="w-full">Continue with Google</Button>
                </form>
              ) : (
                <div className="rounded-[24px] bg-[var(--paper)] p-4 text-sm leading-6 text-[var(--muted-ink)]">
                  Google OAuth is configured but currently disabled until real credentials are present.
                </div>
              )}
              <form action="/api/demo-login" method="post">
                <Button className="w-full" variant="secondary">
                  Launch demo workspace
                </Button>
              </form>
              <Link href="/">
                <Button className="w-full" variant="ghost">
                  Back to homepage
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
