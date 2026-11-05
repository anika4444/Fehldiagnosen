import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// Port 5173 must match Emergency:PortalBaseUrl and AllowedOrigins in the backend appsettings.json
export default defineConfig(({ mode }) => {
  // LAN_IP comes from the .env in the repository root, so the IP is only set in one place.
  // VITE_API_BASE_URL in emergency-portal/.env still wins if someone sets it explicitly.
  const rootEnv = loadEnv(mode, "..", "LAN_IP");
  const portalEnv = loadEnv(mode, ".", "VITE_");
  const lanIp = rootEnv.LAN_IP?.trim();
  const apiBaseUrl =
    portalEnv.VITE_API_BASE_URL ?? (lanIp ? `http://${lanIp}:5238/api` : "http://localhost:5238/api");

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(apiBaseUrl),
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true,
    },
  };
});
