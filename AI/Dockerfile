# AI-Service (Node.js)
#   docker build -t fehldiagnosen-ai --build-arg VERSION=1.2.3 ./AI
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

# Erst nur die Paketdateien kopieren: Solange sie sich nicht ändern,
# nutzt Docker den Cache und "npm ci" läuft nicht bei jedem Build neu.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

# Version (beim Release aus dem Git-Tag), abrufbar über GET /ai/version
ARG VERSION=0.0.0-dev
RUN npm pkg set version="$VERSION"
LABEL org.opencontainers.image.title="fehldiagnosen-ai" \
      org.opencontainers.image.version="$VERSION"

# Nicht als root laufen
USER node

ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=5 \
  CMD node -e "fetch('http://localhost:' + process.env.PORT + '/ai/version').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "aiServices.js"]
