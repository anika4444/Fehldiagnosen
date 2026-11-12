// Extends app.json with LAN_IP from the .env in the repository root, so the IP is only set in one place.
const fs = require("fs");
const path = require("path");

function readLanIp() {
  if (process.env.LAN_IP) return process.env.LAN_IP.trim();

  const envFile = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(envFile)) return "";

  const match = fs
    .readFileSync(envFile, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => /^LAN_IP\s*=/.test(line));

  return match ? match.split("=")[1].trim().replace(/^["']|["']$/g, "") : "";
}

module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    lanIp: readLanIp(),
  },
});
