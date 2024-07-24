const cors = require("cors");

module.exports = (app) => {
	let allowedOrigins = ["http://localhost:8800"];

	const config = {
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
	
	const cors_supercharged = cors(config);
	app.use(cors_supercharged);
};
