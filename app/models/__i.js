var fs = require("fs");
var path = require("path");
module.exports = function (app) {
	app.models = {};
	fs.readdirSync(__dirname).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			var model = require(path.join(__dirname, f))(app);
			app.models[model.modelName] = model;
		}
	});
};
