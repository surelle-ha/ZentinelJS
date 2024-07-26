/*  _____________________________________

                ZENTINEL JS
    _____________________________________
*/
require("module-alias/register");

/* Setup Express Application */
const config = require("@/zentinel.config.js").config;
const app = require("@config/__gem")(config);

/* Routes: Web, API */
const globalMiddleware = require("@app/__i")(app);

module.exports = app;
