module.exports = function (app) {
	const GuardedController = app.controllers.Guarded;
    const { Authenticate, SequelizeGuard } = app.middlewares;
	app.get("/api/v1/guarded/test", [Authenticate.authenticate, SequelizeGuard.authorize('basic-authorization')], GuardedController.protectedEndpoint);
};
