# use the official Bun image
FROM oven/bun:alpine AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb* bun.lock* /temp/dev/
RUN cd /temp/dev && \
  if [ -f bun.lockb ] || [ -f bun.lock ]; then bun install --frozen-lockfile; else bun install; fi

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb* bun.lock* /temp/prod/
RUN cd /temp/prod && \
  if [ -f bun.lockb ] || [ -f bun.lock ]; then bun install --frozen-lockfile --production; else bun install --production; fi

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# build
ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/.output .output

# run the app
USER bun
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", ".output/server/index.mjs"]
