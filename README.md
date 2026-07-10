# 🚀 ADAM

Willkommen bei ADAM! Ein Tool, dass dir bei der Verwaltung von medizinischen Daten hilft!

## 🛠 Voraussetzungen

Bevor du loslegst, stelle sicher, dass du Folgendes bereit hast:
* **Node.js** (wird benötigt, um die Pakete über `npm` zu installieren)
* **Docker** 
* *(Optional)* **Expo Go App** (Lade dir diese App auf dein Smartphone herunter – egal ob iOS oder Android) -> jedoch müsste hier im Frontend im axiosConfig die LAN_IP und die Plattform welches es benutzen sollte angepasst werden
* *(Optional)* **Android Studio** (Falls du das Frontend lieber auf einem virtuellen Emulator am PC testen willst.)

* 
## 💻 Installation & Start

Folge diesen Schritten, um unser Projekt lokal auf deinem Rechner zum Laufen zu bringen:

### 1. Repository klonen & updaten
Lade dir das Projekt auf deinen Rechner herunter:
```bash
git clone https://github.com/anika4444/Fehldiagnosen.git
cd dein-projekt
```

### 2. Frontend starten (Expo)
Wir nutzen für unser Frontend Expo. So bekommst du es zum Laufen:
```bash
# 1. In den Frontend-Ordner wechseln (Name ggf. anpassen)
cd frontend

# 2. Alle Abhängigkeiten installieren (nur beim ersten Mal nötig)
npm install

# 3. Den Entwicklungsserver starten
npx expo start
```
Der Magic-Trick (Live am Handy testen): Sobald du npx expo start ausführst, erscheint ein QR-Code im Terminal. Öffne die Expo Go App auf deinem Handy, scanne den Code und zack – du bist in unserer App! Alles, was du jetzt programmierst, aktualisiert sich in Echtzeit auf deinem Bildschirm.

### 🚀 Alternativen zum echten Handy (Browser & Android Studio)

Wenn `npx expo start` in deinem Terminal läuft, hast du neben dem QR-Code noch andere coole Möglichkeiten, die App zu testen. Schau einfach auf die Tastenbefehle, die dir im Terminal angezeigt werden:

**🌐 Im Webbrowser testen:**
Möchtest du die App schnell direkt auf dem PC im Browser (z.B. Chrome oder Firefox) sehen?
* Drücke in deinem Terminal, in dem der Expo-Server läuft, einfach die Taste **`w`**. 
* *Hinweis: Expo öffnet dann automatisch einen neuen Tab mit unserer App.*

**🤖 Auf einem virtuellen Handy testen (Android Studio):**
Wenn du dir das ständige Scannen mit dem echten Handy sparen willst, kannst du dir ein virtuelles Smartphone auf deinem PC einrichten:
1. Lade dir [Android Studio](https://developer.android.com/studio) herunter und installiere es.
2. Öffne Android Studio, klicke auf **More Actions** (oder gehe ins Menü) und öffne den **Virtual Device Manager**.
3. Klicke auf "Create Device" und richte dir ein virtuelles Smartphone ein (z.B. ein Pixel 6).
4. Starte dieses virtuelle Handy (über den kleinen Play-Button).
5. Sobald das virtuelle Handy auf deinem Bildschirm hochgefahren ist, drücke in deinem Terminal (wo Expo läuft) einfach die Taste **`a`**. 
6. *Magic:* Expo installiert die App jetzt vollautomatisch auf deinem Emulator!
