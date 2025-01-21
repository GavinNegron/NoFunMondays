FROM node:20-slim AS base

FROM base AS builder

WORKDIR /app

COPY package.json package-lock.json* ./ 
RUN npm install --legacy-peer-deps
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_PLANNER_ID

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules/ ./node_modules/  

RUN mkdir .nextjs
RUN chown nextjs:nodejs .nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/ ./ .next/

USER nextjs

EXPOSE 3000

ENV PORT=3000

ARG HOSTNAME

CMD ["npm", "run", "start"]