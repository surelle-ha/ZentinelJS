module.exports = function (app) {
	const AuthController = app.controllers.Auth;
	const AuthenticateMiddleware = app.middlewares.Authenticate;
	const AuthValidation = app.validations.Auth;
	
	app.post(
		"/api/v1/auth/login",
		[AuthValidation.check.login],
		AuthController.loginUser
	);
	app.post(
		"/api/v1/auth/register",
		[AuthValidation.check.register],
		AuthController.registerUser
	);
	app.post(
		"/api/v1/auth/logout",
		[AuthenticateMiddleware.authenticate],
		AuthController.logoutUser
	);
};
