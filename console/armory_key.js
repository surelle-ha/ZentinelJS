const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = (Armory) => {
	Armory.program
		.command("key:secret")
		.description("Generate new JWT_SECRET in the .env file")
		.action(() => {
			const jwtSecret = uuidv4();
			const envFilePath = ".env";
			let envContent = "";
			if (fs.existsSync(envFilePath)) {
				envContent = fs.readFileSync(envFilePath, "utf8");
			}
			const lines = envContent.split("\n");
			let updatedContent = "";
			let jwtSecretUpdated = false;

			for (const line of lines) {
				if (line.startsWith("JWT_SECRET =") || line.startsWith("JWT_SECRET=")) {
					updatedContent += `JWT_SECRET = ${jwtSecret}\n`;
					jwtSecretUpdated = true;
				} else {
					updatedContent += `${line}\n`;
				}
			}

			if (!jwtSecretUpdated) {
				updatedContent += `JWT_SECRET=${jwtSecret}\n`;
			}

			fs.writeFileSync(envFilePath, updatedContent.trim(), "utf8");
			Armory.logWithTimestamp(
				`JWT_SECRET has been updated to ${jwtSecret} in ${envFilePath}`,
				"green"
			);
		});

	Armory.program
		.command("key:maintenance")
		.description("Generate new MAINTENANCE_KEY in the .env file")
		.action(() => {
			const maintenanceKey = uuidv4();
			const envFilePath = ".env";
			let envContent = "";
			if (fs.existsSync(envFilePath)) {
				envContent = fs.readFileSync(envFilePath, "utf8");
			}
			const lines = envContent.split("\n");
			let updatedContent = "";
			let maintenanceKeyUpdated = false;

			for (const line of lines) {
				if (
					line.startsWith("MAINTENANCE_KEY =") ||
					line.startsWith("MAINTENANCE_KEY=")
				) {
					updatedContent += `MAINTENANCE_KEY = ${maintenanceKey}\n`;
					maintenanceKeyUpdated = true;
				} else {
					updatedContent += `${line}\n`;
				}
			}

			if (!maintenanceKeyUpdated) {
				updatedContent += `MAINTENANCE_KEY=${maintenanceKey}\n`;
			}

			fs.writeFileSync(envFilePath, updatedContent.trim(), "utf8");
			Armory.logWithTimestamp(
				`JWT_SECRET has been updated to ${maintenanceKey} in ${envFilePath}`,
				"green"
			);
		});
};
