const fs = require("fs");
const path = require("path");
const asyncHandler = require('express-async-handler')

const http = path.join(__dirname, "../app")

const bootControllers = (app) => {
    app.controllers = {};
    const controllersPath = path.join(http, "controllers");
    fs.readdirSync(controllersPath).forEach((file) => {
        if (file !== "__i.js" && path.extname(file) === ".js") {
            const controller = require(path.join(controllersPath, file))(app);
            for (const [methodName, method] of Object.entries(controller)) {
                if (typeof method === 'function' && method.constructor.name === 'AsyncFunction') {
                    controller[methodName] = asyncHandler(method);
                }
            }
            app.controllers[controller.name] = controller;
        }
    });
};

const bootMiddlewares = (app) => {
	app.middlewares = {};
	const middlewaresPath = path.join(http, "middlewares");
	fs.readdirSync(middlewaresPath).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			const middleware = require(path.join(middlewaresPath, f))(app);
			app.middlewares[middleware.name] = middleware;		
		}
	});
}

const bootModels = (app) => {
	app.models = app.models || {};
	const modelsPath = path.join(http, "models");
	let modelFiles = [];

	fs.readdirSync(modelsPath).forEach(function (f) {
		const fullPath = path.join(modelsPath, f);
		if (f !== "__i.js" && path.extname(f) === ".js") {
			modelFiles.push(fullPath);
		}
	});

	modelFiles.forEach(function (fullPath) {
		if (fullPath.endsWith(".Sequelize.js")) {
			const model = require(fullPath)(app.sequelize);
			app.models[model.name] = model;
		} else if (fullPath.endsWith(".Model.js")) {
			const model = require(fullPath)(app.sequelize);
			app.models[model.name] = model;
		}
	});

	Object.keys(app.models).forEach((modelName) => {
		if ("associate" in app.models[modelName]) {
			app.models[modelName].associate(app.models);
		}
	});

	// Object.keys(app.models).forEach((modelName) => {
	// 	console.log(
	// 		`Model: ${modelName}, Associations: `,
	// 		Object.keys(app.models[modelName].associations || {})
	// 	);
	// });
}

const bootRoutes = (app) => {
	const bootRoutesRecursively = (app, dir) => {
		fs.readdirSync(dir).forEach(function (file) {
			const fullPath = path.join(dir, file);
			if (fs.statSync(fullPath).isDirectory()) {
				bootRoutesRecursively(app, fullPath);
			} else if (file !== "__i.js" && path.extname(file) === ".js") {
				require(fullPath)(app);
			}
		});
	};

	bootRoutesRecursively(app, path.join(http, "routes"));
}

const bootServices = (app) => {
	app.services = {};
	const servicesPath = path.join(http, "services");
	fs.readdirSync(servicesPath).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			const service = require(path.join(servicesPath, f))(app);
			app.services[service.name] = service;
		}
	});
}

const bootUtilities = (app) => {
	app.utilities = {};
	const utilitiesPath = path.join(http, "utilities");
	fs.readdirSync(utilitiesPath).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			const utility = require(path.join(utilitiesPath, f))(app);
			app.utilities[utility.name] = utility;
		}
	});
}

const bootValidations = (app) => {
	app.validations = {};
	const validationsPath = path.join(http, "validations");
	fs.readdirSync(validationsPath).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			const validation = require(path.join(validationsPath, f))(app);
			app.validations[validation.name] = validation;
		}
	});
}

const bootExceptions = (app) => {
	app.exceptions = {};
	const exceptionsPath = path.join(http, "exceptions");
	fs.readdirSync(exceptionsPath).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			const exception = require(path.join(exceptionsPath, f))(app);
			app.exceptions[exception.name] = exception;
		}
	});
}

const bootstrap = (app) => {
	bootExceptions(app);
	bootUtilities(app);
	bootServices(app);
	bootValidations(app);
	bootModels(app);
	bootMiddlewares(app);
	bootControllers(app);
	bootRoutes(app);
}

module.exports = bootstrap;
