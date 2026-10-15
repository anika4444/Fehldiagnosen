# ADAM Notfallportal

Eigenständige Web-App für Rettungskräfte und Ärzt:innen. Zugriff ohne Login über QR-Code oder Notfall-ID plus PIN, nur lesend.

## Start

```bash
cd emergency-portal
npm install
npm run dev
```

Das Portal läuft auf http://localhost:5173. Das Backend muss auf http://localhost:5238 laufen.
Eine andere Backend-Adresse wird in einer `.env` Datei gesetzt (Vorlage: `.env.example`).

Der Port 5173 ist in `Backend/Backend/appsettings.json` unter `Emergency:PortalBaseUrl` und `Emergency:AllowedOrigins` eingetragen. Wer ihn ändert, muss beide Stellen anpassen.

## Ablauf

1. Der QR-Code öffnet `/a#{token}`. Das Token steht hinter `#`, deshalb schickt der Browser es nie an den Webserver und es landet in keinem Server-Log. Das Portal liest es, entfernt es sofort aus der Adresszeile und zeigt die Pflichtbestätigung.
2. Nach der Bestätigung tauscht das Backend Token oder PIN gegen ein kurzlebiges Sitzungstoken. Es liegt nur im `sessionStorage` und wird im Header `X-Emergency-Session` mitgeschickt.
3. Mit Behandlungscode und aktiver Freigabe wartet das Portal, bis die Person in der App erlaubt.
4. Zuerst kommen die Kerndaten (`/api/emergency/data`), danach Wechselwirkungen und KI-Zusammenfassung (`/api/emergency/insights`).
5. Die Sitzung endet hart nach 30 Minuten (Notfall) bzw. 2 Stunden (Behandlung). Die Restzeit kommt vom Server, die Uhr des Geräts spielt keine Rolle. Alle 30 Sekunden fragt das Portal, ob die Sitzung noch gilt. So schließt "Alle Zugriffe beenden" in der App auch eine bereits offene Seite.

## Build

```bash
npm run build
```

Das Ergebnis liegt in `dist/`.

## Hosting

Vor dem Livegang auf einer eigenen Subdomain wie `notfall.<domain>`:

- Nur HTTPS, mit HSTS.
- Jeder Pfad, der keine Datei ist (vor allem `/a`), liefert `index.html` aus.
- Header für alle Antworten: `Cache-Control: no-store`, `X-Robots-Tag: noindex, nofollow`, `Referrer-Policy: no-referrer`, `X-Content-Type-Options: nosniff`, `Content-Security-Policy: default-src 'self'; connect-src 'self' https://<backend>; frame-ancestors 'none'`.
- Im Backend unter `Emergency` die echte Portal-Adresse bei `PortalBaseUrl` und `AllowedOrigins` eintragen. Läuft das Backend hinter einem Reverse Proxy, dessen IP bei `TrustedProxies` eintragen, sonst zählt die Sperre pro IP alle Zugriffe gemeinsam.

Beispiel für nginx:

```nginx
location / {
    try_files $uri /index.html;
    add_header Cache-Control "no-store" always;
    add_header X-Robots-Tag "noindex, nofollow" always;
    add_header Referrer-Policy "no-referrer" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000" always;
}
```
