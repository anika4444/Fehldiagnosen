namespace Backend.Application.Services.MedicationService.Dto
{
    public enum InteractionCheckStatus
    {
        Checked, // Gegen alle aktiven Medikamente geprüft (Warnungen können leer sein)
        PartiallyChecked, // Einige aktive Medikamente ohne ATC-Code wurden nicht geprüft
        NotCheckable, // Prüfung konnte nicht laufen
        NothingToCompare // Keine weiteren aktiven Medikamente vorhanden
    }
}
