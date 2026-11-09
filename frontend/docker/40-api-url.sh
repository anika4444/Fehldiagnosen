#!/bin/sh
# Wird vom nginx-Image automatisch beim Start ausgeführt (alles in /docker-entrypoint.d/).
# Setzt die API-URL aus der Umgebungsvariable EXPO_PUBLIC_API_URL in das gebaute Frontend ein.
set -e

API_URL="${EXPO_PUBLIC_API_URL:-http://localhost:5238/api}"
HTML_DIR=/usr/share/nginx/html

rm -rf "${HTML_DIR:?}"/*
cp -r /opt/frontend-template/. "$HTML_DIR"/

find "$HTML_DIR" -type f \( -name '*.js' -o -name '*.html' \) \
  -exec sed -i "s#__EXPO_PUBLIC_API_URL__#${API_URL}#g" {} +

echo "Frontend: API-URL = ${API_URL}"
