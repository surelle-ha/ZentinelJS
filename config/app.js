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

/* Configure EJS */
app.set("view engine", "ejs");
app.set("views", "./public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(responseTime());

app.use("/", express.static("public"));
app.use(
	"/storage",
	express.static("storage"),
	serveIndex("storage", { icons: true })
);
app.use("/orm-builder", express.static("storage/sequelize-ui"));
app.use("/docs", express.static("storage/docs"));

require("@config/environments")(app);
if (config.monitor) require("@config/monitor.js")(app);
if (config.database) require("@config/database.js")(app);
if (config.ratelimiter) require("@config/ratelimiter")(app);
if (config.helmet) require("@config/helmet")(app);
if (config.cors) require("@config/cors")(app);
if (config.logger) require("@config/logger")(app);
if (config.cache) require("@config/cache")(app);
if (config.prometheus) require("@config/prometheus")(app);
require("@config/maintenance")(app)
require("@app/__i")(app);
require("@config/exception")(app);

module.exports = app;
