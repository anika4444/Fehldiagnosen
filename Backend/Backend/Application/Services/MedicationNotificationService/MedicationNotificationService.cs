using Microsoft.AspNetCore.SignalR;

namespace Backend.Application.Services.MedicationNotification
{
    public class MedicationNotificationService : IMedicationNotificationService
    {
        private readonly IHubContext<MedicationHub> _hubContext;
        
        public MedicationNotificationService(IHubContext<MedicationHub> hubContext)
        {
            _hubContext = hubContext;
        }
        
        public async Task NotifyMedicationChanged()
        {
            await _hubContext.Clients.All.SendAsync("RefreshMedications");
        }
    }
}
