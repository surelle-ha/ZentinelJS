const fs = require("fs");
const path = require("path");

module.exports = function (app, sequelize) {
    app.models = app.models || {};
    fs.readdirSync(__dirname).forEach(function (f) {
        const fullPath = path.join(__dirname, f);
        if (f !== "__i.js" && path.extname(f) === ".js") {
            if (f.endsWith(".Sequelize.js")) {
                const model = require(fullPath)(sequelize);
                app.models[model.name] = model;
            } else if (f.endsWith(".Mongo.js")) {
                const model = require(fullPath)(app);
                app.models[model.modelName] = model;
            }
			console.log(sequelize.models.User)
        }
    });
};
