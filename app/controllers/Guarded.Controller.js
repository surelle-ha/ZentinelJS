module.exports = function (app) {
	var Controller = {
		name: "Guarded",
	};

	// Test Protected Route
	// @/api/auth/register
	Controller.protectedEndpoint = async (req, res) => {
		return res.status(200).json({ message: "Protected" });
	};

	return Controller;
};
