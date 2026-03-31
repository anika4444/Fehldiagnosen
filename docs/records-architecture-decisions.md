# ADR 01: Frontend Framework Ärzteansicht: React

- **Status**: Entschieden

## Kontext und Problemstellung

Die Ärzteansicht ist das zentrale Arbeitswerkzeug für das medizinische Personal. Sie muss große Mengen an komplexen Daten übersichtlich darstellen und schnelle Interaktionen ermöglichen. Da Ärzte oft unter Zeitdruck arbeiten, ist eine hochperformante, fehlerfreie und intuitiv bedienbare Weboberfläche essenziell. Zudem muss die Anwendung leicht erweiterbar sein, um künftige diagnostische Tools nahtlos integrieren zu können.

## Entscheidung

Wir setzen React als primäres Frontend-Framework für die Ärzteansicht ein.

## Begründung

- Entwicklungskenntnisse
- Großes Ökosystem
- Wiederverwendbarkeit
- Zukunftssicherheit
- Virutal DOM

## Konsequenzen

### Positiv (+)

- Schnellere Feature-Entwicklung durch vorhandene Expertise

### Negativ (-)

- Hohe Entscheidungsdichte notwendig
- Regelmäßige Updates

## Erwogene Optionen

- Vue.js

# ADR 02: Frontend Framework Patientenansicht: React Native

- **Status**: Entschieden

## Kontext und Problemstellung

Für Patienten soll eine mobile Lösung geschaffen werden, die über die Möglichkeiten einer reinen Weboberfläche hinausgeht. Die Anwendung muss als native App auf Smartphones (iOS & Android) funktionieren, um den schnellen Zugriff auf Gesundheitsdaten gewährleisten. Wichtige Anforderungen sind eine flüssige Bedienung, die Nutzung von Push-Benachrichtigungen für medizinische Reminder und ein einfacher Zugang über App-Stores.

## Entscheidung

Wir setzen React Native in Kombination mit dem Expo SDK als Framework für die mobile Patienten-App ein.

## Begründung

- Native User Experience
- Code Synergie
- Expo Ökosystem
- Hot Reloading

## Konsequenzen

### Positiv (+)

- Cross Plattform
- Push Benachrichtigungen
- Hardware Zugriff

### Negativ (-)

- Abhängigkeit von Expo
- App-Größe
- Abstraktionsschicht

## Erwogene Optionen

- React
- React Native ohne Expo

# ADR 03: Frontend Applikation Patientenansicht: App

- **Status**: Entschieden

## Kontext und Problemstellung

Für unser System wird ein Frontend benötigt, über das Patienten auf ihre Daten zugreifen können. Ein wesentlicher Teil unserer Zielgruppe besteht aus älteren oder weniger technikaffinen Menschen. Die Herausforderung besteht darin, das Frontend-Medium (App vs. klassische Website) so zu wählen, dass die Einstiegsbarriere für diese spezifische Nutzergruppe so gering wie möglich ist und die Bedienung im Alltag intuitiv und fehlerfrei gelingt.

## Entscheidung

Wir haben uns entschieden, die Patientenansicht als mobile Applikation (App) für Smartphones umzusetzen, die von den Nutzern auf ihren mobilen Endgeräten installiert wird.

## Begründung

Smartphones sind mittlerweile in allen Altersgruppen – auch bei Senioren – sehr stark verbreitet und haben den klassischen Desktop-PC in vielen Haushalten als primäres Zugangsmedium zum Internet abgelöst.

Eine installierte App bietet ein geschlossenes, ablenkungsfreies Nutzererlebnis. Sobald die App einmalig eingerichtet ist, genügt ein einfaches Tippen auf das App-Icon auf dem Startbildschirm, um auf die Patientenansicht zuzugreifen. Dies erspart den Nutzern den für sie oft fehleranfälligen Umgang mit Webbrowsern (wie das Eintippen von URLs, das Verwalten von Lesezeichen oder das versehentliche Schließen von Tabs). Das Bedienkonzept einer App kommt den Gewohnheiten älterer Smartphone-Nutzer daher deutlich entgegen.

## Konsequenzen

### Positiv (+)

- Hohe Zugänglichkeit und einfache Bedienung: Ältere Menschen tun sich mit dem Starten einer App über ein festes Icon auf dem Homescreen deutlich leichter als mit der Navigation im Browser.

