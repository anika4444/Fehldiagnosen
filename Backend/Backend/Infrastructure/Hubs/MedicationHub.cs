using Microsoft.AspNetCore.SignalR;

public class MedicationHub : Hub
{
    public async Task RefreshMedications()
    {
        await Clients.All.SendAsync("NotifyMedicationsRefresh");
    }
}