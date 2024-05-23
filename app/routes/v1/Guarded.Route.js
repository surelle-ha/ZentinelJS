module.exports = function (app) {
	var GuardedController = app.controllers.Guarded;
    var AuthenticateMiddleware = app.middlewares.Authenticate;
	app.get("/api/v1/guarded/test", AuthenticateMiddleware.authenticate, GuardedController.protectedEndpoint);
};
