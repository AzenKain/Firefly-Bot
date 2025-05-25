FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json package-lock*.json ./
RUN npm ci

FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY package.json package-lock.json tsconfig.json .env ./
COPY src ./src

CMD ["npm", "run", "start"]
