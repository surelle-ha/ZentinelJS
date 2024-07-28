const fs = require("fs");

module.exports = (Armory) => {
	Armory.program
		.command("validate")
		.description("Check if 'zentinel.config.js' exists, and create it if not.")
		.action(() => {
			if (fs.existsSync(Armory.configFilePath)) {
				Armory.logWithTimestamp(
					"Validation successful: 'zentinel.config.js' already exists.",
					"green"
				);
			} else {
				Armory.logWithTimestamp(
					"'zentinel.config.js' not found. Creating file...",
					"yellow"
				);
				const configContent = `
require("dotenv").config();
module.exports = {
  app: {
    version: "1.0.5",
    alias: {}
  },
  config: {
    monitor: true,
    database: true,
    ratelimiter: true,
    helmet: true,
    cors: true,
    logger: true,
    cache: false,
    prometheus: true
  },
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_TYPE,
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_TYPE,
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_TYPE,
  },
};
      `;
				fs.writeFileSync(Armory.configFilePath, configContent.trim(), "utf8");
				Armory.logWithTimestamp("'zentinel.config.js' created successfully.", "green");
			}
		});
};
