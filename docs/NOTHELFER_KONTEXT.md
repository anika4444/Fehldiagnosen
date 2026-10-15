# Nothelfer Feature: Projektkontext und Umsetzungsplan

Stand: 09.10.2026, Repo `anika4444/Fehldiagnosen`, Branch `main`, Commit `17467cb`.
Zweck dieser Datei: Arbeitsgrundlage für die Umsetzung. Wer sie liest, muss das Repo nicht erneut komplett durchsuchen.

## 1. Repo auf einen Blick

| Teil | Pfad | Technik |
|---|---|---|
| App (Patient) | `frontend/` | Expo SDK 54, Expo Router 6, React Native 0.81, React 19, TS strict, axios |
| Backend | `Backend/Backend/` | ASP.NET Core .NET 10 (`net10.0-windows`), EF Core 10, MySQL 8 (Docker), Identity + JWT, Scalar unter `/scalar` |
| KI Service | `AI/` | Node, Express 5, LangChain, Port 3000, Einstieg `aiServices.js` |
| CI | `.github/workflows/build.yml` | Backend Build auf Windows, Expo Web Export auf Ubuntu |

Backend Port lokal: `http://localhost:5238/api`. DB: `adam_api_db`, User `user`/`password`.
Einzige Migration: `Migrations/20260608122700_initialCreate`. Neue Tabellen also per `dotnet ef migrations add <Name>`.

## 2. Backend Schichten und Muster

Ordner unter `Backend/Backend/`:

- `Domain/Entities/` Entities implementieren `IEntity` (`int Id`). DataAnnotations für Länge und Pflicht.
- `Domain/Enums/` z. B. `EntryBy { Patient, Doctor }`, `ConditionStatus { Chronical, Active, InRemission }`.
- `Application/Repositories/` Interfaces, erben meist `IRepository<T>` (`FindAllAsync, FindByIdAsync, AddAsync, UpdateAsync, DeleteAsync`), plus eigene Methoden wie `FindAllByPatientIdAsync(int)`. Achtung: `IRepository` liegt im Namespace `Backend.Domain.Interfaces`.
- `Infrastructure/Repositories/MySql<Name>Repository.cs` Implementierung, bekommt `MySqlDbContext` injiziert.
- `Application/Services/<Name>Service/` mit `I<Name>Service.cs`, `<Name>Service.cs`, Unterordner `Dto/` (`Create<Name>Request`, `<Name>Response`).
- `Application/Common/Results/ServiceResult<T>` mit `Success, NotFound, Forbidden, Invalid, Unauthorized, Conflict, InternalServerError`.
- `Api/Controller/` erben `BaseApiController` (`GetCurrentUserId()`, `IsArzt()`, `HandleServiceError(type, msg)`).
- `Application/Mapper/DtoMapper.cs` Entity zu DTO, registriert als Transient.
- Registrierung aller Services und Repos in `Program.cs` per `AddScoped<I..., ...>()`.

Typischer Controller Ablauf:
```
var userId = IsArzt() ? null : GetCurrentUserId();
var result = await _service.XAsync(..., userId);
if (result.IsSuccess) return Ok(result.Data);
return HandleServiceError(result.ErrorType, result.ErrorMessage);
```
Besitzprüfung passiert im Service: `if (userId != null && patient.UserId != userId) return Forbidden(...)`.

JWT Claims beim Login (`UserService`): `sub` = UserId, Rollen, `PatientId`. Rollen aus `DbInitializer`: `Patient`, `Arzt`.

## 3. Relevante Datenquellen für das Portal

| Angabe Kollegin | Entity / Quelle | Felder |
|---|---|---|
| Aktuelle Medikamente + Dosierung | `Medication` | `Name, Dosage, IntakeFrequency, IntakeStartDate, DurationInDays, EndDate (berechnet), Indication, AtcCode, Notes` |
| Wechselwirkungen | `DrugInteractionService.GetAllPatientRisksAsync(List<string> atcCodes)` | liefert `MedicationRiskDto { Interactions, SideEffects }`. Methode existiert, steht aber NICHT im Interface `IDrugInteractionService` |
| Aktuelle Symptome | `PatientSymptom` | `SymptomName, OccurrenceTime, Intensity (1..10), Duration, PossibleTrigger, Notes, Details (JSON)` |
| Symptomverlauf | `PatientSymptom` alle, sortiert nach `OccurrenceTime` | wie oben |
| Arztbriefe + KI Erklärung | `MedicalLetter` | `Subject, ReciverName, AiSuggestion, ReworkedText, Status, Startdate` |
| Medikamentenhistorie | `Medication` inklusive beendeter | wie oben |
| Diagnosen (optional, siehe Fragen) | `Diagnosis` | `Title, IcdCode, ConditionStatus, Severity, AiExplanation` |
| KI Kurzzusammenfassung | Node Service, neue Route nach Vorbild `AI/checkupSummary.js` | Backend ruft per `IHttpClientFactory` auf, Muster in `CheckupService.CallAiServiceForCheckupSummary` |

