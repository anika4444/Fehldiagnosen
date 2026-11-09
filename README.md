# 🚀 ADAM

Willkommen bei ADAM! Ein Tool, dass dir bei der Verwaltung von medizinischen Daten hilft.

## 🛠 Voraussetzungen

Bevor du loslegst, stelle sicher, dass du Folgendes bereit hast:

- **Node.js**: Wird benötigt, um die Pakete über `npm` zu installieren
- **Docker**
- _(Optional)_ **Expo Go App**: Lade die App auf deinem Smartphone herunter, unabhängig davon, ob du iOS oder Android verwendest. Anschließend die IP deines PCs als `LAN_IP` in der `.env` im Projekt-Root eintragen (Vorlage: `.env.example`). Backend, Notfallportal und App lesen sie von dort
- _(Optional)_ **Android Studio**: Falls du das Frontend lieber auf einem virtuellen Emulator am PC testen willst
- **Visual Studio**: Mit .NET 10
- **Python**: Für die Durchführung des Arztbrief-Scans
- **.env**: Für unsere AI-Services (Unterordner _AI_) werden ein gültiger **API-Key** sowie die dazugehörigen **Umgebungsvariablen** benötigt
- **Drugbank XML**: Aus folgendem Link: https://fhvorarlberg-my.sharepoint.com/:f:/g/personal/asc9769_students_fhv_at/IgAba5IWyJyFTre7A00NZZYNAdOH0OawLz2UUscFsOQMz9w?e=TcmbgT

## ⚙️ Umgebungen & Befehle

Derselbe Code läuft in drei Umgebungen. Was sich unterscheidet, steht in Konfigurationsdateien.

| Umgebung | Zweck | Backend lädt | Config |
|---|---|---|---|
| `dev` | lokale Entwicklung | `appsettings.Development.json` | `config/dev.env` |
| `test` | produktionsnaher Test (aktuell lokal) | `appsettings.Test.json` | `config/test.env` |
| `prod` | Produktion (aktuell lokal zur Vorbereitung) | `appsettings.Production.json` | `config/prod.env` |

**Wo steht was?**

- `config/<env>.env`: nicht-geheime Werte für alle drei Teile (Ports, AI-Modelle, API-URL fürs Frontend). Liegt im Repo.
- `config/<env>.local.env`: **geheime/persönliche Werte** (DB-Passwort, JWT-Secret, API-Key, eigene LAN-IP). **Nicht im Repo**, Vorlage: `config/local.env.example`.
- `Backend/Backend/appsettings.<Env>.json`: .NET-spezifische Einstellungen (z. B. Logging). `appsettings.json` enthält keine Secrets.
- Bereits gesetzte Umgebungsvariablen (z. B. in GitHub Actions oder auf einem Server) haben immer Vorrang.

Für `dev` reicht es, `AI_API_KEY` in `config/dev.local.env` oder wie bisher in `AI/.env` einzutragen. Für `test` und `prod` muss `config/test.local.env` bzw. `config/prod.local.env` angelegt werden, sonst startet nichts:

```powershell
copy config\local.env.example config\test.local.env   # danach ausfüllen
```

**Einheitliche Befehle** (immer im Projekt-Root):

```bash
npm install          # einmalig: Tools im Root installieren
npm run setup        # alle Abhängigkeiten installieren (AI, Frontend, Backend)
npm run db:up        # MySQL-Datenbank per Docker starten (db:down zum Stoppen)

npm run dev          # Backend + AI-Service + Frontend zusammen starten (dev)
npm run start:test   # alles mit test-Konfiguration starten
npm run start:prod   # alles mit prod-Konfiguration starten

npm run dev:backend  # nur ein Teil (auch dev:ai, dev:frontend)

npm test             # alle Tests (Backend ohne Stresstest, AI, Frontend). Docker muss laufen
npm run test:unit    # nur Unit-Tests, ohne Docker
npm run test:stress  # Stresstest
npm run lint         # ESLint + TypeScript-Check fürs Frontend

npm run build:prod   # Backend + Frontend (Web) mit prod-Konfiguration nach publish/ bauen
```

Bei `npm run dev` gehen Tastendrücke an Expo (z. B. `w` für Web, `a` für Android). Beenden mit `Strg+C`.

## 🐳 Docker

Datenbank, AI-Service und Frontend laufen als Container ([docker-compose.yml](docker-compose.yml)). Das **Backend läuft bewusst außerhalb von Docker**, weil es die Windows-OCR nutzt. Es erreicht DB und AI-Service über `localhost`.

