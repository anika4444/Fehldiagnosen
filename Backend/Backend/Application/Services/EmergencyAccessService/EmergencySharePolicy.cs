using Backend.Domain.Entities;
using Backend.Domain.Enums;

namespace Backend.Application.Services.EmergencyAccessService
{
    // Decides which data categories a code type may show. Used by the app settings and the portal.
    public static class EmergencySharePolicy
    {
        public static readonly EmergencyDataCategory[] CoreCategories =
        [
            EmergencyDataCategory.Medications,
            EmergencyDataCategory.Interactions,
            EmergencyDataCategory.ChronicConditions,
            EmergencyDataCategory.Symptoms,
            EmergencyDataCategory.RedFlags,
            EmergencyDataCategory.AiSummary
        ];

        public static readonly EmergencyDataCategory[] ExtendedCategories =
        [
            EmergencyDataCategory.SymptomHistory,
            EmergencyDataCategory.MedicalLetters,
            EmergencyDataCategory.MedicationHistory
        ];

        public static bool IsExtended(EmergencyDataCategory category)
        {
            return ExtendedCategories.Contains(category);
        }

        // One time links show the same data as the treatment code
        public static EmergencyCodeType SettingsTypeFor(EmergencyCodeType codeType)
        {
            return codeType == EmergencyCodeType.OneTime ? EmergencyCodeType.Treatment : codeType;
        }

        public static bool DefaultFor(EmergencyCodeType codeType, EmergencyDataCategory category)
        {
            if (IsExtended(category))
                return codeType != EmergencyCodeType.Emergency;

            return true;
        }

        // Stored settings win over defaults. Extended data is never allowed for the emergency code.
        public static HashSet<EmergencyDataCategory> Resolve(IEnumerable<EmergencyShareSetting> stored, EmergencyCodeType codeType)
        {
            var settingsType = SettingsTypeFor(codeType);
            var storedForType = stored
                .Where(s => s.CodeType == settingsType)
                .ToDictionary(s => s.Category, s => s.IsEnabled);

            var result = new HashSet<EmergencyDataCategory>();
            foreach (var category in Enum.GetValues<EmergencyDataCategory>())
            {
                if (settingsType == EmergencyCodeType.Emergency && IsExtended(category))
                    continue;

                var enabled = storedForType.TryGetValue(category, out var value)
                    ? value
                    : DefaultFor(settingsType, category);

                if (enabled)
                    result.Add(category);
            }

            return result;
        }
    }
}
