using Prometheus;

namespace Backend.Infrastructure.Observability
{
    /// <summary>
    /// Fachliche Metriken des Backends (Prometheus, abrufbar über GET /metrics).
    /// HTTP-Metriken (Anzahl, Dauer, Statuscodes pro Endpoint) und Aufrufe an den AI-Service
    /// werden automatisch erfasst, siehe ObservabilityExtensions.
    ///
    /// Labels nur mit wenigen festen Werten verwenden (keine IDs, Namen oder Texte),
    /// sonst entstehen beliebig viele Zeitreihen.
    /// </summary>
    public static class AppMetrics
    {
        public static readonly Counter LoginAttempts = Metrics.CreateCounter(
            "auth_login_attempts_total",
            "Anmeldeversuche nach Ergebnis (success/failure)",
            new CounterConfiguration { LabelNames = ["result"] });

        public static readonly Counter Registrations = Metrics.CreateCounter(
            "auth_registrations_total",
            "Registrierungen nach Ergebnis (success/failure)",
            new CounterConfiguration { LabelNames = ["result"] });

        public static readonly Histogram OcrDuration = Metrics.CreateHistogram(
            "medical_letter_ocr_duration_seconds",
            "Dauer der Texterkennung (OCR) eines hochgeladenen Arztbriefs",
            new HistogramConfiguration
            {
                LabelNames = ["file_type"],
                Buckets = [0.1, 0.25, 0.5, 1, 2, 5, 10, 20]
            });

        public static readonly Counter MedicalLetterScans = Metrics.CreateCounter(
            "medical_letter_scans_total",
            "Verarbeitete Arztbrief-Scans nach Ergebnis (success/no_text/ai_error/error)",
            new CounterConfiguration { LabelNames = ["result"] });

        public static readonly Counter MedicationScans = Metrics.CreateCounter(
            "medication_scans_total",
            "Medikamenten-Scans nach Ergebnis (match/no_match/ai_error)",
            new CounterConfiguration { LabelNames = ["result"] });

        public static readonly Counter AiServiceErrors = Metrics.CreateCounter(
            "ai_service_errors_total",
            "Fehlgeschlagene Aufrufe an den AI-Service nach Operation",
            new CounterConfiguration { LabelNames = ["operation"] });
    }
}