- Hohe Verfügbarkeit: Smartphones sind im Alltag präsenter und schneller griffbereit als Desktop-PCs.

- Vereinfachter Login: Nativer Support für biometrische Logins (Fingerabdruck, Face ID) kann implementiert werden, wodurch sich Nutzer keine komplexen Passwörter merken müssen.

- Push-Benachrichtigungen: Ermöglicht die direkte und zuverlässige Zustellung von Erinnerungen.

### Negativ (-)

- Initiale Installationshürde: Die App muss einmalig aktiv aus einem App Store (Apple App Store, Google Play Store) heruntergeladen und installiert werden.

- Höherer Entwicklungsaufwand: Die Entwicklung und Wartung einer App (selbst bei Cross-Platform-Ansätzen) ist in der Regel aufwendiger als die einer reinen Website.

- Abhängigkeit von App Stores: Updates müssen die Review-Prozesse der Store-Betreiber durchlaufen, was Bugfixes verzögern kann.

## Erwogene Optionen

- Website

# ADR 04: Backend Framework: .NET Core API

- **Status**: Entschieden

## Kontext und Problemstellung

Für die App benötigen wir ein robustes, sicheres und performantes Backend. Dieses Backend muss als API fungieren, Geschäftslogik zentral verwalten, Datenbankzugriffe orchestieren und eine sichere Datenübertragung (insbesondere von sensiblen Gesundheitsdaten)

## Entscheidung

Wir haben uns entschieden, ASP.NET Core Web API (basierend auf dem modernen .NET-Ökosystem) als zentrales Backend-Framework für die Entwicklung unserer API-Services zu verwenden.

## Begründung

- Sicherheit & Compliance: .NET Core bringt von Haus aus starke, enterprise-erprobte Sicherheitsmechanismen (Authentifizierung, Autorisierung via JWT/OAuth, Data Protection API) mit. Dies ist für die gesetzeskonforme Verarbeitung sensibler Gesundheitsdaten (z. B. DSGVO/HIPAA) unerlässlich.

- Performance: ASP.NET Core gehört zu den schnellsten Web-Frameworks auf dem Markt und verarbeitet Requests ressourcenschonend und asynchron, was eine hohe Skalierbarkeit ermöglicht.

- Typsicherheit & C#: Die Verwendung von C# als streng typisierte, moderne Sprache reduziert Laufzeitfehler erheblich und erleichtert das Refactoring sowie die Pflege großer Codebasen.

- Ausgereiftes Ökosystem: Mit Werkzeugen wie Entity Framework Core (ORM) und einer riesigen Auswahl an gut gepflegten NuGet-Paketen können Standardprobleme schnell und sicher gelöst werden.

- Plattformunabhängigkeit: .NET Core läuft cross-platform (Windows, Linux, macOS) und eignet sich damit hervorragend für containerisierte Deployments (Docker/Kubernetes) in der Cloud.

## Konsequenzen

### Positiv (+)

- Hohe Zuverlässigkeit: Reduzierte Fehlerquote durch strenge Typisierung und exzellente Compiler-Unterstützung.

- Hervorragendes Tooling: Sehr gute Entwicklererfahrung (Developer Experience) durch Visual Studio, Rider und umfassende Debugging- sowie Profiling-Tools.

- Zukunftssicherheit: Starke Unterstützung und kontinuierliche Weiterentwicklung durch Microsoft und die Open-Source-Community.

- Effiziente Datenbankanbindung: Nahtlose Integration von Entity Framework Core beschleunigt die Entwicklung der Datenzugriffsschicht.

### Negativ (-)

- Lernkurve: Für Entwickler, die bisher nur mit dynamischen Sprachen (wie JavaScript/Python) gearbeitet haben, kann die Einarbeitung in C# und die .NET-Architekturmuster anfänglich steil sein.

- Boilerplate-Code: Traditionelle Controller-basierte .NET APIs erfordern manchmal mehr Code-Struktur und Setup als leichtgewichtige Alternativen (wobei dies durch "Minimal APIs" in neueren .NET-Versionen abgemildert wird).

- Ressourcenverbrauch im Leerlauf: Verglichen mit extrem leichtgewichtigen Runtimes (wie Go) kann der initiale Speicherbedarf (Footprint) etwas höher ausfallen.

## Erwogene Optionen

- Node.js
- Java mit Spring Boot
- PHP
- Python
