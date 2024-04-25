module.exports = function (app) {
	var UserController = app.controllers.User;
	app.post("/api/users/create", UserController.createUser);
	app.post("/api/users/fetch/all", UserController.getAllUsers);
	app.post("/api/users/fetch/:id", UserController.getUser);
	app.post("/api/users/update/:id", UserController.updateUser);
	app.post("/api/users/delete/all", UserController.deleteAllUsers);
	app.post("/api/users/delete/:id", UserController.deleteUser);
};
