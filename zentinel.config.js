require("dotenv").config();
module.exports = {
	app: {
		version: "1.0.5",
		alias: {},
	},
	config: {
		/**********************************************
		 * MONITOR:
		 * Enables monitoring of application performance and health metrics.
		 * Once enabled, you may access the monitor at /health/status
		 **********************************************/
		monitor: true,

		/**********************************************
		 * STORAGE:
		 * This will add storage functionality to your web application.
		 * Using multer, you can manage the file uploads easily.
		 **********************************************/
		storage: true,

		/**********************************************
		 * MAILER:
		 * Configures the mailer service for sending emails.
		 **********************************************/
		mailer: true,

		/**********************************************
		 * DATABASE:
		 * Enables database connection and management.
		 **********************************************/
		database: true,

		/**********************************************
		 * RATELIMITER:
		 * Activates rate limiting to prevent abuse and ensure fair usage.
		 **********************************************/
		ratelimiter: true,

		/**********************************************
		 * HELMET:
		 * Applies security headers to protect against various web vulnerabilities.
		 **********************************************/
		helmet: true,

		/**********************************************
		 * CORS:
		 * Configures Cross-Origin Resource Sharing settings.
		 **********************************************/
		cors: true,

		/**********************************************
		 * LOGGER:
		 * Enables logging of application events and errors.
		 **********************************************/
		logger: true,

		/**********************************************
		 * CACHE:
		 * Manages caching mechanisms for improved performance.
		 **********************************************/
		cache: false,

		/**********************************************
		 * PROMETHEUS:
		 * Exposes metrics for monitoring and 
		 * alerting with Prometheus. Once activated, 
		 * web app will provide information at /metrics
		 **********************************************/
		prometheus: true,
	},
	/**********************************************
	 * Below are the required configuration for
	 * Sequelize ORM. Only modify this if you know
	 * what you're doing.
	 **********************************************/
	test: {
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASS,
		database: process.env.DATABASE_NAME,
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		dialect: process.env.DATABASE_TYPE,
	},
	development: {
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
