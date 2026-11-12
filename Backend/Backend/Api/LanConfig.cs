namespace Backend.Api;

// Reads LAN_IP so the IP address of the dev machine only has to be set in the .env in the repository root.
public static class LanConfig
{
    public static string? ReadLanIp(string contentRootPath)
    {
        var fromEnvironment = Environment.GetEnvironmentVariable("LAN_IP");
        if (!string.IsNullOrWhiteSpace(fromEnvironment))
        {
            return fromEnvironment.Trim();
        }

        // Content root is Backend/Backend, the .env lies two levels up
        var envFile = Path.GetFullPath(Path.Combine(contentRootPath, "..", "..", ".env"));
        if (!File.Exists(envFile))
        {
            return null;
        }

        foreach (var rawLine in File.ReadAllLines(envFile))
        {
            var line = rawLine.Trim();
            if (line.StartsWith('#') || !line.StartsWith("LAN_IP", StringComparison.Ordinal))
            {
                continue;
            }

            var parts = line.Split('=', 2);
            if (parts.Length == 2 && parts[0].Trim() == "LAN_IP")
            {
                var value = parts[1].Trim().Trim('"', '\'');
                return value.Length > 0 ? value : null;
            }
        }

        return null;
    }
}
