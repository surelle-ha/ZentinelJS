const fs = require("fs");
const path = require("path");

function loadControllers(app) {
	app.controllers = {};
	const controllersPath = path.join(__dirname, "controllers");
	fs.readdirSync(controllersPath).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			const controller = require(path.join(controllersPath, f))(app);
			app.controllers[controller.name] = controller;
		}
	});
}

function loadMiddlewares(app) {
	app.middlewares = {};
	const middlewaresPath = path.join(__dirname, "middlewares");
	fs.readdirSync(middlewaresPath).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			const middleware = require(path.join(middlewaresPath, f))(app);
			app.middlewares[middleware.name] = middleware;
		}
	});
}

function loadModels(app, sequelize) {
	app.models = app.models || {};
	const modelsPath = path.join(__dirname, "models");
	let modelFiles = [];

	fs.readdirSync(modelsPath).forEach(function (f) {
		const fullPath = path.join(modelsPath, f);
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

	Object.keys(app.models).forEach((modelName) => {
		if ("associate" in app.models[modelName]) {
			app.models[modelName].associate(app.models);
		}
	});

	Object.keys(app.models).forEach((modelName) => {
		console.log(
			`Model: ${modelName}, Associations: `,
			Object.keys(app.models[modelName].associations || {})
		);
	});
}

function loadRoutes(app) {
	const loadRoutesRecursively = (app, dir) => {
		fs.readdirSync(dir).forEach(function (file) {
			const fullPath = path.join(dir, file);
			if (fs.statSync(fullPath).isDirectory()) {
				loadRoutesRecursively(app, fullPath);
			} else if (file !== "__i.js" && path.extname(file) === ".js") {
				require(fullPath)(app);
			}
		});
	};

	loadRoutesRecursively(app, path.join(__dirname, "routes"));
}

function loadServices(app) {
	app.services = {};
	const servicesPath = path.join(__dirname, "services");
	fs.readdirSync(servicesPath).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			const service = require(path.join(servicesPath, f))(app);
			app.services[service.name] = service;
		}
	});
}

function loadUtilities(app) {
	app.utilities = {};
	const utilitiesPath = path.join(__dirname, "utilities");
	fs.readdirSync(utilitiesPath).forEach(function (f) {
		if (f !== "__i.js" && path.extname(f) === ".js") {
			const utility = require(path.join(utilitiesPath, f))(app);
			app.utilities[utility.name] = utility;
		}
	});
}

module.exports = function (app, sequelize) {
	loadUtilities(app);
	loadServices(app);
	loadModels(app, sequelize);
	loadMiddlewares(app);
	loadControllers(app);
	loadRoutes(app);
};
