# Base image
FROM node:lts-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# Dependencies (npm)
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM deps AS build
COPY . .
ENV NUXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runtime
FROM node:lts-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs \
  && adduser -S nuxt -u 1001 -G nodejs

COPY --from=build /app/.output ./.output
USER nuxt

ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]