# 🚀 ADAM

Willkommen bei ADAM! Ein Tool, dass dir bei der Verwaltung von medizinischen Daten hilft!

## 🤝 Unser Team-Workflow (WICHTIG!)

Damit wir uns bei 5 Leuten nicht gegenseitig den Code zerschießen, arbeiten wir mit einem strikten Kanban-Board und Pull Requests. **Niemand pusht direkt auf den `main`-Branch!**

Hier ist unser Schritt-für-Schritt Workflow für jede Aufgabe:

### 1. Aufgabe schnappen
1. Geh auf unser [GitHub Project Board](https://github.com/users/anika4444/projects/2/views/1).
2. Such dir eine Aufgabe aus der Spalte **Ready** aus.
3. Ziehe die Karte in **In progress** und trage dich rechts bei "Assignees" ein, damit jeder weiß: Du bist da dran!

### 2. Branch erstellen (Lokal)
Bevor du programmierst, hol dir den aktuellsten Stand und mach dir eine eigene Kopie (Branch):
```bash
# 1. Wechsel auf den main-Branch
git checkout main

# 2. Hol dir die neuesten Updates vom Server
git pull

# 3. Erstelle deinen eigenen Arbeits-Branch (z.B. feature/login-button oder bugfix/header)
git checkout -b feature/dein-aufgaben-name
```

### 3. Coden & Speichern
Jetzt kannst du an deiner Aufgabe arbeiten. Wenn du fertig bist (oder einen guten Zwischenstand hast), speicherst du deine Änderungen lokal:
```bash
# 1. Füge alle geänderten Dateien hinzu
git add .

# 2. Speichere die Änderungen mit einer klaren Nachricht
git commit -m "Fügt das neue Daten-Formular hinzu"
```
### 4. Coden hochladen
Lade deinen fertigen Branch auf GitHub hoch, damit der Rest des Teams ihn sehen kann:
```bash
git push origin feature/dein-aufgaben-name
```
### 5. Pull Request (PR) erstellen
1. Geh auf GitHub in unser Repository. Dort sollte jetzt ein gelber Button mit der Aufschrift Compare & pull request auftauchen. Klick da drauf!

2. Beschreibe kurz, was du gemacht hast. Pro-Tipp: Wenn du z.B. Closes #5 in die Beschreibung schreibst (falls deine Issue-Nummer die 5 ist), wird das Issue später automatisch geschlossen.

3. Verschiebe deine Karte auf unserem Kanban-Board in die Spalte In review.

### 6. Review & Merge (Vier-Augen-Prinzip)
Sag dem Team Bescheid (z.B. in unserer Gruppe), dass dein PR fertig ist.
Ein anderes Teammitglied schaut sich deinen Code auf GitHub an.
Wenn alles fehlerfrei aussieht, klickt die Person auf Approve und danach auf Merge pull request.
Dein Code ist jetzt sicher im main-Branch gelandet und deine Karte wandert auf dem Kanban-Board zu Done. 🎉

## 🛠 Voraussetzungen

Bevor du loslegst, stelle sicher, dass du Folgendes bereit hast:
* **Node.js** (wird benötigt, um die Pakete über `npm` zu installieren)
* **Expo Go App** (Lade dir diese App auf dein Smartphone herunter – egal ob iOS oder Android)
* *(Optional)* **Android Studio** (Falls du das Frontend lieber auf einem virtuellen Emulator am PC testen willst, statt auf deinem echten Handy. Ich helfe euch gerne bei der Einrichtung!)

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