| Teil | Image | Port |
|---|---|---|
| Datenbank | `mysql:8.0` | 3306 |
| AI-Service | `fehldiagnosen-ai` ([AI/Dockerfile](AI/Dockerfile)) | 3000 |
| Frontend (Web) | `fehldiagnosen-frontend` ([frontend/Dockerfile](frontend/Dockerfile)) | 8080 |

```bash
npm run docker:build      # Images bauen
npm run docker:up         # DB + AI + Frontend starten (dev). Auch docker:up:test / docker:up:prod
npm run dev:backend       # Backend wie gewohnt außerhalb von Docker starten
npm run docker:check      # Konfigurationstest (auch docker:check:test / docker:check:prod)
npm run docker:logs       # Logs ansehen
npm run docker:down       # alles stoppen
```

Danach ist die Web-App unter http://localhost:8080 erreichbar.

**Ein Image für alle Umgebungen:** Die API-URL des Frontends wird nicht ins Image gebaut, sondern beim Container-Start aus `EXPO_PUBLIC_API_URL` eingesetzt ([frontend/docker/40-api-url.sh](frontend/docker/40-api-url.sh)). Der AI-Service bekommt seine Werte aus `config/<env>.env` und `config/<env>.local.env`, Secrets also nie aus dem Image.

`docker:check` prüft, ob der AI-Service antwortet, das Frontend ausgeliefert wird und die richtige API-URL für die Umgebung enthält. Ist das Backend gestartet, wird es ebenfalls geprüft.

**Umstieg von der alten Compose-Datei** (`Backend/Backend/Docker/docker-compose.yml`, gibt es nicht mehr): Der alte Datenbank-Container heißt gleich und muss einmalig entfernt werden. Die Daten bleiben erhalten, sie liegen weiterhin in `Backend/Backend/Docker/mysql_data`.

```bash
docker rm -f adam_backend_db
npm run db:up
```

### Pipeline: vom CI-Lauf zum Image

```
CI -> Quality Gate -> Docker Build -> Image v1.x -> Registry -> Deploy
```

- **Bei jedem Push** ([build.yml](.github/workflows/build.yml)): Tests, CodeQL, Audits und Lizenzchecks. Der Job `docker` baut die Images und startet dasselbe Image nacheinander mit dev- und test-Konfiguration, jeweils mit Konfigurationstest.
- **Beim Release** ([release.yml](.github/workflows/release.yml)): Nach dem Quality Gate werden die Images mit der Version getaggt (`1.2.3`, `1.2`, `latest`) und in die GitHub Container Registry gepusht, z. B. `ghcr.io/anika4444/fehldiagnosen-ai:1.2.3`. Danach folgen das GitHub-Release, `deploy-test` und `deploy-prod`.
- **Deploy:** Es gibt noch keine Server. Die Deploy-Jobs ziehen die Images deshalb aus der Registry und starten sie auf dem GitHub-Runner mit der Konfiguration der Umgebung, danach läuft der Konfigurationstest. Später wird nur der Start-Schritt durch einen Aufruf auf dem Server ersetzt.
- **Freigabe für prod:** Unter *Settings → Environments → prod* „Required reviewers“ eintragen. Dann wartet `deploy-prod`, bis jemand freigibt. Dort kann auch pro Umgebung das Secret `AI_API_KEY` hinterlegt werden.

Ein bestimmtes Release lokal starten:

```powershell
$env:IMAGE_PREFIX = "ghcr.io/anika4444/fehldiagnosen"; $env:IMAGE_TAG = "1.2.3"
docker compose --env-file config/test.env up -d --no-build --wait
```

## 🔭 Observability (Logs, Health, Metriken)

| | Backend (:5238) | AI-Service (:3000) |
|---|---|---|
| Health (mit Abhängigkeiten) | `GET /api/health` | `GET /ai/health` |
| Liveness (nur „Prozess läuft“) | `GET /api/health/live` | `GET /ai/health/live` |
| Metriken (Prometheus) | `GET /metrics` | `GET /metrics` |

