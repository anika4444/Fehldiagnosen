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
