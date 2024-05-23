var fs = require("fs");
var path = require("path");
module.exports = function (app) {
	app.middlewares = {};
	fs.readdirSync(__dirname).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			var middleware = require(path.join(__dirname, f))(app);
			app.middlewares[middleware.name] = middleware;
		}
	});
};
