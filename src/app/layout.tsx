import type { Metadata } from "next";

import "./globals.css";
import { getBaseUrl } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "VoiceLog | Audition Tracker CRM for Audiobook Narrators",
    template: "%s | VoiceLog",
  },
  description:
    "Track audiobook and voice-over auditions across ACX, Voice123, Findaway, and more with pipeline analytics and royalty-share math.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
