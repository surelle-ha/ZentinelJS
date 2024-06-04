const mongoose = require("mongoose");
const ENV = require("./environments");

const connectDB = async () => {
	try {
		await mongoose.connect(ENV.MONGODB);
		console.log(`[NOSQL] MongoDB Connected`);
	} catch (err) {
		console.log(`[NOSQL] MongoDB Connection Error`, err);
	}
};

module.exports = { connectDB };