Definition "aktuell" für Medikamente (Vorschlag): `IntakeStartDate <= jetzt` und (`DurationInDays == 0` oder `EndDate >= jetzt`). Klären: bedeutet `DurationInDays = 0` Dauermedikation?

"Daten zuletzt aktualisiert": `Medication` hat KEIN `UpdatedAt`. Entweder Feld ergänzen (Migration) oder Maximum aus `PatientSymptom.CreatedAt`, `MedicalLetter.UpdatedAt`, `Diagnosis.UpdatedAt` nehmen. Empfehlung: `UpdatedAt` an `Medication` ergänzen.

## 4. Frontend (Expo App) Muster

- Routing: `app/_layout.tsx` (Auth Guard über Token), `app/(auth)/`, `app/(tabs)/` mit `index`, `symptom`, `data`. Einzelseiten direkt in `app/` (`medications.tsx`, `diagnosis.tsx`, `checkup.tsx` ...).
- API: `src/api/<name>Service.ts` als Objekt mit async Methoden, nutzt `axiosConfig` (Interceptor hängt Bearer Token an).
- Hooks: `src/hooks/use-<name>.ts`, State + `fetch` + `save`. `usePatient()` liest `patientId` aus SecureStore bzw. localStorage.
- Typen: `src/types/<name>-type.ts` (`<Name>Response`, `Create<Name>Request`).
- Komponenten: `src/components/<feature>/<name>-card.tsx`, `<name>-form.tsx`; UI Basis in `src/components/ui/` (`Card`, `PrimaryButton`, `HeaderView`, `ModalCard`, `DataList`, `DetailField`).
- Theme: `src/constants/theme.ts`. Farben: Emerald `#059669`, Mint `#D1FAE5`, DarkMoss `#064E3B`, Ivory `#F9FAFB`, Gold `#F59E0B`, Rot `#EF4444`, Dark BG `#151718`.
- Alias `@/*` zeigt auf `src/*`.
- Kein `expo-notifications`, kein `react-native-qrcode-svg`, kein Widget Setup vorhanden. `@microsoft/signalr` ist installiert, im Backend gibt es aber keinen Hub.

## 5. Auffälligkeiten im bestehenden Code (wichtig für das Feature)

1. `IsArzt()` setzt `userId = null` und hebelt damit jede Besitzprüfung aus. Jeder Account mit Rolle `Arzt` sieht alle Patienten. Die Angabe will keinen Arzt Login. Das Portal darf diese Rolle NICHT nutzen.
2. `AIController` hat kein `[Authorize]`, ruft aber `GetCurrentUserId()` auf. Ohne Token gibt es eine Exception statt 401.
3. `AIService` liest `AiServiceOptions:InterpretEndpoint`, in `appsettings.json` heißt der Key `MedicalLetterInterpretationEndpoint`. Arztbrief Interpretation läuft dadurch ins Leere.
4. CORS `AllowAll` mit `AllowCredentials`, JWT Secret im Klartext in `appsettings.json`. Für das Portal braucht es eine eigene, enge CORS Policy.
5. `MedicationController.ScanMedication` ist `[AllowAnonymous]`.
6. `IMedicalLetterRepository` hat keine Methode `FindAllByPatientIdAsync`, muss ergänzt werden.

## 6. Kernproblem Klartext Token

Server speichert Token und PIN nur gehasht. Die App muss QR Code und PIN aber dauerhaft anzeigen können, auch auf dem Sperrbildschirm.
Lösung: Klartext wird nur einmal beim Generieren an die App zurückgegeben und dort in `expo-secure-store` abgelegt. Neuinstallation oder neues Gerät heißt Code neu generieren. Der Server kann ihn nie wieder herausgeben.

## 7. Zielarchitektur

