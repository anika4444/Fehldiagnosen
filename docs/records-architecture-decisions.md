# Architectural Decision Records (ADRs)

> Format nach dem Template von **Michael Nygard** (siehe LV-Folien „01_Einführung", S. 12–14):
> **Titel · Status · Kontext (inkl. betrachteter Optionen) · Entscheidung · Konsequenzen**.
> Alle Records haben den Status `accepted`.

---

## ADR 01: Frontend Patientenansicht – React Native + Expo (mobile App)

**Status:** accepted

### Kontext
Patient:innen brauchen einen einfachen, alltagstauglichen Zugang. Ein Teil der Zielgruppe ist älter bzw. weniger technikaffin, und Push-Erinnerungen sollen möglich sein. Betrachtete Optionen: React Native + Expo, reine Website, React Native ohne Expo.

### Entscheidung
Die Patientenansicht wird als installierbare mobile App mit React Native + Expo umgesetzt. Eine App senkt die Einstiegshürde und ermöglicht Push-Reminder und biometrischen Login. Expo bietet Cross-Platform, Hardware-Zugriff und Hot Reloading.

### Konsequenzen
Einfacher: eine Codebasis für iOS und Android, Push-Benachrichtigungen, schnelle Iteration. Schwerer: Abhängigkeit von Expo, einmalige Installationshürde, App-Store-Prozesse bei Updates.

---

## ADR 02: Backend – ASP.NET Core (später zusätzlich Node.js für KI)

**Status:** accepted

### Kontext
Benötigt wird ein sicheres, performantes API-Backend für sensible Gesundheitsdaten. Später kam der Bedarf hinzu, KI-Funktionen mit einem LLM-Ökosystem (LangChain) umzusetzen. Betrachtete Optionen: ASP.NET Core, Node.js, Spring Boot, PHP, Python.

### Entscheidung
Zuerst wurde ASP.NET Core Web API als zentrales Backend gewählt (Sicherheit, Performance, Typsicherheit, EF Core). Später wurde zusätzlich ein eigenständiger Node.js-Service für die KI ergänzt, da das LangChain-/LLM-Ökosystem in JavaScript deutlich reifer ist. Das .NET-Backend ruft ihn per HTTP auf.

### Konsequenzen
Einfacher: robustes, typsicheres Backend plus Zugriff auf das reife LLM-Ökosystem, die KI ist unabhängig entwickel- und deploybar. Schwerer: zwei Laufzeiten und Sprachräume (C# und JavaScript), ein zusätzlicher Dienst und Netzwerk-Latenz.

---

## ADR 03: Datenbank – MySQL

**Status:** accepted

### Kontext
Benötigt wird eine persistente, sichere Speicherung mit hoher Datenintegrität und nahtloser .NET-Integration. Betrachtete Optionen: MySQL, PostgreSQL, MSSQL.

### Entscheidung
Einsatz von MySQL wegen ACID-Konformität, erprobter Zuverlässigkeit, guter EF-Core-Integration und geringer Kosten.

### Konsequenzen
Einfacher: hohe Datenintegrität, großes Ökosystem, gute Lese-Performance. Schwerer: komplexere Skalierung von Schreiboperationen, starres Schema bei Migrationen.

---

## ADR 04: Authentifizierung – JWT + ASP.NET Identity

**Status:** accepted

### Kontext
Der Zugriff auf Gesundheitsdaten muss authentifiziert und einem Patienten zugeordnet sein. Die mobile App benötigt ein zustandsloses Verfahren. Betrachtete Optionen: JWT mit ASP.NET Identity, Server-Sessions, externer Identity-Provider.

### Entscheidung
ASP.NET Identity für Benutzer- und Rollenverwaltung plus JWT-Bearer-Tokens. Das Token wird sicher auf dem Gerät gespeichert, der Patient ist über die UserId verknüpft.

### Konsequenzen
Einfacher: zustandslose, gut skalierbare Authentifizierung, bewährte Mechanismen. Schwerer: Token-Handling auf der Client-Seite. Die für den Prototyp gelockerte Passwort-Policy ist vor dem Produktiveinsatz zu verschärfen.

---

## ADR 05: KI-gestützte, patientengerechte Erklärung von Diagnosen

**Status:** accepted

### Kontext
Erklärungen zu Diagnosen müssen fachlich korrekt und zugleich für Laien verständlich sein. Eine direkte Antwort eines Sprachmodells ist dafür zu riskant (Halluzinieren etc.). Als Optionen kamen ein reiner Prompt, eine kuratierte Wissensbasis mit nachgelagerter Validierung sowie eine vollständige Vektor-RAG-Lösung infrage.

### Entscheidung
Ein eigenständiger KI-Dienst auf Basis von Node.js und LangChain erzeugt die Erklärung. LangChain wurde gewählt, weil es eine einheitliche Schnittstelle zu Sprachmodellen bietet und die Verarbeitung als zusammensetzbare Kette aus Prompt, Modell und Ergebnisaufbereitung abbildet, wodurch sich Modelle und Anbieter austauschen lassen, ohne die Fachlogik zu ändern. Die Modelle werden über eine OpenAI-kompatible Schnittstelle angesprochen. Als Hauptmodell dient Mistral Large 3, als Prüfmodell das kleinere und schnellere Mistral Nemo 12B. Sofern zum ICD-10-Code ein Eintrag in einer kuratierten Wissensbasis vorliegt, wird dieser als Kontext genutzt, und das Modell wird angewiesen, sich nur auf diesen Kontext und die übergebenen Daten zu stützen. Anschließend bewertet das Prüfmodell die Erklärung anhand fester Regeln und lässt sie bei einem Verstoß bis zu dreimal neu erzeugen. Das Sprachniveau richtet sich nach dem Kommunikationslevel in drei Stufen. Stufe L1 verwendet einfache Alltagssprache ohne Fachbegriffe, Stufe L2 nutzt einfache, im Satz erklärte Fachbegriffe, und Stufe L3 verwendet die medizinische Fachsprache für Fachpersonal. Die KI stellt dabei keine eigene Diagnose und trifft keine Behandlungsentscheidung, sondern erklärt eine bereits vorhandene Diagnose.

### Konsequenzen
Die Erklärungen sind dadurch fachlich abgesichert und auf das Vorwissen der Patienten zugeschnitten. Der KI-Dienst lässt sich unabhängig vom Backend weiterentwickeln. Nachteilig sind die höhere Antwortzeit und die höheren Kosten durch die mehrfache Erzeugung und Prüfung sowie der Pflegeaufwand der Wissensbasis. Außerdem ist die Abdeckung derzeit auf die hinterlegten Krankheitsbilder begrenzt, sodass für nicht hinterlegte Diagnosen kein Kontext zur Verfügung steht.

---

## ADR 06: Anonymisierung sensibler Daten vor LLM-Aufrufen

**Status:** accepted

### Kontext
Sensible Gesundheitsdaten dürfen nicht im Klartext an externe LLM-Anbieter gelangen (DSGVO). Betrachtete Optionen: Anonymisierung per Python-NER (Presidio/spaCy), Klartext-Versand, vollständig lokales Modell.

### Entscheidung
Vor jedem externen LLM-Aufruf entfernt ein Python-NER-Schritt (Presidio + spaCy + Regeln) personenbezogene Entitäten aus dem Text. Technisch ruft das .NET-Backend dazu ein eigenständiges Python-Skript als separaten Prozess auf, da Python mit Presidio und spaCy ausgereifte NER-Werkzeuge bietet, die in .NET fehlen.

### Konsequenzen
Einfacher: keine Klartext-Patientendaten an Dritte, externe LLM weiterhin nutzbar. Schwerer: zusätzliche Python-Abhängigkeit, NER nicht perfekt (Restrisiko nicht erkannter Entitäten).

---

## ADR 07: Automatisierte Zusammenfassung der Patientendaten (Digitaler Checkup)

**Status:** accepted

### Kontext
Gesundheitsdaten verteilen sich auf Diagnosen, Medikamente und Symptome, deren Zusammenhänge für Laien schwer zu erkennen sind. Der Checkup soll daraus eine verständliche Übersicht erstellen, die zum Beispiel auf ein Arztgespräch vorbereitet.

### Entscheidung
Das Backend sammelt die Diagnosen, Medikamente und Symptome für einen gewählten Zeitraum, und der KI-Dienst übernimmt nur die sprachliche Aufbereitung. Daraus entsteht eine verständliche Zusammenfassung mit einem Überblick über die Diagnosen, einer Medikamentenübersicht, möglichen Zusammenhängen und Hinweisen für das nächste Arztgespräch. Das Sprachniveau richtet sich nach dem Kommunikationslevel, und jede Zusammenfassung weist darauf hin, dass sie eine ärztliche Beurteilung nicht ersetzt. Bewusst werden weder eine Wissensbasis noch eine Validierung der erzeugten Zusammenfassung eingesetzt, da nur vorhandene Daten zusammengefasst und keine Krankheitsbilder erklärt werden.

### Konsequenzen
Die Patientinnen und Patienten erhalten ein verständliches Gesamtbild und können sich besser auf einen Termin vorbereiten. Da die erzeugte Zusammenfassung nicht validiert wird, kann sie ungeprüfte Hinweise enthalten, weshalb der Hinweis auf das ärztliche Gespräch wesentlich ist und die Qualität von der Vollständigkeit der Daten abhängt.

---

## ADR 08: Medikamenten-Wechselwirkungsprüfung auf Basis einer Wirkstoff-Datenbank

**Status:** accepted

### Kontext
Patientinnen und Patienten nehmen häufig mehrere Medikamente gleichzeitig ein, wodurch gefährliche Wechselwirkungen entstehen können. Diese müssen zuverlässig und auf belegter Grundlage erkannt werden und nicht durch ein Sprachmodell, das Inhalte erfinden könnte.

### Entscheidung
Beim Hinzufügen eines Medikaments prüft das Backend dessen ATC-Code gegen die bereits erfassten Medikamente. Über eine Zuordnungstabelle wird der ATC-Code auf eine DrugBank-Kennung abgebildet, und bekannte Wechselwirkungen werden in einer importierten Wirkstoff-Datenbank nachgeschlagen. Treffer werden als Warnung zurückgegeben und im Frontend angezeigt, wobei die englischen Beschreibungen ins Deutsche übersetzt werden. Die Prüfung ist regelbasiert und nutzt bewusst keine KI.

### Konsequenzen
Die Warnungen sind nachvollziehbar und auf eine feste Datenquelle gestützt. Nachteilig ist, dass die Abdeckung von der importierten Datenbank und von korrekten ATC-Codes abhängt. Schlägt die Übersetzung fehl, wird die englische Originalbeschreibung angezeigt.
