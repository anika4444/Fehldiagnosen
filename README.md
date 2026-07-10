# 🚀 ADAM

Willkommen bei ADAM! Ein Tool, dass dir bei der Verwaltung von medizinischen Daten hilft.

## 🛠 Voraussetzungen

Bevor du loslegst, stelle sicher, dass du Folgendes bereit hast:

- **Node.js**: Wird benötigt, um die Pakete über `npm` zu installieren
- **Docker**
- _(Optional)_ **Expo Go App**: Lade die App auf deinem Smartphone herunter, unabhängig davon, ob du iOS oder Android verwendest. Anschließend müssen im Frontend in der axiosConfig die LAN_IP sowie die zu verwendende Plattform angepasst werden
- _(Optional)_ **Android Studio**: Falls du das Frontend lieber auf einem virtuellen Emulator am PC testen willst
- **Visual Studio**: Mit .NET 10
- **.env**: Für unsere AI-Services (Unterordner _AI_) werden ein gültiger **API-Key** sowie die dazugehörigen **Umgebungsvariablen** benötigt
- **Drugbank XML**: Aus folgendem Link: https://fhvorarlberg-my.sharepoint.com/:f:/g/personal/asc9769_students_fhv_at/IgAba5IWyJyFTre7A00NZZYNAdOH0OawLz2UUscFsOQMz9w?e=TcmbgT

## 💻 Installation & Start

Befolge diese Schritte, um das Projekt lokal auf deinem Rechner zum Laufen zu bringen:

### 1. Repository klonen & updaten

Klone das Projekt auf deinen Rechner:

```bash
git clone https://github.com/anika4444/Fehldiagnosen.git dein-projekt

cd dein-projekt
```

### 2. Backend einrichten

```bash
# 1. Lege die Drugbank XML ab. Diese gehört zu dem folgenden Pfad -> Fehldiagnosen\Backend\Backend\src\KnownMedications\interaction_database.xml

# 2. Installiere die Datenbank. Navigiere hierzu in PowerShell oder in der Eingabeaufforderung zu Fehldiagnosen\Backend\Backend\Docker und führe folgenden Befehl aus:
docker compose up -d

# 3. Als nächstes muss die Datenbank erstellt werden. Navigiere im Terminal zu Fehldiagnosen\Backend\Backend\ und führe folgenden Befehl aus:
dotnet ef database update

# 4. Starte dein Backend:
dotnet run

# 5. Nun müssen zwei Wissensdatenbanken geladen werden. Öffne hierfür Scalar -> http://localhost:5238/scalar/
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
npx expo start
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

### 🚀 Verwendung der App

**Am Handy**
Hierfür benötigst du die Expo App. Zusätzlich musst du in der axiosConfig im Frontend die LAN_IP sowie die darunterliegende Schleife (abhängig vom Betriebssystem) anpassen. Wichtig ist, dass sich das Handy und der Laptop im gleichen WLAN befinden. Zum Starten der Anwendung muss anschließend der QR-Code gescannt werden.

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