**Health:** Das Backend prüft die Datenbank und den AI-Service. HTTP 200 kommt nur, wenn beides erreichbar ist, sonst HTTP 503. Am Status im Body sieht man, was fehlt: `Degraded` heißt, der AI-Service ist weg (nur die KI-Funktionen fallen aus). `Unhealthy` heißt, die Datenbank ist weg. Der AI-Service prüft seine Konfiguration (API-Key, Modellnamen). Das Sprachmodell selbst ruft er dabei bewusst nicht auf, weil jeder Aufruf Geld kostet. Der Docker-`HEALTHCHECK` nutzt `/ai/health/live`.

**Logs:** Beide Services schreiben strukturierte Logs: lokal als lesbare Zeile, in Docker bzw. außerhalb von `Development` als JSON (eine Zeile pro Ereignis). Jeder Request bekommt eine **Request-ID** (Header `X-Request-ID`). Das Backend reicht sie an den AI-Service weiter, so lassen sich die Logs beider Services zu einem Aufruf zusammenführen. Log-Level im AI-Service über `LOG_LEVEL` (`debug`, `info`, ...), im Backend über `Logging:LogLevel` in den `appsettings*.json`.

> **Keine Patientendaten in Logs.** Geloggt werden nur Metadaten wie IDs, ICD-Code, Dauer, Anzahl der Versuche und Ergebnis, nie Arztbrief-Text, KI-Antworten, Header oder Request-Bodies. Erkannte Medikamente erscheinen nur auf Debug-Level.

**Wichtige Metriken:**

| Metrik | Bedeutung |
|---|---|
| `http_request_duration_seconds` | Anzahl, Dauer und Statuscode pro Endpoint (beide Services) |
| `httpclient_request_duration_seconds` | Aufrufe des Backends an den AI-Service |
| `aspnetcore_healthcheck_status` | Ergebnis der Health-Checks (1 = Healthy, 0.5 = Degraded, 0 = Unhealthy) |
| `llm_request_duration_seconds`, `llm_requests_total` | Dauer und Erfolg der Sprachmodell-Aufrufe je Operation und Modell |
| `ai_explain_validator_attempts`, `ai_explain_validator_results_total` | Wie oft der Validator eine Erklärung ablehnt (Qualität der KI-Antworten) |
| `ai_icd_context_lookups_total`, `ai_invalid_responses_total` | ICD-Wissenskontext gefunden, unbrauchbare KI-Antworten |
| `ai_service_errors_total` | Fehlgeschlagene KI-Aufrufe aus Sicht des Backends |
| `medical_letter_ocr_duration_seconds`, `medical_letter_scans_total` | Dauer der Texterkennung, Ergebnisse der Arztbrief-Scans |
| `medication_scans_total`, `auth_login_attempts_total`, `auth_registrations_total` | Medikamenten-Scans, Anmeldungen, Registrierungen |
| `process_*`, `nodejs_*`, `dotnet_*` | CPU, Speicher, GC, Event-Loop |

**Dashboard (optional):** Prometheus und Grafana starten mit einem vorkonfigurierten Dashboard ([monitoring/](monitoring/)):

```bash
npm run docker:up         # AI-Service (und DB, Frontend)
npm run dev:backend       # Backend auf dem Host
npm run monitoring:up     # Prometheus http://localhost:9090, Grafana http://localhost:3001
npm run monitoring:down
```

In Grafana öffnet sich direkt das Dashboard „ADAM – Übersicht“. Lesen geht ohne Login, zum Bearbeiten mit `admin` / `admin` anmelden (Passwort über `GRAFANA_ADMIN_PASSWORD` änderbar). Unter http://localhost:9090/targets sieht man, ob Prometheus beide Services erreicht.

## 💻 Installation & Start

Kurzfassung mit den einheitlichen Befehlen: `npm install`, `npm run setup`, `npm run db:up`, `npm run dev`. Die einzelnen Schritte und Einmal-Aufgaben (Drugbank-XML, Python, Wissensdatenbanken) stehen hier:

Befolge diese Schritte, um das Projekt lokal auf deinem Rechner zum Laufen zu bringen:

### 1. Repository klonen & updaten

Klone das Projekt auf deinen Rechner:

```bash
git clone https://github.com/anika4444/Fehldiagnosen.git adam

cd adam
```

### 2. Backend einrichten

