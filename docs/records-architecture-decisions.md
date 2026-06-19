# Architectural Decision Records (ADRs)

> Format nach dem Template von **Michael Nygard** (siehe LV-Folien „01_Einführung", S. 12–14):
> **Titel · Status · Kontext (inkl. betrachteter Optionen) · Entscheidung · Konsequenzen**.
> Zweck: getroffene Architektur­entscheidungen nachvollziehbar halten.
> Mögliche Status: `proposed` · `accepted` · `rejected` · `deprecated` · `superseded`.

---

## ADR 01: Frontend Patientenansicht – React Native + Expo (mobile App)

**Status:** accepted

### Kontext
Patient:innen brauchen einen einfachen, alltagstauglichen Zugang zu ihren Gesundheitsdaten. Ein wesentlicher Teil der Zielgruppe ist älter bzw. weniger technikaffin; die Einstiegshürde soll minimal sein, und Push-Erinnerungen sollen möglich sein. **Betrachtete Optionen:** React Native + Expo · reine Website · React Native ohne Expo.

### Entscheidung
Die Patientenansicht wird als installierbare **mobile App** mit **React Native + Expo** umgesetzt. Eine App senkt die Einstiegshürde (ein Tippen aufs Icon statt URL/Tabs) und ermöglicht Push-Reminder und biometrischen Login; Expo liefert Cross-Platform, Hardware-Zugriff und Hot Reloading.

### Konsequenzen
**Einfacher:** eine Codebasis für iOS und Android, Push-Benachrichtigungen, schnelle Iteration.
**Schwerer:** Abhängigkeit von Expo, einmalige Installationshürde, App-Store-Prozesse bei Updates.

---

## ADR 02: Backend – ASP.NET Core (später zusätzlich Node.js für KI)

**Status:** accepted

### Kontext
Es wird ein sicheres, performantes API-Backend für sensible Gesundheitsdaten benötigt. Später kam die Anforderung hinzu, KI-Funktionen mit einem reifen LLM-Ökosystem (LangChain) umzusetzen. **Betrachtete Optionen:** ASP.NET Core · Node.js · Spring Boot · PHP · Python.

### Entscheidung
Zuerst wurde **ASP.NET Core Web API** als zentrales Backend gewählt (Sicherheit/Compliance, Performance, Typsicherheit, EF Core). **Später wurde zusätzlich ein eigenständiger Node.js-Service** für die KI ergänzt, weil das LangChain-/LLM-Ökosystem in JavaScript deutlich reifer ist; das .NET-Backend ruft ihn per HTTP auf.

### Konsequenzen
**Einfacher:** robustes, typsicheres Backend plus Zugriff auf das reife LLM-Ökosystem; KI unabhängig entwickel- und deploybar.
**Schwerer:** zwei Laufzeiten/Sprachräume (C# und JS), zusätzlicher Dienst und Netzwerk-Latenz zwischen Backend und KI-Service.

---

## ADR 03: Datenbank – MySQL

**Status:** accepted

### Kontext
Benötigt wird eine persistente, sichere Speicherung mit hoher Datenintegrität und nahtloser .NET-Integration. **Betrachtete Optionen:** MySQL · PostgreSQL · MSSQL.

### Entscheidung
Einsatz von **MySQL** – wegen ACID-Konformität, erprobter Zuverlässigkeit, guter EF-Core-Integration und geringer Kosten.

### Konsequenzen
**Einfacher:** hohe Datenintegrität, großes Ökosystem, gute Lese-Performance, ausgereiftes Tooling.
**Schwerer:** komplexere Skalierung von Schreiboperationen, starres Schema bei Migrationen.

---

## ADR 04: Authentifizierung – JWT + ASP.NET Identity

**Status:** accepted

### Kontext
Der Zugriff auf Gesundheitsdaten muss authentifiziert und einem Patienten zugeordnet sein; die mobile App benötigt ein zustandsloses Verfahren. **Betrachtete Optionen:** JWT mit ASP.NET Identity · Server-Sessions · externer Identity-Provider.

### Entscheidung
**ASP.NET Identity** für Benutzer-/Rollenverwaltung plus **JWT-Bearer-Tokens**; das Token wird sicher auf dem Gerät gespeichert, der Patient ist über die `UserId` verknüpft.

### Konsequenzen
**Einfacher:** zustandslose, gut skalierbare Authentifizierung, bewährte Mechanismen.
**Schwerer:** Token-Handling auf der Client-Seite; die für den Prototyp gelockerte Passwort-Policy ist vor dem Produktiveinsatz zu verschärfen.

---

## ADR 05: Backend-Struktur – Clean Architecture mit Repository-Pattern

**Status:** accepted

### Kontext
Das Backend soll wartbar, testbar und unabhängig von der konkreten Datenbank sein. **Betrachtete Optionen:** Clean Architecture mit Repository-Pattern · direkter DbContext-Zugriff in Controllern.

### Entscheidung
Gliederung in die Schichten **Api → Application → Domain ← Infrastructure**; der Datenzugriff erfolgt über **Repository-Interfaces** mit **Dependency Injection**.

### Konsequenzen
**Einfacher:** testbare, infrastrukturfreie Domäne, austauschbare Datenbank, klare Verantwortlichkeiten im Team.
**Schwerer:** mehr Schichten und Boilerplate, höhere Einstiegshürde.

---

## ADR 06: KI-Erklärungen – RAG-Light mit Validator-Pipeline

**Status:** accepted

### Kontext
KI-Erklärungen zu Diagnosen müssen fachlich korrekt und zugleich laienverständlich sein; reine LLM-Antworten bergen Halluzinationsrisiken. **Betrachtete Optionen:** RAG-Light mit Validator · reiner Prompt · vollständige Vektor-RAG.

### Entscheidung
Eine kuratierte **ICD-10-Wissensbasis** dient als Prompt-Kontext („RAG-Light"), gefolgt von einer **Validator-Pipeline** (max. drei Versuche). Das **Kommunikationslevel** (L1/L2/L3) steuert die Verständlichkeitsstufe.

### Konsequenzen
**Einfacher:** höhere fachliche Zuverlässigkeit, weniger Halluzination, an das Vorwissen angepasste Texte.
**Schwerer:** höhere Latenz und Kosten durch mehrere Durchläufe, Pflegeaufwand der Wissensbasis.

---

## ADR 07: Anonymisierung sensibler Daten vor LLM-Aufrufen

**Status:** accepted

### Kontext
Sensible Gesundheitsdaten dürfen nicht im Klartext an externe LLM-Anbieter gelangen (DSGVO). **Betrachtete Optionen:** Anonymisierung per Python-NER (Presidio/spaCy) · Klartext-Versand · vollständig lokales Modell.

### Entscheidung
Vor jedem externen LLM-Aufruf entfernt ein **Python-NER-Schritt** (Presidio + spaCy + Regeln) personenbezogene Entitäten aus dem Text.

### Konsequenzen
**Einfacher:** keine Klartext-Patientendaten an Dritte, externe LLM weiterhin nutzbar.
**Schwerer:** zusätzliche Python-Abhängigkeit, NER nicht perfekt (Restrisiko nicht erkannter Entitäten).

---

## ADR 08: Echtzeit-Medikamenten-Reminder über SignalR

**Status:** accepted

### Kontext
Erinnerungen an die Medikamenteneinnahme sollen serverseitig und nahezu in Echtzeit zugestellt werden. **Betrachtete Optionen:** SignalR (WebSockets) · regelmäßiges HTTP-Polling.

### Entscheidung
Einsatz von **SignalR** (Hub unter `/hubs/medication`); die App empfängt Reminder als Push über eine bestehende Verbindung.

### Konsequenzen
**Einfacher:** Echtzeit-Benachrichtigungen ohne Polling (weniger Last/Akkuverbrauch), nahtlose .NET-Integration.
**Schwerer:** Verwaltung persistenter Verbindungen, etwas höhere Komplexität als zustandslose REST-Aufrufe.
