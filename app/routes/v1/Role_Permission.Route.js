module.exports = function (app) {
	const { Role_Permission } = app.controllers;
	const { Authenticate, SequelizeGuard } = app.middlewares;
	app.post(
		"/api/v1/role/permissions",
		[Authenticate.authenticate],
		Role_Permission.assignPermissionToRole
	);
	app.get(
		"/api/v1/role/permissions/:role_id",
		[Authenticate.authenticate],
		Role_Permission.getPermissionsByRole
	);
	app.delete(
		"/api/v1/role/permissions",
		[Authenticate.authenticate],
		Role_Permission.removePermissionFromRole
	);
};
