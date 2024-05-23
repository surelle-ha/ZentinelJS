var fs = require("fs");
var path = require("path");

function loadRoutes(app, dir) {
    fs.readdirSync(dir).forEach(function (file) {
        var fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            loadRoutes(app, fullPath); 
        } else if (file !== "__i.js" && path.extname(file) === ".js") {
            require(fullPath)(app); 
        }
    });
}

module.exports = function (app) {
    loadRoutes(app, __dirname);
};
