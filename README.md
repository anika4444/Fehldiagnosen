# 🚀 ADAM

Willkommen bei ADAM! Ein Tool, dass dir bei der Verwaltung von medizinischen Daten hilft!

## 🛠 Voraussetzungen

Bevor du loslegst, stelle sicher, dass du Folgendes bereit hast:

- **Node.js** (wird benötigt, um die Pakete über `npm` zu installieren)
- **Docker**
- _(Optional)_ **Expo Go App** (Lade dir diese App auf dein Smartphone herunter – egal ob iOS oder Android) -> jedoch müsste hier im Frontend im axiosConfig die LAN_IP und die Plattform welches es benutzen sollte angepasst werden
- _(Optional)_ **Android Studio** (Falls du das Frontend lieber auf einem virtuellen Emulator am PC testen willst.)
- **Visual Studio** mit .NET 10
- für AI einen gültigen API-Key plus die passenden Env-Variablen.
- **Drugbank XML** (aus folgendem Link https://fhvorarlberg-my.sharepoint.com/:f:/g/personal/asc9769_students_fhv_at/IgAba5IWyJyFTre7A00NZZYNAdOH0OawLz2UUscFsOQMz9w?e=TcmbgT)

## 💻 Installation & Start

Folge diesen Schritten, um unser Projekt lokal auf deinem Rechner zum Laufen zu bringen:

### 1. Repository klonen & updaten

Lade dir das Projekt auf deinen Rechner herunter:

```bash
git clone https://github.com/anika4444/Fehldiagnosen.git
cd dein-projekt
```

### 2. Backend einrichten

```bash
# 1. Lege die Drugbank XML ab. Diese gehört zu dem folgenden Pfad -> Fehldiagnosen\Backend\Backend\src\KnownMedications\interaction_database.xml
# 2. Installiere die Datenbank. Navigiere hierzu im Eingabeaufforderung zu Fehldiagnosen\Backend\Backend\Docker und führe folgenden Befehl aus
docker compose up
# 3. Als nächstes muss die Datenbank erstellt werden. Navigiere hierzu im Powershell zu Fehldiagnosen\Backend\Backend\ und führe folgenden Befehl aus
dotnet ef database update
# 4. Starte als nächstes dein Backend
# 5. Nun müssen zwei Wissensdatenbanken geladen werden. Öffne hierzu Scalar -> http://localhost:5238/scalar/
Navigiere nun zu "KnownMedication" und führe folgende Schnittstellen aus:
- post /api/known-medications/rebuild
- post /api/known-medications/rebuild-interactions
```

### 3. Frontend starten (Expo)

Wir nutzen für unser Frontend Expo. So bekommst du es zum Laufen:

```bash
# 1. In den Frontend-Ordner wechseln (Name ggf. anpassen)
cd frontend

# 2. Alle Abhängigkeiten installieren (nur beim ersten Mal nötig)
npm install

# 3. Den Entwicklungsserver starten
npx expo start
```

### 4. AI Service starten

```bash
# 1. Öffne ein neues Terminal
# 2. Navigiere zu Fehldiagnosen/AI
# 3. Führe folgendes aus
npm install
# 4. Starte den AI Service mit: node aiServices.js
```

### 🚀 Die App benutzen

**Am Handy benutzen**
Hierfür benötigst du die Expo App. Zusätzlich musst du im axiosConfig im Frontend die LAN_IP und die darunterliegende Schleife (bezüglich Betriebssystem). Wichtig ist, dass das Handy und der Laptop im gleichen WLAN sind. Um es zu starten, muss dann der QR-Code gescannt werden.

**Im Webbrowser benutzen:**
Möchtest du die App direkt auf dem PC im Browser sehen?

- Drücke in deinem Terminal, in dem der Expo-Server läuft, einfach die Taste **`w`**.
- _Hinweis: Expo öffnet dann automatisch einen neuen Tab mit unserer App._
- Hierbei sind jedoch nicht alle Features möglich. Eine Registrierung funktioniert nur auf einem Handy. In diesem Fall muss sonst mittels Scalar ein Account erstellt werden. Hierfür muss die JSON so aussehen:

```json
{
  "userName": "max",
  "email": "max.mustermann@fhv.at",
  "password": "passwort",
  "role": "Patient",
  "firstName": "Max",
  "lastName": "Mustermann",
  "dateOfBirth": "2001-01-01",
  "gender": 1
}
```

**🤖 Auf einem virtuellen Handy testen (Android Studio):**
Wenn du dir das ständige Scannen mit dem echten Handy sparen willst, kannst du dir ein virtuelles Smartphone auf deinem PC einrichten:

1. Öffne Android Studio, klicke auf **More Actions** (oder gehe ins Menü) und öffne den **Virtual Device Manager**.
2. Klicke auf "Create Device" und richte dir ein virtuelles Smartphone ein (z.B. ein Pixel 6).
3. Starte dieses virtuelle Handy (über den kleinen Play-Button).
4. Sobald das virtuelle Handy auf deinem Bildschirm hochgefahren ist, drücke in deinem Terminal (wo Expo läuft) einfach die Taste **`a`**.
5. Expo installiert die App jetzt vollautomatisch auf deinem Emulator!
