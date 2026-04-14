using Backend.Application.Common.Results;

namespace Backend.Application.Services.HealthTipService
{
    public class HealthTipService : IHealthTipService
    {
        private static readonly string[] _healtTips = new[]
{
            "Trinke mindestens 2 Liter Wasser pro Tag.",
            "Mache täglich 10.000 Schritte.",
            "Achte auf 7-8 Stunden Schlaf pro Nacht.",
            "Dehne dich regelmäßig, besonders am Schreibtisch.",
            "Steh jede Stunde für 5 Minuten auf und bewege dich.",
            "Reduziere deinen Zuckerkonsum."
        };

        public ServiceResult<string> GetTodayHealthTipAsync()
        {
            int seed = DateTime.Today.Year * 1000 + DateTime.Today.DayOfYear;
            var random = new Random(seed);
            int index = random.Next(_healtTips.Length);
            string tip = _healtTips[index];

            return ServiceResult<string>.Success(tip);
        }
    }
}
