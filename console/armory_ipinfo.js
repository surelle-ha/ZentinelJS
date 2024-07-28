const axios = require('axios');
const os = require('os');
const macaddress = require('macaddress');

module.exports = (Armory) => {
    Armory.program
        .command("ipinfo")
        .description("Fetches and prints your public IP address, local IP address, and MAC address")
        .action(async () => {
            try {
                // Fetch your public IP address from a public IP service
                const response = await axios.get('https://api.ipify.org?format=json');
                const publicIpAddress = response.data.ip;

                // Get local IP address
                const networkInterfaces = os.networkInterfaces();
                const localIpAddress = Object.values(networkInterfaces)
                    .flat()
                    .find((iface) => iface.family === 'IPv4' && !iface.internal)?.address;

                // Get MAC address
                const mac = await new Promise((resolve, reject) => {
                    macaddress.one((err, mac) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(mac);
                        }
                    });
                });

                // Print the addresses with a timestamp
                Armory.logWithTimestamp(`Public IP address: ${publicIpAddress}`, "green");
                Armory.logWithTimestamp(`Local IP address: ${localIpAddress}`, "green");
                Armory.logWithTimestamp(`MAC address: ${mac}`, "green");
            } catch (error) {
                Armory.logWithTimestamp('Error fetching server information: ' + error.message, "red");
            }
        });
};
