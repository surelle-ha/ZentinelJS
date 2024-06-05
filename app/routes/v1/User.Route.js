module.exports = function (app) {
	var UserController = app.controllers.User;
	app.post("/api/v1/users", UserController.createUser);
	app.get("/api/v1/users", UserController.getAllUsers);
	app.get("/api/v1/users/:id", UserController.getUser);
	app.patch("/api/v1/users/:id", UserController.updateUser);
	app.delete("/api/v1/users", UserController.deleteAllUsers);
	app.delete("/api/v1/users/:id", UserController.deleteUser);
};
