module.exports = function (app) {
	var UserController = app.controllers.User;
	app.post("/api/v1/users/create", UserController.createUser);
	app.post("/api/v1/users/fetch/all", UserController.getAllUsers);
	app.post("/api/v1/users/fetch/:id", UserController.getUser);
	app.post("/api/v1/users/update/:id", UserController.updateUser);
	app.post("/api/v1/users/delete/all", UserController.deleteAllUsers);
	app.post("/api/v1/users/delete/:id", UserController.deleteUser);
};
