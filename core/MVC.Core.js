const { composer } = require("./utilities/composer.js")
const path = require("path");

function createCMR(name) {
	createController(name);
	createModel(name);
	createRoute(name);
}

function createController(name) {
	const dir = path.join(__dirname, "../app/controllers");
	const filePath = path.join(dir, `${name}.Controller.js`);
	const content = `module.exports = function (app) {
    var ${name} = app.models.${name};
    var Controller = {
        name: "${name}",
    };

    // compose the controller here.
    
    return Controller;
};
`;

	composer(dir, filePath, content);
}

function createMiddleware(name) {
	const dir = path.join(__dirname, "../app/middlewares");
	const filePath = path.join(dir, `${name}.Middleware.js`);
	const content = `module.exports = function (app) {
    var Middleware = {
        name: "${name}",
    };

    // compose the middleware here.
    
    return Middleware;
};
`;

	composer(dir, filePath, content);
}

function createModel(name) {
	const dir = path.join(__dirname, "../app/models");
	const filePath = path.join(dir, `${name}.Model.js`);
	const content = `var mongoose = require("mongoose");

var Schema = mongoose.Schema;
module.exports = function () {
    var ${name}Schema = new Schema(
        {
            // Compose Schema Here          
        },
        { timestamps: true }
    );
    return mongoose.model("${name}", ${name}Schema);
};
`;

	composer(dir, filePath, content);
}

function createRoute(name) {
	const dir = path.join(__dirname, "../app/routes/v1");
	const filePath = path.join(dir, `${name}.Route.js`);
	const content = `module.exports = function (app) {
    var ${name}Controller = app.controllers.${name};
    // add endpoint here
};
`;

	composer(dir, filePath, content);
}

module.exports = {
	createCMR,
	createController,
	createMiddleware,
	createModel,
	createRoute,
};
