# 1. Base image
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# 2. Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci

# 3. Build the app
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 4. Final runtime image
FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json .env ./

CMD ["npm", "run", "start"]
