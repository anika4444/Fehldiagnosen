using System.Security.Cryptography;
using System.Text;

namespace Backend.Application.Common.Security
{
    // Creates and checks the secrets of the emergency feature. Plain values never reach the database.
    public static class CodeHasher
    {
        // No 0/O and 1/I/L so the id can be read out loud without mistakes
        private const string PublicIdAlphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
        private const int PublicIdLength = 8;
        private const int TokenBytes = 32; // 256 bit, requirement is at least 128
        private const int BcryptWorkFactor = 11;

        public static string CreateToken()
        {
            var bytes = RandomNumberGenerator.GetBytes(TokenBytes);
            return Base64UrlEncode(bytes);
        }

        public static string CreatePublicId()
        {
            var chars = new char[PublicIdLength];
            for (var i = 0; i < PublicIdLength; i++)
            {
                chars[i] = PublicIdAlphabet[RandomNumberGenerator.GetInt32(PublicIdAlphabet.Length)];
            }
            return new string(chars);
        }

        public static string CreatePin()
        {
            return RandomNumberGenerator.GetInt32(0, 1_000_000).ToString("D6");
        }

        // Tokens are long random values, a fast hash without salt is enough here
        public static string HashToken(string token)
        {
            var hash = SHA256.HashData(Encoding.UTF8.GetBytes(token));
            return Convert.ToHexString(hash).ToLowerInvariant();
        }

        // PINs are short, so they need a slow salted hash
        public static string HashPin(string pin)
        {
            return BCrypt.Net.BCrypt.HashPassword(pin, BcryptWorkFactor);
        }

        public static bool VerifyPin(string pin, string pinHash)
        {
            try
            {
                return BCrypt.Net.BCrypt.Verify(pin, pinHash);
            }
            catch (Exception ex) when (ex is BCrypt.Net.SaltParseException or ArgumentException or IndexOutOfRangeException)
            {
                return false;
            }
        }

        // Runs the same slow check for unknown ids, so response time does not reveal which ids exist
        public static void VerifyAgainstDummy(string pin)
        {
            VerifyPin(pin, DummyPinHash.Value);
        }

        private static readonly Lazy<string> DummyPinHash = new(() => HashPin("000000"));

        // Accepts "k7qm 4xt2", "K7QM-4XT2" and returns "K7QM4XT2"
        public static string NormalizePublicId(string? input)
        {
            if (string.IsNullOrWhiteSpace(input)) return string.Empty;
            return new string(input.Where(char.IsLetterOrDigit).ToArray()).ToUpperInvariant();
        }

        private static string Base64UrlEncode(byte[] bytes)
        {
            return Convert.ToBase64String(bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');
        }
    }
}
