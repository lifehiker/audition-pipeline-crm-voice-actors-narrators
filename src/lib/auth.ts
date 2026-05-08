import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { hasDatabaseConfig, hasGoogleOAuthConfig } from "@/lib/env";
import { getPrismaClient } from "@/lib/prisma";

const providers = hasGoogleOAuthConfig()
  ? [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      }),
    ]
  : [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: hasDatabaseConfig() ? PrismaAdapter(getPrismaClient()) : undefined,
  session: { strategy: "jwt" },
  trustHost: true,
  providers,
  pages: {
    signIn: "/signin",
  },
});
