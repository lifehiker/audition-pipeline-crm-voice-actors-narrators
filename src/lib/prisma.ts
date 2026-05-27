import { PrismaClient } from "@prisma/client";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
declare global {
  var prisma: PrismaClient | undefined;
}

export function getPrismaClient() {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" }),
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  }

  return global.prisma;
}
