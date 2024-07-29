const multer = require("multer");

module.exports = (app) => {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, "storage/");
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname);
		},
	});
	app.store = multer({ storage });
};
