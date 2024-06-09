/* Import Server Modules */
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

/* Import Configurations */
const { connectDB:sql_setup, sequelize} = require('./config/sql.js');
const { connectDB:nosql_setup } = require("./config/nosql.js");
const { RateLimit } = require("./config/ratelimiter.js")
const env_setup = require("./config/environments");
const cors_setup = require("./config/cors");

/* Setup Database */
sql_setup();
nosql_setup();

/* Setup Express Application */
const app = express();
app.use(RateLimit)
app.use(helmet());
app.use(cors(cors_setup.Options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* Routes: Web, API */
app.get("/", (req, res) => { res.status(200).send("ZentinelJS Served"); });
require("./app/utilities/__i.js")(app);
require("./app/services/__i.js")(app);
require("./app/models/__i.js")(app, sequelize);
require("./app/middlewares/__i.js")(app);
require("./app/controllers/__i.js")(app);
require("./app/routes/__i.js")(app);

module.exports = app;
