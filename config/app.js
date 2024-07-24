/*  _____________________________________

                ZENTINEL JS
    _____________________________________
*/
require("module-alias/register");

/* Import Server Modules */
const express = require("express");
const serveIndex = require("serve-index");

/* Import Configurations */
const { connectDB: nosql_setup } = require("@config/nosql.js");

/* Setup Express Application */
const app = express();

if (true) require("@config/environments")(app);
if (true) require("@config/sql.js")(app);
if (false) nosql_setup();
if (true) require("@config/ratelimiter")(app);
if (true) require("@config/helmet")(app);
if (true) require("@config/cors")(app);
if (true) require("@config/logger")(app);
if (false) require("@config/cache")(app);

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

/* Routes: Web, API */
require("@app/__i.js")(app);

module.exports = app;
