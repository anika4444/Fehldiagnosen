# Architectural Decision Records (ADRs)

> Format nach dem Template von **Michael Nygard** (siehe LV-Folien „01_Einführung", S. 12–14).
> Jede Entscheidung wird mit **Titel · Status · Kontext (inkl. betrachteter Optionen) · Entscheidung · Konsequenzen (einfacher / schwerer)** festgehalten.
> Zweck: getroffene Architektur­entscheidungen nachvollziehbar halten.
>
> Mögliche Status: `proposed` · `accepted` · `rejected` · `deprecated` · `superseded`.

---

## ADR 01: Frontend-Framework Ärzteansicht – React

**Status:** accepted

### Kontext

Die Ärzteansicht ist das zentrale Arbeitswerkzeug für das medizinische Personal. Sie muss große Mengen an komplexen Daten übersichtlich darstellen und schnelle Interaktionen ermöglichen. Da Ärzte oft unter Zeitdruck arbeiten, ist eine hochperformante, fehlerfreie und intuitiv bedienbare Weboberfläche essenziell. Zudem muss die Anwendung leicht erweiterbar sein, um künftige diagnostische Tools nahtlos integrieren zu können.

**Betrachtete Optionen:** React · Vue.js

### Entscheidung

Wir setzen **React** als primäres Frontend-Framework für die Ärzteansicht ein. Ausschlaggebend waren vorhandene Entwicklungskenntnisse im Team, das große Ökosystem, die hohe Wiederverwendbarkeit von Komponenten, die Zukunftssicherheit sowie das performante Rendering über das Virtual DOM.

### Konsequenzen

**Einfacher (+)**
- Schnellere Feature-Entwicklung durch vorhandene Expertise im Team.

**Schwerer (−)**
- Hohe Entscheidungsdichte notwendig (React gibt wenig vor).
- Regelmäßige Updates des Ökosystems erforderlich.

---

## ADR 02: Frontend-Framework Patientenansicht – React Native + Expo

**Status:** accepted

### Kontext

Für Patient:innen soll eine mobile Lösung geschaffen werden, die über die Möglichkeiten einer reinen Weboberfläche hinausgeht. Die Anwendung muss als native App auf Smartphones (iOS & Android) funktionieren, um schnellen Zugriff auf Gesundheitsdaten zu gewährleisten. Wichtige Anforderungen sind eine flüssige Bedienung, Push-Benachrichtigungen für medizinische Reminder und ein einfacher Zugang über die App-Stores.

**Betrachtete Optionen:** React Native + Expo · React (Web) · React Native ohne Expo

### Entscheidung

Wir setzen **React Native in Kombination mit dem Expo SDK** für die mobile Patienten-App ein. Gründe: native User Experience, Code-Synergie mit der React-Welt (ADR 01), das umfangreiche Expo-Ökosystem und Hot Reloading für schnelle Iterationen.

### Konsequenzen

**Einfacher (+)**
- Cross-Platform (iOS & Android aus einer Codebasis).
- Push-Benachrichtigungen und Hardware-Zugriff out of the box.

**Schwerer (−)**
- Abhängigkeit von Expo.
- Größere App im Vergleich zu rein nativen Lösungen.
- Zusätzliche Abstraktionsschicht zwischen Code und Plattform.

---

## ADR 03: Patientenansicht als App (statt Website)

**Status:** accepted

### Kontext

Für unser System wird ein Frontend benötigt, über das Patient:innen auf ihre Daten zugreifen. Ein wesentlicher Teil der Zielgruppe besteht aus älteren oder weniger technikaffinen Menschen. Die Herausforderung: Das Frontend-Medium (App vs. klassische Website) so wählen, dass die Einstiegsbarriere für diese Nutzergruppe möglichst gering ist und die Bedienung im Alltag intuitiv und fehlerfrei gelingt.

**Betrachtete Optionen:** Mobile App · Website

### Entscheidung

Wir setzen die Patientenansicht als **mobile App** um, die auf dem Smartphone installiert wird. Smartphones sind in allen Altersgruppen verbreitet und haben den Desktop-PC als primäres Zugangsmedium abgelöst. Eine installierte App bietet ein geschlossenes, ablenkungsfreies Erlebnis: ein Tippen aufs Icon genügt – kein Umgang mit URLs, Lesezeichen oder versehentlich geschlossenen Tabs.

### Konsequenzen

**Einfacher (+)**
- Hohe Zugänglichkeit: Start über ein festes Icon ist für ältere Menschen einfacher als Browser-Navigation.
- Hohe Verfügbarkeit: Smartphone ist im Alltag schneller griffbereit als ein PC.
- Vereinfachter Login: nativer Support für biometrische Logins (Fingerabdruck, Face ID) möglich.
- Push-Benachrichtigungen: zuverlässige Zustellung von Erinnerungen.

**Schwerer (−)**
- Initiale Installationshürde (einmaliger Download aus dem App Store nötig).
- Höherer Entwicklungs- und Wartungsaufwand als bei einer reinen Website.
- Abhängigkeit von App-Store-Review-Prozessen → Bugfixes können sich verzögern.

---

## ADR 04: Backend-Framework – ASP.NET Core Web API

**Status:** accepted

### Kontext

Für die App benötigen wir ein robustes, sicheres und performantes Backend, das als API fungiert, Geschäftslogik zentral verwaltet, Datenbankzugriffe orchestriert und eine sichere Übertragung sensibler Gesundheitsdaten gewährleistet.

**Betrachtete Optionen:** ASP.NET Core Web API · Node.js · Java mit Spring Boot · PHP · Python

### Entscheidung

Wir verwenden **ASP.NET Core Web API** (modernes .NET-Ökosystem) als zentrales Backend-Framework. Gründe:
- **Sicherheit & Compliance:** enterprise-erprobte Mechanismen (Auth/Autorisierung via JWT/OAuth) – wichtig für gesetzeskonforme Verarbeitung von Gesundheitsdaten.
- **Performance:** zählt zu den schnellsten Web-Frameworks, verarbeitet Requests asynchron und ressourcenschonend.
- **Typsicherheit & C#:** reduziert Laufzeitfehler, erleichtert Refactoring und Pflege.
- **Ausgereiftes Ökosystem:** Entity Framework Core (ORM) + große, gepflegte NuGet-Auswahl.
- **Plattformunabhängigkeit:** läuft cross-platform und eignet sich für containerisierte Deployments.

### Konsequenzen

**Einfacher (+)**
- Hohe Zuverlässigkeit durch strenge Typisierung und Compiler-Unterstützung.
- Hervorragendes Tooling (Visual Studio, Rider, Debugging/Profiling).
- Zukunftssicherheit durch Microsoft- und Community-Support.
- Effiziente Datenbankanbindung über EF Core.

**Schwerer (−)**
- Mehr Boilerplate/Setup bei klassischen Controllern (durch Minimal APIs abgemildert).
- Etwas höherer Speicher-Footprint im Leerlauf als extrem leichtgewichtige Runtimes (z. B. Go).
- Kleineres natives KI-/Data-Science-Ökosystem als Python → eigene ML-Entwicklung wäre aufwendiger. *(Konsequenz hieraus: der KI-Teil wurde in einen separaten Node.js-Service ausgelagert.)*

---

## ADR 05: Datenbank – MySQL

**Status:** accepted

### Kontext

Wir benötigen eine persistente, sichere und hochverfügbare Datenspeicherung. Da wir mit sensiblen Gesundheitsdaten und Benutzerprofilen arbeiten, stehen Datenintegrität, Transaktionssicherheit und strikte Datenstrukturen im Vordergrund. Das System muss sich nahtlos in das .NET-Core-Backend (ADR 04) integrieren.

**Betrachtete Optionen:** MySQL · PostgreSQL · MSSQL

### Entscheidung

Wir verwenden **MySQL** als primäres relationales DBMS. Gründe:
- **ACID-Konformität & Datenintegrität** – zwingend für Gesundheitsdaten, um inkonsistente Datensätze auszuschließen.
- **Erprobte Zuverlässigkeit** – eine der weltweit meistgenutzten Datenbanken, extrem stabil.
- **Hervorragende .NET-Integration** über Entity Framework Core.
- **Kosten & Hosting** – Open Source, von allen großen Cloud-Anbietern als Managed Service verfügbar.

### Konsequenzen

**Einfacher (+)**
- Hohe Sicherheit: ausgereifte Rollen-/Rechteverwaltung, Verschlüsselung → unterstützt DSGVO-/HIPAA-Konformität.
- Großes Ökosystem und einfache Verfügbarkeit von Know-how.
- Gute Lese-Performance für typische Web-Workloads (InnoDB).
- Ausgereiftes Tooling für Backups, Monitoring, Migrationen.

**Schwerer (−)**
- Horizontale Skalierung von Schreiboperationen (Sharding/Clustering) komplexer als bei NoSQL.
- Starres Schema: Migrationen bei großen Datenmengen erfordern sorgfältige Planung.
- JSON/XML-Handling weniger flexibel/performant als z. B. PostgreSQL.

---

## ADR 06: Eigenständiger KI-Service in Node.js (statt im .NET-Backend)

**Status:** accepted

### Kontext

ADAM braucht KI-Funktionen (Diagnose-Erklärung, Checkup-Zusammenfassung, Arztbrief-Interpretation). Diese benötigen Orchestrierung von LLM-Aufrufen, Prompt-Verwaltung und eine RAG-Pipeline. Das LLM-/Agent-Ökosystem (insb. **LangChain**) ist in JavaScript/Python deutlich reifer als in .NET – dieser Nachteil wurde bereits in ADR 04 festgehalten.

**Betrachtete Optionen:** separater Node.js-Service · KI-Logik direkt im .NET-Backend · Python-Service

### Entscheidung

Wir lagern die KI-Logik in einen **eigenständigen Node.js-/Express-Service** (LangChain, Port 3000) aus. Das .NET-Backend ruft ihn über HTTP auf (`/ai/explain`, `/ai/checkup-summary`, `/ai/interpret-medical-letter`). Das Backend bleibt für Persistenz, Auth und Geschäftslogik zuständig.

### Konsequenzen

**Einfacher (+)**
- Zugriff auf das ausgereifte LangChain-Ökosystem.
- KI-Service unabhängig entwickel-, test- und deploybar (lose Kopplung).
- KI-Modell/-Prompts änderbar, ohne das Backend neu zu bauen.

**Schwerer (−)**
- Zusätzlicher Dienst, der betrieben, überwacht und abgesichert werden muss.
- Netzwerk-Latenz und Fehlerbehandlung zwischen Backend und KI-Service.
- Zwei Sprachräume (C# / JS) im Projekt → höhere Einarbeitungsbreite.

---

## ADR 07: Provider-Unabhängigkeit der KI über Abstract Factory

**Status:** accepted

### Kontext

Der KI-Service nutzt externe LLM-Anbieter. Preise, Verfügbarkeit, Qualität und Datenschutz­bedingungen der Anbieter ändern sich schnell; ein fester Anbieter würde zu Vendor-Lock-in führen. Wir wollen den Anbieter wechseln können, ohne die Fachlogik anzufassen.

**Betrachtete Optionen:** Abstract-Factory-Abstraktion über Provider · direkte Anbindung an einen einzigen LLM-Provider

### Entscheidung

Wir kapseln Modelle und Prompts hinter einer **Abstract Factory** (`MistralProviderFactory`, `OpenAIProviderFactory` mit `createModel`/`createValidatorModel`/`createPrompt`). Ein Provider-Wechsel erfolgt durch Austausch **einer** Factory-Zeile; aktuell ist **Mistral** aktiv. Die Validator-Chain wird über einen `ChainBuilder` zusammengesetzt.

### Konsequenzen

**Einfacher (+)**
- Anbieterwechsel mit minimaler Codeänderung (kein Vendor-Lock-in).
- Klare Trennung zwischen „welcher Anbieter" und „welche Fachlogik".

**Schwerer (−)**
- Zusätzliche Abstraktionsschicht/Boilerplate (bewusst eingesetzt, nicht als Selbstzweck – sie adressiert die konkrete Anforderung „austauschbarer Anbieter").
- Anbieter-spezifische Features müssen auf den kleinsten gemeinsamen Nenner abstrahiert werden.

---

## ADR 08: Medizinisch geprüfte KI-Erklärungen via RAG-Light + Validator-Pipeline

**Status:** accepted

### Kontext

KI-Erklärungen zu Diagnosen müssen **fachlich korrekt** und zugleich **laienverständlich** sein. Reine LLM-Antworten bergen das Risiko von Halluzinationen oder zu fachsprachlichen/zu vagen Texten – im medizinischen Kontext nicht akzeptabel.

**Betrachtete Optionen:** RAG-Light mit kuratierter Wissensbasis + nachgelagertem Validator · reiner LLM-Prompt ohne Wissensbasis · vollständige Vektor-RAG-Datenbank

### Entscheidung

Wir kombinieren eine **kuratierte ICD-10-Wissensbasis** (`AI/knowledge/*.md`, via `getIcdContext`) als Kontext für den Prompt („RAG-Light") mit einer **Validator-Pipeline**, die die generierte Erklärung gegen die Eingabedaten prüft und bei Bedarf neu generiert (max. 3 Versuche, `MAX_VALIDATION_ATTEMPTS`). Das **Kommunikationslevel** (L1/L2/L3) des Patienten steuert die Verständlichkeitsstufe des Prompts.

### Konsequenzen

**Einfacher (+)**
- Höhere fachliche Zuverlässigkeit und reduziertes Halluzinationsrisiko.
- Erklärungen passen sich dem Vorwissen der Nutzer:innen an (Kern des „Fehldiagnosen"-Gedankens).
- Wissensbasis ist als Markdown leicht durch Fachpersonal pflegbar.

**Schwerer (−)**
- Mehrere LLM-Durchläufe → höhere Latenz und Kosten pro Erklärung.
- Wissensbasis muss gepflegt und aktuell gehalten werden.
- Keine vollwertige Vektor-Suche → Abdeckung auf die hinterlegten ICD-Einträge begrenzt.

---

## ADR 09: Anonymisierung sensibler Daten vor jedem externen LLM-Aufruf

**Status:** accepted

### Kontext

Wir verarbeiten sensible Gesundheitsdaten und senden Texte (z. B. Arztbriefe) an **externe** LLM-Anbieter. Personenbezogene Daten dürfen das System nicht im Klartext an Dritte verlassen (DSGVO).

**Betrachtete Optionen:** Anonymisierung über ein Python-NER-Skript vor dem Versand · Klartext-Versand an den LLM · komplett lokales/selbst-gehostetes Modell

### Entscheidung

Vor jedem externen LLM-Aufruf werden Texte über den **`AnonymizerService`** geleitet, der ein **Python-NER-Skript** (`src/anonymizer.py`) per Prozess/Stdin aufruft und personenbezogene Entitäten entfernt/ersetzt.

### Konsequenzen

**Einfacher (+)**
- Sensible Daten verlassen das System nicht im Klartext → DSGVO-freundlicher.
- Externe LLM-Anbieter bleiben nutzbar, ohne Klartext-Patientendaten preiszugeben.

**Schwerer (−)**
- Laufzeit-Abhängigkeit von Python auf dem Host (muss im PATH sein).
- NER ist nicht perfekt → Restrisiko nicht erkannter Entitäten.
- Zusätzlicher Verarbeitungsschritt (Latenz, Fehlerquelle Prozessaufruf).

---

## ADR 10: Erfassung per OCR (Tesseract) für Medikamente und Arztbriefe

**Status:** accepted

### Kontext

Patient:innen sollen Medikamente und Arztbriefe nicht abtippen müssen, sondern als **Foto/Dokument** hochladen können – das senkt die Einstiegshürde (vgl. ADR 03) und Übertragungsfehler.

**Betrachtete Optionen:** lokale OCR mit Tesseract · Cloud-OCR-Dienst · ausschließlich manuelle Eingabe

### Entscheidung

Wir nutzen **Tesseract-OCR** (Sprachpakete deu/eng/lat/ell in `TesseractData/`) zur Texterkennung aus hochgeladenen Bildern/Dokumenten. Endpunkte: `POST /api/medications/scan` und `POST /api/diagnoses/{patientId}/scan`. Der erkannte Text wird – nach Anonymisierung (ADR 09) – an die KI zur Strukturierung/Interpretation gegeben.

### Konsequenzen

**Einfacher (+)**
- Deutlich komfortablere Erfassung, weniger Tippfehler.
- Lokale OCR → keine zusätzlichen Cloud-Kosten und keine Bildübertragung an Dritte.

**Schwerer (−)**
- OCR-Qualität schwankt mit Bildqualität → Nachkontrolle nötig.
- Sprachmodelle vergrößern das Deployment (mehrere MB je Sprache).
- Tesseract muss in der Laufzeitumgebung verfügbar sein.

---

## ADR 11: Backend nach Clean Architecture mit Repository-Pattern

**Status:** accepted

### Kontext

Das Backend soll wartbar, testbar und gegenüber Infrastruktur (Datenbank) austauschbar sein. Geschäftslogik darf nicht von EF Core / MySQL abhängen.

**Betrachtete Optionen:** Clean Architecture (Api/Application/Domain/Infrastructure) + Repository-Pattern · klassische Schichtung mit direktem DbContext-Zugriff in Controllern

### Entscheidung

Wir strukturieren das Backend nach **Clean Architecture** in die Schichten `Api → Application → Domain ← Infrastructure`. Datenzugriff erfolgt über **Repository-Interfaces** (`Application/Repositories`), die in `Infrastructure` mit EF Core/MySQL implementiert und per **Dependency Injection** (`Program.cs`) verdrahtet werden.

### Konsequenzen

**Einfacher (+)**
- Domäne ist frei von Infrastruktur-Abhängigkeiten → gut testbar.
- Datenbank/ORM austauschbar, ohne die Fachlogik zu ändern.
- Klare Verantwortlichkeiten erleichtern Parallelarbeit im 5er-Team.

**Schwerer (−)**
- Mehr Schichten/Boilerplate (Interface + Implementierung + DTO + Mapper).
- Höhere Einstiegshürde für Einsteiger:innen.

---

## ADR 12: Authentifizierung über JWT + ASP.NET Identity

**Status:** accepted

### Kontext

Zugriff auf Gesundheitsdaten muss authentifiziert und einem Patienten zugeordnet sein. Die mobile App (ADR 02/03) benötigt ein zustandsloses, tokenbasiertes Verfahren.

**Betrachtete Optionen:** JWT + ASP.NET Identity · Server-seitige Sessions/Cookies · externer Identity-Provider (OAuth/OIDC)

### Entscheidung

Wir nutzen **ASP.NET Identity** für Benutzer-/Rollenverwaltung (`ApplicationUser : IdentityUser`) und **JWT Bearer Tokens** für die API-Authentifizierung. Das Token wird in der App in `SecureStore` (bzw. `localStorage` im Web) abgelegt; der Patient ist über `UserId` mit dem Identity-User verknüpft. *(Hinweis: Für den Prototyp ist die Passwort-Policy bewusst gelockert.)*

### Konsequenzen

**Einfacher (+)**
- Zustandslose, gut skalierbare Authentifizierung – passend für die mobile App.
- Bewährte, in .NET integrierte Sicherheitsmechanismen (vgl. ADR 04).

**Schwerer (−)**
- Token-Handling auf Client-Seite (Ablauf, sichere Speicherung) selbst zu lösen.
- Token-Invalidierung vor Ablauf ist aufwendiger als bei Server-Sessions.
- Gelockerte Passwort-Policy muss vor produktivem Einsatz verschärft werden.

---

## ADR 13: Echtzeit-Medikamenten-Reminder über SignalR

**Status:** accepted

### Kontext

Patient:innen sollen zuverlässig an die Medikamenteneinnahme erinnert werden. Dafür braucht es eine Server-getriebene Benachrichtigung in (nahezu) Echtzeit statt reinem Client-Polling.

**Betrachtete Optionen:** SignalR (WebSockets) · regelmäßiges HTTP-Polling durch den Client

### Entscheidung

Wir setzen **SignalR** ein (Hub unter `/hubs/medication`); die App bindet `@microsoft/signalr` ein und empfängt Reminder als Push über eine bestehende Verbindung.

### Konsequenzen

**Einfacher (+)**
- Echtzeit-Benachrichtigungen ohne ständiges Polling (weniger Last/Akkuverbrauch).
- Nahtlose Integration ins bestehende .NET-Backend.

**Schwerer (−)**
- Persistente Verbindungen müssen verwaltet werden (Reconnect, Skalierung).
- Zusätzliche Komplexität gegenüber rein zustandslosen REST-Aufrufen.
