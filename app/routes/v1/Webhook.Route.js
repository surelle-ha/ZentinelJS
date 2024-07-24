module.exports = function (app) {
	const AuthenticateMiddleware = app.middlewares.Authenticate;
	var WebhookController = app.controllers.Webhook;
	app.post(
		"/webhook/ratelimit/reset",
		[AuthenticateMiddleware.authenticate],
		WebhookController.RatelimitReset
	);
};
