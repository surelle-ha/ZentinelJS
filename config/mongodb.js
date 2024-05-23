const mongoose = require("mongoose");
const ENV = require("./environments");

const connectDB = async () => {
	try {
		await mongoose.connect(ENV.MONGODB);
		console.log(`[ARDEUS] MongoDB connected`);
	} catch (err) {
		console.log(`[ARDEUS] Connection error`, err);
	}
};

module.exports = connectDB;