```
Expo App (Patient)          Notfall Portal (Vite React TS)
  Codes verwalten             /            PIN Eingabe
  Freigaben einstellen        /a/:token    QR Einstieg
  Protokoll ansehen           /view        Daten, read only
  Sperrbildschirm             |
        |                     |
        +---- .NET Backend ---+
              /api/patients/{id}/emergency/...   (JWT, Patient)
              /api/emergency/...                 (anonym, Session)
                     |
                MySQL + Node KI Service
```

### Neue Entities (Vorschlag)

- `EmergencyAccessCode`: `Id, PatientId, Type (Emergency|Treatment|OneTime), PublicId (8 Zeichen, eindeutig), TokenHash (SHA256), PinHash (Argon2/BCrypt), IsActive, RequiresApproval, ExpiresAt (nur OneTime), FailedAttempts, LockedUntil, CreatedAt`
- `EmergencyAccessSession`: `Id, CodeId, SessionTokenHash, CreatedAt, ExpiresAt, RevokedAt, ApprovalState (NotRequired|Pending|Approved|Denied)`
- `EmergencyAccessLog`: `Id, PatientId, CodeType, AccessedAt, IpAddress, DeviceType, AccessorName, AccessorInstitution, Success`
- `EmergencyShareSetting`: `Id, PatientId, CodeType, Category (Medications|Interactions|Symptoms|RedFlags|AiSummary|SymptomHistory|MedicalLetters|MedicationHistory|Diagnoses), IsEnabled`
- `PushDevice`: `Id, PatientId, ExpoPushToken, CreatedAt`

### Endpoints

Patient (JWT, `[Authorize]`), Controller `EmergencyCodeController`:
- `GET    /api/patients/{patientId}/emergency/codes` Status beider Codes (ohne Klartext)
- `POST   /api/patients/{patientId}/emergency/codes/{type}/regenerate` liefert einmalig Token + PublicId + PIN
- `POST   /api/patients/{patientId}/emergency/codes/{type}/deactivate`
- `POST   /api/patients/{patientId}/emergency/one-time-link`
- `GET/PUT /api/patients/{patientId}/emergency/settings`
- `GET    /api/patients/{patientId}/emergency/logs`
- `POST   /api/patients/{patientId}/emergency/revoke-all`
- `POST   /api/patients/{patientId}/emergency/approvals/{sessionId}` Freigabe bestätigen oder ablehnen
- `GET    /api/patients/{patientId}/emergency/snapshot` Daten für den Sperrbildschirm

Portal (anonym, `[AllowAnonymous]`, eigene CORS Policy, Rate Limiter), Controller `EmergencyPortalController`:
- `POST /api/emergency/session/token` Body `{ token, consent, accessorName?, accessorInstitution? }`
- `POST /api/emergency/session/pin` Body `{ publicId, pin, consent, ... }`
- `GET  /api/emergency/session/status` für Freigabe Polling
- `GET  /api/emergency/data` Header `X-Emergency-Session`
- Nur GET für Daten. Header `Cache-Control: no-store`, `X-Robots-Tag: noindex` per Middleware auf `/api/emergency/*`.

Session Transport (Vorschlag): opaques Session Token im Header, im Portal in `sessionStorage`. Kein Cookie, damit Subdomain und CORS einfach bleiben. Token im QR wird nach dem Tausch per `history.replaceState` aus der URL entfernt.

Rate Limiting: `Microsoft.AspNetCore.RateLimiting` (in .NET enthalten) pro IP, plus `FailedAttempts/LockedUntil` pro PublicId in der DB. Nach 5 Fehlversuchen Sperre mit Backoff.

Red Flags (regelbasiert, kein KI): Interaktionen vorhanden, Symptom Intensität ab 8 in den letzten 72 h, ATC Gruppen wie `B01` Gerinnungshemmer, `A10A` Insulin, `N03` Antiepileptika, `N02A` Opioide, `H02` Kortikoide, `C01` Herztherapie.

### Neue Dateien Backend (Plan)

