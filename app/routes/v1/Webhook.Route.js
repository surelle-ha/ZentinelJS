module.exports = function (app) {
	var WebhookController = app.controllers.Webhook;
	app.post("/webhook/ratelimit/reset", [], WebhookController.ratelimit_reset);
};
