module.exports = function (app) {
	var RolePermissionController = app.controllers.Role_Permission;
	app.post("/api/v1/role/permissions", [], RolePermissionController.assignPermissionToRole);
	app.get("/api/v1/role/permissions/:role_id", [], RolePermissionController.getPermissionsByRole);
	app.delete("/api/v1/role/permissions", [], RolePermissionController.removePermissionFromRole);
};