```
Domain/Entities/EmergencyAccessCode.cs, EmergencyAccessSession.cs, EmergencyAccessLog.cs, EmergencyShareSetting.cs, PushDevice.cs
Domain/Enums/EmergencyCodeType.cs, EmergencyDataCategory.cs, ApprovalState.cs
Application/Repositories/IEmergencyAccessRepository.cs
Infrastructure/Repositories/MySqlEmergencyAccessRepository.cs
Application/Services/EmergencyAccessService/ (IEmergencyAccessService, EmergencyAccessService, Dto/)
Application/Services/EmergencyDataService/  (IEmergencyDataService, EmergencyDataService, RedFlagRules, Dto/)
Application/Services/PushService/            (IPushService, ExpoPushService)
Application/Common/Security/CodeHasher.cs
Api/Controller/EmergencyCodeController.cs, EmergencyPortalController.cs
Api/Middleware/NoStoreHeadersMiddleware.cs
AI/emergencySummary.js  (Route /ai/emergency-summary)
```

### Neues Portal `emergency-portal/` (Vite + React + TS)

```
src/main.tsx, App.tsx
src/api/emergencyApi.ts
src/pages/PinEntryPage.tsx, TokenEntryPage.tsx, ConsentPage.tsx, WaitingApprovalPage.tsx, DataPage.tsx, ExpiredPage.tsx
src/components/MedicationList.tsx, RedFlagBanner.tsx, InteractionList.tsx, SymptomList.tsx, AiSummaryBox.tsx, SessionTimer.tsx, LastUpdated.tsx
src/types/emergency.ts
```

### Erweiterungen Expo App

```
app/emergency.tsx                 Übersicht: QR, PIN, Codes verwalten
app/emergency-settings.tsx        Freigaben je Kategorie
app/emergency-log.tsx             Zugriffsprotokoll
src/api/emergencyService.ts
src/hooks/use-emergency-codes.ts, use-emergency-log.ts
src/types/emergency-type.ts
src/components/emergency/qr-card.tsx, code-status-card.tsx, log-card.tsx
```
Pakete: `react-native-qrcode-svg` + `react-native-svg`, `expo-notifications`, je nach Sperrbildschirm Variante `react-native-view-shot` + `expo-media-library`.

## 8. Sperrbildschirm Optionen

| Variante | Plattform | Offline | Expo Go | Aufwand |
|---|---|---|---|---|
| Sperrbildschirm Hintergrund mit QR + Kernmedikation, in der App erzeugt und gespeichert | iOS + Android | ja | ja | gering |
| Dauerhafte Benachrichtigung mit Kurzinfo | nur Android zuverlässig | ja | nein (Dev Build) | mittel |
| Natives Lock Screen Widget | iOS 16+, Android | ja | nein (Dev Build + Config Plugin) | hoch |
| Anleitung iOS Notfallpass / Android Notfallinformationen ausfüllen | beide, systemeigen | ja | ja | sehr gering, aber manuell |

Nur der Notfallcode darf auf den Sperrbildschirm, nie der Behandlungscode.

## 9. Umsetzungsreihenfolge (Stückchen)

1. Entities, Enums, DbContext, Migration
2. `CodeHasher` + Repository
3. `EmergencyAccessService`: generieren, deaktivieren, prüfen, Session anlegen
4. `EmergencyCodeController` (Patient Seite) + Test in Scalar
5. `EmergencyDataService`: Kerndaten, Red Flags, Interaktionen, Kategorie Filter
6. `EmergencyPortalController` + Rate Limiting + Header Middleware
7. KI Route `/ai/emergency-summary` + Aufruf im Backend
8. Portal Projekt anlegen, PIN Seite, Token Seite, Consent
9. Portal Datenseite mobile first
10. Expo App: Notfallseite mit QR und PIN
11. Freigaben, Protokoll, Alle Zugriffe beenden
12. Push (`expo-notifications`) + Freigabe in der App
13. Einmal Behandlungslink
14. Sperrbildschirm Variante
15. Akzeptanzkriterien durchtesten

## 10. Entscheidungen (09.10.2026)

