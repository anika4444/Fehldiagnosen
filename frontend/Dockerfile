# Frontend (Expo Web), ausgeliefert über nginx
#   docker build -t fehldiagnosen-frontend --build-arg VERSION=1.2.3 ./frontend
#   docker run -p 8080:80 -e EXPO_PUBLIC_API_URL=http://localhost:5238/api fehldiagnosen-frontend

# ─── Stufe 1: Web-Export bauen ───────────────────────────────────────────────
FROM node:22-slim AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VERSION=0.0.0-dev
RUN npm pkg set version="$VERSION" \
 && node -e "const fs=require('fs');const a=JSON.parse(fs.readFileSync('app.json','utf8'));a.expo.version=process.argv[1];fs.writeFileSync('app.json',JSON.stringify(a,null,2))" "$VERSION"

# Expo baut EXPO_PUBLIC_*-Variablen fest ins JavaScript ein. Damit dasselbe Image in
# dev, test und prod laufen kann, wird hier nur ein Platzhalter eingebaut, den
# docker/40-api-url.sh beim Container-Start durch die echte URL ersetzt.
ENV EXPO_PUBLIC_API_URL=__EXPO_PUBLIC_API_URL__
RUN npx expo export --platform web --output-dir dist

# ─── Stufe 2: nur die fertigen Dateien mit nginx ausliefern ──────────────────
FROM nginx:1.27-alpine

ARG VERSION=0.0.0-dev
LABEL org.opencontainers.image.title="fehldiagnosen-frontend" \
      org.opencontainers.image.version="$VERSION"

# Unveränderte Vorlage; beim Start wird sie nach /usr/share/nginx/html kopiert und
# der Platzhalter ersetzt. So funktioniert auch ein Neustart mit anderer URL.
COPY --from=build /app/dist /opt/frontend-template
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/40-api-url.sh /docker-entrypoint.d/40-api-url.sh
RUN chmod +x /docker-entrypoint.d/40-api-url.sh

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=5 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
