require("express-async-errors");

const express = require("express");
const serveIndex = require("serve-index");

module.exports = (config) => {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static("public"));

	/* Configure EJS */
	app.set("view engine", "ejs");
	app.set("views", "./public");

	app.use(
		"/storage",
		express.static("storage"),
		serveIndex("storage", { icons: true })
	);
	app.use("/orm-builder", express.static("storage/sequelize-ui"));

	require("@config/environments")(app);
	if (config.database) require("@config/database.js")(app);
	if (config.ratelimiter) require("@config/ratelimiter")(app);
	if (config.helmet) require("@config/helmet")(app);
	if (config.cors) require("@config/cors")(app);
	if (config.logger) require("@config/logger")(app);
	if (config.cache) require("@config/cache")(app);

	return app;
};
