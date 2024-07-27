module.exports = function (app) {
	const { Authenticate, SequelizeGuard } = app.middlewares;
	const WebhookController = app.controllers.Webhook;
	app.post(
		"/webhook/ratelimit/reset",
		[Authenticate.authenticate],
		WebhookController.RatelimitReset
	);
};
