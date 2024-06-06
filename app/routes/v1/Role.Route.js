module.exports = function (app) {
	var RoleController = app.controllers.Role;
	app.post("/api/v1/roles", RoleController.createRole);
	app.get("/api/v1/roles", RoleController.getAllRoles);
	app.get("/api/v1/roles/:id", RoleController.getRole);
	app.patch("/api/v1/roles/:id", RoleController.updateRole);
	app.delete("/api/v1/roles", RoleController.deleteAllRoles);
	app.delete("/api/v1/roles/:id", RoleController.deleteRole);
};
