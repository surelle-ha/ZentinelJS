const mongoose = require("mongoose");
const ENV = require("./environments");

const connectDB = async () => {
	try {
		await mongoose.connect(ENV.MONGODB);
		console.log(`MongoDB connected`);
	} catch (err) {
		console.log(`Connection error`, err);
	}
};

module.exports = connectDB;
