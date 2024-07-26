/*  _____________________________________

                ZENTINEL JS
    _____________________________________
*/
require("module-alias/register");

/* Setup Express Application */
const config = require("@/zentinel.config.js").config;
const app = require("@config/_engine")(config);

/* Routes: Web, API */
require("@app/__i")(app);

module.exports = app;
