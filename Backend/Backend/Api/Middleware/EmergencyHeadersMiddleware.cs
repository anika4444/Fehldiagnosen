namespace Backend.Api.Middleware
{
    // Health data must not end up in browser caches, proxies or search engines
    public class EmergencyHeadersMiddleware
    {
        private readonly RequestDelegate _next;

        public EmergencyHeadersMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var path = context.Request.Path.Value ?? string.Empty;

            if (path.Contains("/emergency", StringComparison.OrdinalIgnoreCase))
            {
                context.Response.OnStarting(() =>
                {
                    var headers = context.Response.Headers;
                    headers.CacheControl = "no-store, no-cache, must-revalidate";
                    headers.Pragma = "no-cache";
                    headers["X-Robots-Tag"] = "noindex, nofollow";
                    headers["Referrer-Policy"] = "no-referrer";
                    headers.XContentTypeOptions = "nosniff";
                    return Task.CompletedTask;
                });
            }

            await _next(context);
        }
    }
}
