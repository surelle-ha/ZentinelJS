const jwt = require("jsonwebtoken");

module.exports = function (app) {
    const Session = app.models.Session;
    var Middleware = {
        name: "Authenticate",
    };

    Middleware.authenticate = async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Authentication Failed: No token provided." });
            }

            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        return res.status(401).json({ message: "Token expired." });
                    }
                    return res.status(401).json({ message: "Authentication Failed: Invalid token." });
                }

                // Check if the token exists in the database and has not expired
                const session = await Session.findOne({
                    where: {
                        token: token, // Ensuring the token matches
                        userId: decoded.userId // Ensuring the user ID decoded from the token matches
                    }
                });

                if (!session) {
                    return res.status(401).json({ message: "No valid session found." });
                }

                // Check if the session has expired based on the database, even if the JWT has not expired
                if (session.expiresAt < new Date()) {
                    return res.status(401).json({ message: "Session has expired." });
                }

                req.userData = decoded; // Attach user data to the request for use in next middleware or endpoint
                next();
            });
        } catch (error) {
            console.error("Authentication middleware error:", error);
            return res.status(500).json({ message: "Server error during authentication." });
        }
    };

    return Middleware;
};
