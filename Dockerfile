FROM node:20-bookworm-slim AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate

FROM node:20-bookworm-slim AS builder
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV AUTH_SECRET=build-time-placeholder-secret
ENV NEXT_PUBLIC_APP_URL=https://localhost:3000
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY . .
RUN mkdir -p public
RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
ENV AUTH_SECRET=forge-app-default-secret-override-in-production
ENV NEXT_PUBLIC_APP_URL=
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs
RUN mkdir -p /app/.data /app/public && chown -R nextjs:nodejs /app
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "HOSTNAME=0.0.0.0 exec node server.js"]
