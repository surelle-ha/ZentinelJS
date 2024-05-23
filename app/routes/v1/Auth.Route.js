module.exports = function (app) {
	var AuthController = app.controllers.Auth;
    var AuthenticateMiddleware = app.middlewares.Authenticate;
	app.post("/api/v1/auth/login", AuthController.loginUser);
	app.post("/api/v1/auth/register", AuthController.registerUser);
	app.post("/api/v1/auth/logout", AuthenticateMiddleware.authenticate, AuthController.logoutUser);
};
