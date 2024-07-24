module.exports = function (app) {
	var Controller = {
		name: "Webhook",
	};

	// Reset Rate Limit
	// @/webhook/ratelimit/reset
	Controller.RatelimitReset = async (req, res) => {
		app.resetKey(req.ip);
		res.json({ status: "success", message: "Rate limit is reset!", request_by: req.user.id });
	};
	
	return Controller;
};
