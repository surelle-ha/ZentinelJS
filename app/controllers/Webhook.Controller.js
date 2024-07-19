module.exports = function (app) {
	var Controller = {
		name: "Webhook",
	};

	// Reset Rate Limit
	// @/webhook/ratelimit/reset
	Controller.ratelimit_reset = async (req, res) => {
		app.config.RateLimit.resetKey(req.ip);
		res.json({ message: "Rate limit is reset!" });
	};

	return Controller;
};
