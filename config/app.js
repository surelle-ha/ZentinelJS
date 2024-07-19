/*  _____________________________________

                ZENTINEL JS
    _____________________________________
*/  
require('module-alias/register')

/* Import Server Modules */
const express = require("express");
const serveIndex = require('serve-index');

/* Import Configurations */
const { connectDB: sql_setup, sequelize } = require("@config/sql.js");
const { connectDB: nosql_setup } = require("@config/nosql.js");
const { RateLimit } = require("@config/ratelimiter.js");
const { cors, cors_options } = require("@config/cors");
const { helmet } = require("@config/helmet");
const { loggerPino } = require("@config/logger");

/* Setup Express Application */
const app = express();

if (true) sql_setup();

if (false) nosql_setup();

if (true) app.use(RateLimit);

if (true) app.use(helmet());

if (true) app.use(cors(cors_options));

app.use(loggerPino);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* Configure EJS */
app.set('view engine', 'ejs');
app.set('views', './public'); 

app.use('/storage', express.static('storage'), serveIndex('storage', {'icons': true }));
app.use('/orm-builder', express.static('storage/sequelize-ui'));

app.config = {};
app.config.RateLimit = RateLimit;

/* Routes: Web, API */
require("@app/__i.js")(app, sequelize);

module.exports = app;
