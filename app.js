/* Import Server Modules */
const connectDB = require("./config/database");
const express = require("express");
const cors = require("cors");

connectDB();

/* Import Configurations */
const ENV = require("./config/environments");
const CORS = require("./config/cors");

/* Setup Server */
const app = express();

app.use(cors(CORS.Options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes: Web, API */
require("./app/models")(app);
require("./app/controllers")(app);
require("./app/routes")(app);

app.listen(ENV.PORT, () => {
	console.log(`${ENV.NAME} SERVER RUNNING [ ${ENV.BASE}:${ENV.PORT} ]`);
});
