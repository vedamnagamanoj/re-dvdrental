# ---------- Stage 1: Build ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Enable pnpm (via Corepack)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency manifests
COPY pnpm-lock.yaml* package.json ./

# Important fix: ensure hoisting for Next.js peer deps (e.g., styled-jsx)
RUN pnpm config set node-linker hoisted

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy Prisma schema before generating client
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy all remaining source files (after installing dependencies)
COPY . .

# Disable Next.js linting and type-checking during build
ENV NEXT_DISABLE_ESLINT=1
ENV NEXT_DISABLE_TYPECHECK=1

# Build the Next.js app
RUN pnpm run build

# ---------- Stage 2: Runtime ----------
FROM node:22-alpine AS runner
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy necessary runtime files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Environment setup
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["pnpm", "start"]
