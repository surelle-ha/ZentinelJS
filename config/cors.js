/* Only modify this if you know what you're doing. */
let allowedOrigins = ["http://localhost:5500", "http://127.0.0.1:5500", "http://127.0.0.1:8080", "http://localhost:8080", "http://localhost:3000"];

const Options = {
	origin: function (origin, callback) {
		if (!origin) {
			return callback(null, true);
		}
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg =
				"The CORS policy for this site does not allow access from the specified Origin.";
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	},
};

module.exports = { Options };
