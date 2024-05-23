var fs = require("fs");
var path = require("path");
module.exports = function (app) {
	app.controllers = {};
	fs.readdirSync(__dirname).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			var controller = require(path.join(__dirname, f))(app);
			app.controllers[controller.name] = controller;
		}
	});
};
