# Prüfbefunde Nothelfer Feature (13.10.2026)

Fünf unabhängige Prüfer (Sicherheit, Backend/EF, Portal mit Browser Tests, App, Abgleich Angabe) sind fertig. Scope laut Arun: nur die Erweiterung (Diff gegen 17467cb).

Stand 15.10.2026: Alle Befunde unten sind korrigiert, entschieden oder als offen dokumentiert. Eine Nachprüfung durch einen weiteren unabhängigen Prüfer steht am Ende dieser Datei. Arbeitskopie: /home/claude/anika4444/fehldiagnosen, lokal bei Arun E:\DEV\Projekte\Adam (Branch feature/emergency-pages).

Kein Compile Fehler gefunden (ca. 90 % sicher, kein .NET SDK verfügbar). Kontrakte Portal, App, Backend, KI passen feldgenau.

## Hoch
1. PIN Sperre nicht atomar: parallele Versuche umgehen Sperre; `Update()` in MySqlEmergencyAccessRepository schreibt ganze Zeile zurück (kann deaktivierten Code reaktivieren, widerrufene Session zurückholen). Fix: Update() weg, nur SaveChanges; Versuch atomar reservieren (SQL UPDATE ... WHERE nicht gesperrt) oder Sperre pro ID; Einmal-Link atomar beanspruchen.
2. Migration fehlt: Medication.UpdatedAt bricht alle Medikamentenabfragen bis `dotnet ef migrations add AddEmergencyAccess` + `database update` (Arun, einmal, mitcommitten).
3. Arztbriefe im Portal immer leer: Status.Confirmed, ReworkedText, AiSuggestion werden nie gesetzt. Briefdeutungen landen als Diagnosis (AIService.InterpretMedicalLetter). Fix im EmergencyDataService.
4. Portal 360 px: lange Wörter/URLs erzeugen horizontales Scrollen (scrollWidth bis 714). Fix: overflow-wrap anywhere, min-width 0 in .row.
5. Fehlgeschlagene Wechselwirkungsprüfung erscheint als "keine Wechselwirkungen" und wird 10 min gecacht. Fix: interactionsUnavailable Flag, nicht cachen, Portal Hinweis.
6. App: Codes im Speicher nicht pro Patient, bei publicId Abweichung nicht gelöscht; Sperrbild und Notfallpass lesen ohne Serverabgleich (alter oder fremder QR möglich). Fix: Key pro patientId, bei Abweichung löschen, Abgleich in beiden Screens.
7. App Notfallpass schreibt "Keine" bei nicht freigegebenen Medikamenten (gefährlich). Fix: Block weglassen bzw. "nicht freigegeben".
8. App Android: Freigabe Alert wird von anderem Alert verdrängt und nie wieder gezeigt. Fix: Warteschlange, handled erst nach Entscheidung, Fehler (409) anzeigen.

## Mittel
- Rate Limit pro IP: hinter Proxy ein gemeinsamer Bucket, IPv6 pro /128. Fix: ForwardedHeaders mit KnownProxies (Config), IPv6 /64.
- Enumeration: unbekannte ID schneller (kein BCrypt) und 429 nur bei existierender ID. Fix: Dummy BCrypt, einheitliche 401.
- Regenerate/Deactivate betrifft nur neuesten aktiven Code. Fix: alle aktiven des Typs deaktivieren.
- Logflut verdrängt echte Zugriffe aus den 100 Einträgen. Fix: erfolgreiche und fehlgeschlagene getrennt laden.
- Portal prüft Sitzung nach Laden nie wieder (Alle Zugriffe beenden wirkt nicht sofort). Fix: GET /session alle 30 s und bei visibilitychange.
- Portal Ablauf hängt an Geräteuhr. Fix: secondsRemaining vom Server.
- Portal Sprungmarken unter Sticky Header (Behandlung 195 px). Fix: Tabs einzeilig scrollbar, scroll-margin passend.
- Portal: Session wird bei jedem Fehler gelöscht (Einmal-Link dann verloren), kein Retry. Fix: nur bei 401 löschen, Retry Button.
- Settings Ersetzen nicht atomar, Duplikate/Zahlen in Kategorie führen zu 500 und Reset. Fix: validieren, in place aktualisieren.
- Interaktionen verraten Medikamentennamen bei abgeschalteten Medikamenten; LastUpdated über nicht geteilte Daten. Fix: nur geteilte Daten.
- Chronische Erkrankungen ignorieren MedicalHistoryEntries (Vorerkrankungen mit Status). Fix: einbeziehen.
- App iOS Sperrbild 3fach Auflösung (Absturzgefahr). Fix: auf iOS Faktor 1, releaseCapture.
- App erster Zugriff nie gemeldet, lastSeen global. Fix: bei leerem Log 0 speichern, Key pro Patient.
- App Dark Mode Kontrast ca. 2:1 an vier Stellen.
- App Texte "du" statt "Sie" wie Rest der App.
- Texte versprechen Benachrichtigung immer, gilt nur bei offener App (App Einwilligung, Portal Startseite). KI Verarbeitung in Einwilligung nennen.

