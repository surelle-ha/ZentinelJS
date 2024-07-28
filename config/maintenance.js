module.exports = (app) => {
	app.use((req, res, next) => {
		if (app.env.MAINTENANCE_MODE.toLowerCase() === "true") {
			if (req.headers["maintenance-key"] === app.env.MAINTENANCE_KEY) {
				return next();
			}
			return res.status(503).json({
				success: false,
				message:
					"The application is currently under maintenance. Please try again later.",
			});
		}
		next();
	});
};