1. Sperrbildschirm: Hybrid. Das Sperrbild zeigt dezent nur QR Notfallcode und Notfall ID. Medikation, Diagnosen und Warnungen stehen im systemeigenen Notfallpass (iOS Health "Notfallpass", Android "Notfallinformationen") und sind erst nach Tipp auf "Notfall" sichtbar.
2. Seitentaste doppelt drücken ist für Apps nicht abgreifbar (iOS und Android). Deshalb Notfallpass statt eigener Auslösung.
3. ADAM erzeugt den Notfallpass Text (Medikamente, Erkrankungen, Hinweise) zum Kopieren, mit Anleitung pro Plattform. Ein automatisches Schreiben ist nicht möglich.
4. Sperrbild Erzeugung in der App: `react-native-view-shot` + `expo-media-library`, Hinweis bei Datenänderung "Sperrbild neu erzeugen". Läuft in Expo Go.
5. Chronische Diagnosen (`ConditionStatus.Chronical` und `Active`) gehören zu den Kerndaten beider Codes, abschaltbar über die Freigaben.
6. Testumgebung: Expo Go. Folge: Remote Push ist eingeschränkt. Plan: Zugriffe und Freigabe Anfragen per Polling, solange die App offen ist, plus lokale Benachrichtigung (`expo-notifications` lokal geht in Expo Go). Echter Push als späterer optionaler Schritt mit Dev Build.
7. Freigabe in der App funktioniert damit nur bei geöffneter App. Für den Behandlungsfall ist das vertretbar, weil der Patient anwesend ist.
8. Arbeitsbranch: `feature/emergency-pages`. Lokaler Klon bei Arun: `E:\DEV\Projekte\adam`, im VS Code Workspace neben `maier-lernprojekt`.

### Entscheidungen nach der Prüfung (15.10.2026)

9. Geprüft und geändert wird nur die Erweiterung (Diff gegen 17467cb). Bestehender Code außerhalb bleibt unangetastet (JWT Secret, IsArzt in alten Controllern, AIService Key, base-inline-picker).
10. Anrede in App und Portal: Sie, wie im Rest der App.
11. Freigabe in der App ist standardmäßig aus (wie Angabe: optional). Der Einmal-Link braucht nie eine Bestätigung, weil der Patient ihn selbst für einen Termin erstellt.
12. QR Adresse: `notfall.<domain>/a#<token>`. Das Token steht hinter `#` und erreicht dadurch nie den Webserver und dessen Logs. Die App baut die Adresse aus `PortalBaseUrl` der Übersicht und dem gespeicherten Token.
13. Captcha nach Fehlversuchen: offen, dokumentiert (Angabe nennt es als Beispiel). Schutz besteht aus Sperre pro ID mit Backoff, Rate Limit pro IP (IPv6 pro /64) und gleicher Antwort für unbekannte und gesperrte IDs.
14. Benachrichtigungen: nur bei geöffneter App (Polling, Alerts). Keine lokalen Notifications, weil ohne Hintergrundabfrage in Expo Go kein Mehrwert. Texte sagen das ehrlich. Echter Push erst mit Dev Build.
15. Arztbriefe im Portal kommen aus den Diagnosen (Beschreibung, Befunde, Therapie, Medikamente, KI-Erklärung), weil ADAM gescannte Briefe dort ablegt. Die Tabelle MedicalLetters enthält nur Betreff und Empfänger.
16. Chronische Erkrankungen kommen aus Diagnosen und Vorerkrankungen (MedicalHistoryEntries), doppelte per ICD Code zusammengefasst.
17. Wechselwirkungen werden nur gezeigt, wenn auch Medikamente freigegeben sind (sie nennen die Medikamentennamen).

## 11. Optisches Modell

Design Canvas "ADAM Nothelfer Mockup": https://claude.ai/artifact/BGgU8C929tZ6TjmzNChSGK
Screens: App Notfallzugang, Freigaben, Zugriffsprotokoll, Freigabe Anfrage, Sperrbild, Notfallpass ausfüllen, Portal Start, Bestätigung, Warten auf Freigabe, Notfalldaten, Behandlungsdaten.
Farben im Modell: App Grün `#047857` (Buttons, statt `#059669` wegen Kontrast), Notfall Rot `#B91C1C` auf `#FEE2E2`, Behandlung Blau `#1E40AF` auf `#DBEAFE`, Hinweis Amber `#78350F` auf `#FEF3C7`, Text `#0B3B2E`, Grund `#F6F8F7`.
Nächster Schritt: Umsetzung Stückchen 1 (Entities, Enums, Migration).

## 12. Umsetzungsstand (09.10.2026, 14:30)

Komplett umgesetzt und lokal bei Arun auf `feature/emergency-pages` (nicht committet, Review steht aus).

