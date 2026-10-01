using System.Diagnostics;

namespace Backend.Application.Services.AnonymizerService
{
    public class AnonymizerService : IAnonymizerService
    {
        private readonly string _pythonScriptPath = Path.Combine(AppContext.BaseDirectory, "src", "anonymizer.py");
        public async Task<string> AnonymizeTextAsync(string rawText)
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = "python",
                Arguments = $"\"{_pythonScriptPath}\"",
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using (var process = new Process { StartInfo = startInfo })
            {
                try
                {
                    process.Start();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Python konnte nicht gestartet werden. Ist Python im System-PATH registriert? Details: {ex.Message}");
                }

                var outputTask = process.StandardOutput.ReadToEndAsync();
                var errorTask = process.StandardError.ReadToEndAsync();
                
                try
                {
                    using (var writer = process.StandardInput)
                    {
                        await writer.WriteAsync(rawText);
                    }
                } catch (IOException)
                {

                }

                await process.WaitForExitAsync();

                string errors = await errorTask;
                if(process.ExitCode != 0 || !string.IsNullOrWhiteSpace(errors))
                {
                    throw new Exception($"Fehler im Python-Skript (Exit Code {process.ExitCode}): {errors}");
                }

                string result = await outputTask;
                return result;
            }
        }
    }
}
