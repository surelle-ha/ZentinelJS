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
                    return res.status(401).json({ message: "Authentication Failed: Invalid token.", err: err.message });
                }

                // Find the session in the database
                const session = await Session.findOne({
                    where: {
                        token: token,
                        userId: decoded.userId
                    }
                });

                if (!session) {
                    return res.status(401).json({ message: "No valid session found." });
                }

                // Check if the session has expired
                if (session.expiresAt < new Date()) {
                    // If the session has expired, delete it from the database
                    await Session.destroy({
                        where: {
                            token: token,
                            userId: decoded.userId
                        }
                    });
                    return res.status(401).json({ message: "Token expired." });
                }

                // Set the user ID to req for subsequent middleware
                req.userId = decoded.userId;
                next();
            });
        } catch (error) {
            console.error("Authentication middleware error:", error);
            return res.status(500).json({ message: "Server error during authentication." });
        }
    };

    return Middleware;
};
