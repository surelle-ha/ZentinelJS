// middleware/authenticate.js
const jwt = require("jsonwebtoken");

module.exports = function (app) {
	const { User, Session } = app.models;
	var Middleware = {
		name: "Authenticate",
	};

	Middleware.authenticate = async (req, res, next) => {
		try {
			const token = req.headers.authorization?.split(" ")[1];
			if (!token) {
				return res
					.status(401)
					.json({ message: "Authentication Failed: No token provided." });
			}

			jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
				if (err) {
					console.error("JWT Verification Error:", err);
					return res
						.status(401)
						.json({
							message: "Authentication Failed: Invalid token.",
							err: err.message,
						});
				}

				const session = await Session.findOne({
					where: {
						token: token,
						userId: decoded.userId,
					},
				});

				if (!session) {
					return res.status(401).json({ message: "No valid session found." });
				}

				if (session.expiresAt < new Date()) {
					await Session.destroy({
						where: { token: token, userId: decoded.userId },
					});
					return res.status(401).json({ message: "Token expired." });
				}

				req.userId = decoded.userId;

				const user = await User.findOne({ where: { id: decoded.userId } });
				req.user = user;

				next();
			});
		} catch (error) {
			console.error("Authentication middleware error:", error);
			return res
				.status(500)
				.json({ message: "Server error during authentication." });
		}
	};

	return Middleware;
};