```bash
# 1. Lade die Drugbank-XML (interaction_database.xml) herunter und lege sie unter folgendem Pfad ab: adam\Backend\Backend\src\KnownMedications

# 2. Starte den Datenbankserver in einem Docker-Container (im Projekt-Root):
npm run db:up

# 3. Als nächstes muss die Datenbankstruktur erstellt werden. Navigiere im Terminal zu adam\Backend\Backend und führe folgenden Befehl aus:
dotnet ef database update
# Nach jedem Pull mit neuen Migrationen (z. B. AddEmergencyAccess für den Notfallzugang) diesen Befehl erneut ausführen.

# 4. Optional: Falls die Datenbank über MySQL Workbench überprüft werden soll, kann eine Verbindung hergestellt werden. Die benötigten Verbindungsdaten befinden sich in der docker-compose.yml im Projekt-Root.

# 5. Installiere die benötigte Python-Abhängigkeit für das Scannen des Arztbriefs. Führe dazu im bestehenden Terminal folgenden Befehl aus:
python -m pip install presidio-analyzer

# 6. Starte nun dein Backend:
dotnet run

# 7. Nun müssen zwei Wissensdatenbanken geladen werden. Öffne hierfür Scalar -> http://localhost:5238/scalar/
Navigiere in Scalar zum Tab "KnownMedication" und rufe folgende API-Endpoints auf:
- post /api/known-medications/rebuild
- post /api/known-medications/rebuild-interactions
```

### 3. Frontend starten (Expo)

Wir nutzen für unser Frontend die Entwicklungsplattform Expo. Öffne das Projekt dazu in einer neuen IDE-Instanz

```bash
# 1. Navigiere zum Frontend-Ordner
cd frontend

# 2. Installiere alle Abhängigkeiten des Frontends (nur beim ersten Mal nötig)
npm install

# 3. Starte den Entwicklungsserver
npm start   # nutzt LAN_IP aus der .env im Projekt-Root für den QR-Code
```

### 4. AI Service starten

Öffne hierfür ein neues Terminal in derselben IDE-Instanz

```bash
# 1. Navigiere zum Ordner AI
cd AI

# 2. Installiere alle Abhängigkeiten des AI-Service (nur beim ersten Mal nötig)
npm install

# 3. Starte den AI-Service:
node aiServices.js
```

### 5. Tests ausführen

Alle Tests auf einmal (im Projekt-Root):

```powershell
.\run-tests.cmd                    # Backend (Unit + Integration), AI-Service, Frontend
.\run-tests.cmd -SkipIntegration   # ohne Integrations- und Stresstests (kein Docker nötig)
```

`run-tests.cmd` ruft `run-tests.ps1` auf und umgeht dabei die PowerShell-Ausführungsrichtlinie. Wer Skripte erlaubt hat (`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`), kann auch direkt `.\run-tests.ps1` nutzen.

Oder einzeln:

```bash
# Backend (xUnit). Die Integrationstests starten per Testcontainers eine MySQL-Datenbank -> Docker Desktop muss laufen
cd Backend
dotnet test Backend.slnx                                  # alle Tests
dotnet test Backend.slnx --filter "Category!=Integration" # nur Unit-Tests

# AI-Service (node:test)
cd AI
npm test

# Frontend (Jest)
cd frontend
npm test
```

Statt Docker kann auch ein vorhandener MySQL-Server genutzt werden. Die Tests legen dort eine eigene Datenbank an und löschen sie danach wieder:

```powershell
$env:TEST_MYSQL_CONNECTION = "Server=localhost;Port=3306;User ID=root;Password=root;"
dotnet test Backend.slnx
```

#### Stresstest

Der Stresstest (`Backend.Tests/Stress/ApiStressTests.cs`) lässt viele Benutzer gleichzeitig auf die API los: alle registrieren sich und loggen sich parallel ein, danach legen sie gleichzeitig Medikamente an, listen, lesen und löschen sie. Er schlägt fehl, wenn ein Request scheitert, ein Benutzer fremde oder falsch viele Daten sieht oder das 95. Perzentil der Antwortzeiten über dem Grenzwert liegt. Am Ende wird ein Bericht mit Anzahl, Fehlern und p50/p95/max pro Endpoint ausgegeben.

```powershell
cd Backend

# Standardlast (20 Benutzer x 10 Durchläufe), Bericht in der Ausgabe
dotnet test Backend.slnx --filter "Category=Stress" --logger "console;verbosity=detailed"

# Mehr Last
$env:STRESS_USERS = "100"; $env:STRESS_ITERATIONS = "20"
dotnet test Backend.slnx --filter "Category=Stress" --logger "console;verbosity=detailed"

# Gegen ein laufendes Backend statt gegen eine Test-Datenbank
# Achtung: legt dort echte Test-Benutzer an
$env:STRESS_BASE_URL = "http://localhost:5238"
dotnet test Backend.slnx --filter "Category=Stress" --logger "console;verbosity=detailed"
```

