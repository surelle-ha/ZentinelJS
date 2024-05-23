const jwt = require("jsonwebtoken");

module.exports = function (app) {
	var Session = app.models.Session;
	var Middleware = {
		name: "Authenticate",
	};

	Middleware.authenticate = async (req, res, next) => {
		try {
			const token = req.headers.authorization?.split(" ")[1];
			if (!token) {
				return res.status(401).json({ message: "No token provided" });
			}

			jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
				if (err) {
					if (err.name === "TokenExpiredError") {
						return res.status(401).json({ message: "Token expired" });
					}
					return res.status(401).json({ message: "Authentication failed" });
				}

				// Check if the token exists in the database
				const session = await Session.findOne({
					userId: decoded.userId,
					token: token,
				});
				if (!session) {
					return res.status(401).json({ message: "No valid session found" });
				}

				// Check if the session has expired based on the database, even if the JWT has not expired
				if (session.expiresAt < new Date()) {
					return res.status(401).json({ message: "Session has expired" });
				}

				req.userData = decoded;
				next();
			});
		} catch (error) {
			return res.status(401).json({ message: error });
		}
	};

  
  return Middleware;
};

