const cors = require("cors");

/* Only modify this if you know what you're doing. */
let allowedOrigins = [
	"http://localhost:8800"
];

const cors_options = {
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

module.exports = { cors, cors_options };
