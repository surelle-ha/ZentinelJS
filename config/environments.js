require("dotenv").config();

module.exports = (app) => {
	app.env = process.env;
}