## Niedrig (Auswahl)
- Insights Cache ignoriert Settings Änderung; Übersetzungen ohne Timeout; MaxFailedAttempts 0 teilt durch 0; VerifyPin fängt nur SaltParseException; Request DTOs non-nullable führen zu ProblemDetails ohne message; PendingApproval im Log bleibt ewig "wartet"; fehlende FKs PatientId; Consent Doppelklick 500.
- KI Zusammenfassung 3 bis 5 Zeilen nicht erzwungen; leere Zusammenfassung zeigt leere Box.
- Portal: /a/ Pfade mit Zusatzzeichen behalten Token in Adresszeile; PIN Fehler löscht auch ID; kein h1; Fokusring Kontrast; PIN Feld type password (Passwortmanager); Schrift Figtree nicht geladen.
- App: Prettier auf neuen Dateien; Share auf Web; router.back bei Deep Link; 401 Polling endlos; Touch Targets unter 44; Textdetails (Einmal-Link per Einmal-Link, 1 Stunden, Gilt 24 Stunden fest).
- CI: BCrypt.Net-Next hat nur licenseUrl, nuget-license braucht evtl. Mapping auf MIT.

## Entscheidungen von Arun (15.10.2026)
- Captcha: nicht umgesetzt, als offener Punkt dokumentiert. Schutz bisher über Sperre pro ID und Rate Limit pro IP.
- Freigabe in der App: standardmäßig aus.
- Einmal-Link: immer ohne Freigabe.
- QR Token: im Fragment (`/a#token`), damit er nicht in Hosting Logs landet.
- Anrede: Sie.
- Lokale Benachrichtigungen: nicht umgesetzt, Texte sagen ehrlich, dass Meldungen nur bei geöffneter App kommen.

## Außerhalb Scope (nicht bearbeiten)
JWT Secret in appsettings, IsArzt Umgehung in alten Controllern, bestehender tsc Fehler base-inline-picker, AIService InterpretEndpoint Key.

## Nachprüfung (15.10.2026)
Ein weiterer Prüfer hat alle Korrekturen gegen die Befunde oben abgeglichen: alles korrigiert, entschieden oder offen dokumentiert, C# Review ohne Compile Fehler, 39 von 39 Browser Tests im Portal bestanden. Er fand acht neue, kleinere Punkte. Alle sind behoben:

1. KI Zusammenfassung konnte "keine Medikamente" sagen, obwohl Medikamente nur nicht freigegeben waren. Jetzt kommen nicht freigegebene Bereiche als null an und heißen im Prompt "nicht freigegeben"; die Leermeldung nennt nur freigegebene Bereiche.
2. Medikamente ohne ATC Code oder ohne DrugBank Treffer galten still als geprüft. Jetzt als "nicht geprüft" im Portal und im Prompt; eine fehlgeschlagene Prüfung heißt "Prüfung nicht verfügbar".
3. App: Ein langsames Neuladen konnte den gerade neu erzeugten Code vom Gerät löschen. Jetzt werden veraltete Antworten verworfen und während einer Codeänderung wird nichts gelöscht.
4. App: Eine neue Zugriffsmeldung überschrieb eine noch nicht gezeigte. Jetzt sammeln sich neue Einträge bis ein Dialog frei ist, Fehlermeldungen stehen in einer eigenen Warteschlange, verdrängte Dialoge kommen wieder.
5. KI Satzbegrenzung trennte bei Abkürzungen wie "z. B." oder "ca.". Abkürzungen sind jetzt geschützt, der Prompt verlangt ausgeschriebene Wörter.
6. Zwei Meldungen im Backend standen noch in der du Form.
7. Dummy BCrypt lief innerhalb der Sperre. Unbekannte IDs nehmen jetzt keine Sperre mehr, gesperrte oder inaktive IDs rechnen die Dummy Prüfung nach dem Freigeben der Sperre. Der Code wird nach dem Warten auf die Sperre neu aus der Datenbank gelesen.
8. Restliche Zeitunterschiede zwischen unbekannter und echter ID (zusätzliche Datenbankzugriffe bei echter ID) bleiben messbar klein. Dokumentiert als offener Punkt, Abhilfe wäre eine feste Mindestantwortzeit.

Zusätzlich dokumentiert: `EmergencyLocks` wirkt nur innerhalb eines Backend Prozesses. Bei mehreren Instanzen braucht die PIN Sperre eine Datenbanksperre (zum Beispiel `SELECT ... FOR UPDATE`).
