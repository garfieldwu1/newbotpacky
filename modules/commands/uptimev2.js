const os = require('os');

module.exports.config = {
  name: "uptimev2",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Blue",
  description: "Check the uptime of the bot.",
  usePrefix: true,
  commandCategory: "utility",
  usages: "uptime",
  cooldowns: 5,
  dependencies: {}
};

module.exports.run = async function ({ api, event }) {
  try {
    const uptimeInSeconds = process.uptime();
    const uptimeFormatted = formatUptime(uptimeInSeconds);

    const cpuCores = os.cpus().length;
    const totalMemoryGB = os.totalmem() / (1024 ** 3);
    const freeMemoryGB = os.freemem() / (1024 ** 3);
    const usedMemoryGB = totalMemoryGB - freeMemoryGB;


    const aiStatus = "online";
    const totalUsers = 132;
    const totalThreads = 4;
    const aiUsage = 0.2;
    const ping = 36;

    const design = `
🕒 UPTIME ${uptimeFormatted}

📡 OS: ${os.type()} ${os.release()}

🛡 (CPU)CORES: ${cpuCores}

⚔ (AI)STATUS: ${aiStatus}

📈 TOTAL USERS: ${totalUsers}

📉 TOTAL THREADS: ${totalThreads}

⚖ (AI)USAGE: ${aiUsage}

📊 (RAM)USAGE: ${usedMemoryGB.toFixed(2)} GB

💰 TOTAL(RAM): ${totalMemoryGB.toFixed(2)} GB

💸 CURRENT(RAM): ${freeMemoryGB.toFixed(2)} GB

🛫 PING: ${ping} ms

🕰 (UPTIME)SECONDS: ${uptimeInSeconds.toFixed(2)} seconds

📩 ADMIN CONTACT:
1. Fb Link: [https://www.facebook.com/markqtypie]`;

    api.sendMessage(design, event.threadID);
  } catch (error) {
    console.error("Error:", error);
    api.sendMessage("An error occurred while processing the uptime command.", event.threadID);
  }
};

function formatUptime(uptimeInSeconds) {
  const days = Math.floor(uptimeInSeconds / 86400);
  const hours = Math.floor((uptimeInSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);

  return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
}
