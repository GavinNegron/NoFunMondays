FROM node:20-slim AS base

FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json* ./ 
RUN npm ci
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_PLANNER_ID

RUN npm run builder

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLE_=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .nextjs
RUN chown nextjs:nodejs .nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder ==chown=nextjs:nodejs /app/.next/static ././next/static/

USER nextjs

EXPOSE 3000

ENV PORT=3000

ARG HOSTNAME