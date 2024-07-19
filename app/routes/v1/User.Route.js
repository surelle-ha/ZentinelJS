module.exports = function (app) {
	const { Authenticate, SequelizeGuard } = app.middlewares;
	var UserController = app.controllers.User;

	app.use("/api/v1/users", [Authenticate.authenticate]);

	app.post(
		"/api/v1/users",
		[SequelizeGuard.authorize("create-user")],
		UserController.createUser
	);
	app.get(
		"/api/v1/users",
		[SequelizeGuard.authorize("fetch-user")],
		UserController.getAllUsers
	);
	app.get(
		"/api/v1/users/:user_id",
		[SequelizeGuard.authorize("fetch-user")],
		UserController.getUser
	);
	app.patch(
		"/api/v1/users/:user_id",
		[SequelizeGuard.authorize("update-user")],
		UserController.updateUser
	);
	app.delete(
		"/api/v1/users",
		[SequelizeGuard.authorize("delete-user")],
		UserController.deleteAllUsers
	);
	app.delete(
		"/api/v1/users/:user_id",
		[SequelizeGuard.authorize("delete-user")],
		UserController.deleteUser
	);
};
