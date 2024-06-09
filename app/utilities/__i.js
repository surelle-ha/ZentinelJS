var fs = require("fs");
var path = require("path");
module.exports = function (app) {
	app.utilities = {};
	fs.readdirSync(__dirname).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			var utility = require(path.join(__dirname, f))(app);
			app.utilities[utility.name] = utility;
		}
	});
};
