namespace Backend.Application.Common.Security
{
    // Lets requests that touch the same code or patient run one after another.
    // Without it, parallel PIN guesses could all read the same failure counter and skip the lock,
    // and a one time link could be redeemed twice. A fixed set of semaphores keeps memory constant.
    // Works for one backend instance; several instances would need a database lock instead.
    public static class EmergencyLocks
    {
        private const int StripeCount = 64;

        private static readonly SemaphoreSlim[] Stripes = Enumerable
            .Range(0, StripeCount)
            .Select(_ => new SemaphoreSlim(1, 1))
            .ToArray();

        public static async Task<IDisposable> AcquireAsync(string key)
        {
            var stripe = Stripes[(key.GetHashCode() & int.MaxValue) % StripeCount];
            await stripe.WaitAsync();
            return new Releaser(stripe);
        }

        private sealed class Releaser : IDisposable
        {
            private SemaphoreSlim? _stripe;

            public Releaser(SemaphoreSlim stripe)
            {
                _stripe = stripe;
            }

            // Safe to call twice, the stripe is released only once
            public void Dispose()
            {
                Interlocked.Exchange(ref _stripe, null)?.Release();
            }
        }
    }
}