| Variable | Bedeutung | Standard |
|---|---|---|
| `STRESS_USERS` | gleichzeitige Benutzer | 20 |
| `STRESS_ITERATIONS` | Durchläufe pro Benutzer | 10 |
| `STRESS_MAX_P95_MS` | Grenzwert p95 der Medikamenten-Requests in ms | 2000 |
| `STRESS_BASE_URL` | URL eines laufenden Backends | – (In-Memory-Backend + MySQL-Testdatenbank) |

In der CI (`.github/workflows/build.yml`) laufen die Jobs `test-backend`, `test-ai` und `test-frontend`. Die Build-Jobs hängen davon ab: Schlägt ein Test fehl, wird die Pipeline rot und es werden keine Artefakte gebaut.

### 6. Notfallportal starten

Das Notfallportal ist eine eigene Website für Rettungskräfte und Ärzt:innen. Sie zeigt die freigegebenen Daten über QR-Code oder Notfall-ID plus PIN, ohne Login und nur lesend. Öffne dafür ein weiteres Terminal

```bash
# 1. Navigiere zum Ordner emergency-portal
cd emergency-portal

# 2. Installiere alle Abhängigkeiten des Portals (nur beim ersten Mal nötig)
npm install

# 3. Starte das Portal:
npm run dev
```

Das Portal läuft auf http://localhost:5173. Die Codes erstellst du in der App unter Daten > Notfallzugang.

**Portal am Handy testen**
Ein QR-Code zeigt standardmäßig auf `localhost` und funktioniert deshalb nur am PC. Für einen Test mit einem zweiten Handy im selben WLAN:

- In `Backend/Backend/appsettings.json` unter `Emergency` bei `PortalBaseUrl` und `AllowedOrigins` die LAN-IP eintragen, z. B. `http://192.168.0.198:5173`
- Im Ordner `emergency-portal` eine Datei `.env` anlegen mit `VITE_API_BASE_URL=http://192.168.0.198:5238/api`
- Danach Backend und Portal neu starten. Die App baut die QR-Adresse beim nächsten Öffnen mit der neuen Adresse, ein bereits gespeichertes Sperrbild muss neu erstellt werden

### 🚀 Verwendung der App

**Am Handy**
Hierfür benötigst du die Expo App. Zusätzlich musst du die IP deines PCs als `LAN_IP` in der `.env` im Projekt-Root eintragen. Wichtig ist, dass sich das Handy und der Laptop im gleichen WLAN befinden. Zum Starten der Anwendung muss anschließend der QR-Code gescannt werden.

**Im Webbrowser**
Möchtest du die App direkt auf dem PC im Browser öffnen?

- Drücke in demselben Terminal, in dem der Expo-Server läuft, die Taste **`w`**.
- _Hinweis: Expo öffnet dann automatisch einen neuen Browser-Tab mit der App._
- Im Browser stehen jedoch nicht alle Features zur Verfügung. Eine Registrierung über das Frontend funktioniert beispielsweise nur auf einem mobilen Gerät. Alternativ kann über Scalar ein Account erstellt werden. Der JSON-Body des Requests muss dabei folgendem Muster entsprechen:

```json
{
  "userName": "max",
  "email": "max.mustermann@fhv.at",
  "password": "12345678",
  "role": "Patient",
  "firstName": "Max",
  "lastName": "Mustermann",
  "dateOfBirth": "2001-01-01",
  "gender": 0
}
```

**🤖 Auf einem Emulator testen (Android Studio):**
Wenn du dir das ständige Scannen mit dem echten Handy sparen willst, kannst du dir ein virtuelles Smartphone auf deinem PC einrichten:

1. Öffne Android Studio, klicke auf **More Actions** (oder gehe ins Menü) und öffne den **Virtual Device Manager**.
2. Klicke auf "Create Device" und richte dir ein virtuelles Smartphone ein (z.B. ein Pixel 6).
3. Starte den Emulator über den kleinen Play-Button.
4. Sobald das virtuelle Handy auf deinem Bildschirm hochgefahren ist, drücke in demselben Terminal, in dem der Expo-Server läuft, die Taste **`a`**.
5. Expo installiert die App jetzt vollautomatisch auf deinem Emulator
