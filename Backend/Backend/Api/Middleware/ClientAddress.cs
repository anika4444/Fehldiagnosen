using System.Net;
using System.Net.Sockets;

namespace Backend.Api.Middleware
{
    // Key for the per IP rate limit of the emergency portal.
    // One IPv6 connection usually owns a whole /64 network, so counting single IPv6 addresses
    // would let an attacker switch addresses endlessly. IPv6 is therefore counted per /64.
    public static class ClientAddress
    {
        public static string PartitionKey(HttpContext context)
        {
            var address = context.Connection.RemoteIpAddress;
            if (address == null)
                return "unknown";

            if (address.IsIPv4MappedToIPv6)
                address = address.MapToIPv4();

            if (address.AddressFamily != AddressFamily.InterNetworkV6)
                return address.ToString();

            var bytes = address.GetAddressBytes();
            Array.Clear(bytes, 8, 8);
            return new IPAddress(bytes) + "/64";
        }
    }
}
