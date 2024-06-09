var fs = require("fs");
var path = require("path");
module.exports = function (app) {
	app.services = {};
	fs.readdirSync(__dirname).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			var service = require(path.join(__dirname, f))(app);
			app.services[service.name] = service;
		}
	});
};
