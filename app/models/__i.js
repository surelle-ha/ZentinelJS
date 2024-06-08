const fs = require("fs");
const path = require("path");

module.exports = function (app, sequelize) {
    app.models = app.models || {};
    let modelFiles = [];

    fs.readdirSync(__dirname).forEach(function (f) {
        const fullPath = path.join(__dirname, f);
        if (f !== "__i.js" && path.extname(f) === ".js") {
            modelFiles.push(fullPath);
        }
    });

    modelFiles.forEach(function (fullPath) {
        if (fullPath.endsWith(".Sequelize.js")) {
            const model = require(fullPath)(sequelize);
            app.models[model.name] = model;
        } else if (fullPath.endsWith(".Mongo.js")) {
            const model = require(fullPath)(app);
            app.models[model.modelName] = model;
        }
    });

    Object.keys(app.models).forEach(modelName => {
        if ('associate' in app.models[modelName]) {
            app.models[modelName].associate(app.models);
        }
    });

    Object.keys(app.models).forEach(modelName => {
        console.log(`Model: ${modelName}, Associations: `, Object.keys(app.models[modelName].associations || {}));
    });
};
