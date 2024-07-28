/*  _____________________________________

                ZENTINEL JS
    _____________________________________
*/
require("module-alias/register");
const express = require("express");
const serveIndex = require("serve-index");
const compression = require("compression");
const responseTime = require("response-time");

/* Setup Express Application */
const config = require("@/zentinel.config.js").config;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(compression());

/* Configure EJS */
app.set("view engine", "ejs");
app.set("views", "./public");

app.use(responseTime());
app.use(
	require("express-status-monitor")({
		title: "Zentinel",
		path: "/health/status",
		chartVisibility: {
			cpu: true,
			mem: true,
			load: true,
			eventLoop: true,
			heap: true,
			responseTime: true,
			rps: true,
			statusCodes: true,
		},
		healthChecks: [
			{
				protocol: "http",
				host: "localhost",
				path: "/",
				port: "8800",
			},
		],
	})
);
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
if (config.prometheus) require("@config/prometheus")(app);
require("@app/__i")(app);
require("@config/exception")(app);

module.exports = app;
