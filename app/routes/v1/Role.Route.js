module.exports = function (app) {
	const { Role } = app.controllers;
	const { Authenticate, SequelizeGuard } = app.middlewares;
	app.post("/api/v1/roles", [Authenticate.authenticate], Role.createRole);
	app.get("/api/v1/roles", [Authenticate.authenticate], Role.getAllRoles);
	app.get("/api/v1/roles/:role_id", [Authenticate.authenticate], Role.getRole);
	app.patch("/api/v1/roles/:role_id", [Authenticate.authenticate], Role.updateRole);
	app.delete("/api/v1/roles", [Authenticate.authenticate], Role.deleteAllRoles);
	app.delete("/api/v1/roles/:role_id", [Authenticate.authenticate], Role.deleteRole);
};