- Backend: 5 Entities, 5 Enums, `CodeHasher` (SHA-256 Token, BCrypt PIN), `IEmergencyAccessRepository`, `EmergencyAccessService`, `EmergencyDataService` mit `EmergencyRedFlagRules` und `EmergencySharePolicy`, `EmergencyCodeController` (Patient, JWT, ohne IsArzt), `EmergencyPortalController` (anonym, CORS `EmergencyPortal`, Rate Limits), `EmergencyHeadersMiddleware`, Optionen unter `Emergency` in appsettings. Neues Paket `BCrypt.Net-Next` 4.0.3 (MIT). `Medication.UpdatedAt` ergänzt.
- KI: `AI/emergencySummary.js`, Route `/ai/emergency-summary`.
- Portal: `emergency-portal/` (Vite 7, React 19, TS). Build und Typecheck grün.
- App: Screens `emergency`, `emergency-settings`, `emergency-log`, `emergency-lockscreen`, `emergency-pass`, Polling `use-emergency-watch` im Tab Layout. Neue Pakete: expo-clipboard, expo-media-library, react-native-svg, react-native-view-shot, react-native-qrcode-svg (alle SDK 54 kompatibel, MIT). Typecheck und Lint grün.
- CI: Job `build-emergency-portal`, Lizenzcheck Matrix um `emergency-portal` erweitert. Datei musste Arun selbst kopieren (`.github` geschützt).
- README: Abschnitt 5 Notfallportal.

Offen: `dotnet build` und Migration `AddEmergencyAccess` bei Arun, Captcha nach Fehlversuchen, echter Push (braucht Dev Build), Datenschutzfolgenabschätzung und Pentest vor Livegang.

## 13. Prüfung und Korrekturen (13. bis 15.10.2026)

Fünf unabhängige Prüfer (Sicherheit, Backend/EF, Portal mit Browser Tests, App, Abgleich Angabe). Befunde: `nothelfer/PRUEFBEFUNDE.md`. Alle bestätigten Befunde im Scope sind korrigiert, unter anderem:

- PIN Prüfung pro Notfall-ID serialisiert (`EmergencyLocks`), Dummy BCrypt für unbekannte IDs, eine Antwort für falsch, unbekannt und gesperrt.
- Repository schreibt nur geänderte Spalten (kein `Update()` mehr), Einmal-Link nur einmal einlösbar, Regenerieren deaktiviert alle aktiven Codes des Typs.
- Freigaben werden validiert und in place gespeichert, Logs getrennt nach Zugriffen und Fehlversuchen, unbeantwortete Anfragen als "Expired".
- `ForwardedHeaders` mit `Emergency:TrustedProxies`, Rate Limit IPv6 pro /64, Optionen beim Start validiert, CORS Preflight gecacht.
- Datenservice nur mit geteilten Daten, `interactionsUnavailable`, ungeprüfte Medikamente, Restsekunden vom Server, Übersetzungen parallel mit Zeitlimit.
- Portal: Token aus `#`, Umbruch bei 360 px, Sitzung alle 30 s geprüft, Countdown ohne Geräteuhr, Fehler mit Wiederholen, h1 und Fokus, PIN Feld ohne Passwortspeicher, Systemschrift.
- App: Speicher pro Patient, Abgleich mit Server in Sperrbild und Notfallpass, Notfallpass ohne irreführendes "Keine", Warteschlange für Freigaben, iOS Sperrbild in normaler Auflösung, Dark Mode Kontrast, Sie Form, Deep Link Zurück.
- CI: Lizenz Mapping für BCrypt.Net-Next (`.github/licenseurl-mappings.json`).
- Nachprüfung durch einen weiteren Prüfer: acht kleinere Punkte behoben (KI unterscheidet "nicht freigegeben" von "leer", ungeprüfte Medikamente, veraltete Antworten löschen keine neuen Codes, Meldungen in Warteschlange, Abkürzungen in der Satzbegrenzung, Sie Form im Backend, Dummy BCrypt außerhalb der Sperre). Details in `nothelfer/PRUEFBEFUNDE.md`.

Weiterhin offen:
1. Migration `AddEmergencyAccess` bei Arun erzeugen und mitcommitten, danach `dotnet build`.
2. Captcha nach Fehlversuchen und echter Push (beides bewusst nur dokumentiert).
3. Aufbewahrungsfrist für IPs im Zugriffsprotokoll festlegen.
4. `EmergencyLocks` gilt nur innerhalb eines Prozesses. Bei mehreren Backend Instanzen braucht die PIN Sperre eine Datenbanksperre.
5. Kleine Zeitunterschiede zwischen unbekannter und echter Notfall-ID (zusätzliche Datenbankzugriffe). Abhilfe wäre eine feste Mindestantwortzeit.
6. Datenschutzfolgenabschätzung und Pentest vor Livegang.
