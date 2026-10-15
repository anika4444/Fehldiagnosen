import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Port 5173 must match Emergency:PortalBaseUrl and AllowedOrigins in the backend appsettings.json
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
});
