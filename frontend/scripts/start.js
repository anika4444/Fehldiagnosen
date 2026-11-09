// Starts Expo with LAN_IP from the .env in the repository root as the address in the QR code.
// Without it Expo may pick a WSL/VPN/Ethernet adapter the phone cannot reach
// ("java.io.IOException: Failed to download remote update" in Expo Go).
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function readLanIp() {
  if (process.env.LAN_IP) return process.env.LAN_IP.trim();

  const envFile = path.join(__dirname, "..", "..", ".env");
  if (!fs.existsSync(envFile)) return "";

  const match = fs
    .readFileSync(envFile, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => /^LAN_IP\s*=/.test(line));

  return match ? match.split("=")[1].trim().replace(/^["']|["']$/g, "") : "";
}

const lanIp = readLanIp();
const env = { ...process.env };
if (lanIp) {
  env.REACT_NATIVE_PACKAGER_HOSTNAME = lanIp;
  console.log(`Expo uses LAN_IP ${lanIp} for the QR code`);
}

const child = spawn("npx", ["expo", "start", ...process.argv.slice(2)], {
  stdio: "inherit",
  env,
  shell: true,
});
child.on("exit", (code) => process.exit(code ?? 0));
