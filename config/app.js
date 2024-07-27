/*  _____________________________________

                ZENTINEL JS
    _____________________________________
*/
require("module-alias/register");
const express = require("express");
const serveIndex = require("serve-index");
const compression = require("compression");
const promMid = require("express-prometheus-middleware");

/* Setup Express Application */
const config = require("@/zentinel.config.js").config;

const app = express();

app.use(
	promMid({
		metricsPath: "/metrics",
		collectDefaultMetrics: true,
		requestDurationBuckets: [0.1, 0.5, 1, 1.5],
		requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
		responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
		/**
		 * Uncomenting the `authenticate` callback will make the `metricsPath` route
		 * require authentication. This authentication callback can make a simple
		 * basic auth test, or even query a remote server to validate access.
		 * To access /metrics you could do:
		 * curl -X GET user:password@localhost:9091/metrics
		 */
		// authenticate: req => req.headers.authorization === 'Basic dXNlcjpwYXNzd29yZA==',
		/**
		 * Uncommenting the `extraMasks` config will use the list of regexes to
		 * reformat URL path names and replace the values found with a placeholder value
		 */
		// extraMasks: [/..:..:..:..:..:../],
		/**
		 * The prefix option will cause all metrics to have the given prefix.
		 * E.g.: `app_prefix_http_requests_total`
		 */
		// prefix: 'app_prefix_',
		/**
		 * Can add custom labels with customLabels and transformLabels options
		 */
		// customLabels: ['contentType'],
		// transformLabels(labels, req) {
		//   // eslint-disable-next-line no-param-reassign
		//   labels.contentType = req.headers['content-type'];
		// },
	})
);

// curl -X GET localhost:9091/hello?name=Chuck%20Norris
app.get("/hello", (req, res) => {
	console.log("GET /hello");
	const { name = "Anon" } = req.query;
	res.json({ message: `Hello, ${name}!` });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(compression());

/* Configure EJS */
app.set("view engine", "ejs");
app.set("views", "./public");

app.use(require("express-status-monitor")());
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
require("@app/__i")(app);
require("@config/exception")(app);

module.exports = app;
