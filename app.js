/* Import Server Modules */
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

/* Import Configurations */
const db_setup = require("./config/mongodb");
const env_setup = require("./config/environments");
const cors_setup = require("./config/cors");

/* Setup Database */
db_setup();

/* Setup Express Application */
const app = express();
app.use(helmet());
app.use(cors(cors_setup.Options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes: Web, API */
app.get("/", (req, res) => { res.status(200).send("Hello World!"); });
require("./app/models/__i.js")(app);
require("./app/middlewares/__i.js")(app);
require("./app/controllers/__i.js")(app);
require("./app/routes/__i.js")(app);

module.exports = app;
