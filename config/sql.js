const { Sequelize } = require("sequelize");
const ENV = require("./environments");

const sequelize = new Sequelize(ENV.DATABASE_NAME, ENV.DATABASE_USER, ENV.DATABASE_PASS, {
	host: ENV.DATABASE_HOST,
	port: ENV.DATABASE_PORT,
	dialect: ENV.DATABASE_TYPE,
	logging: false
});

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log(`[SQL] MySQL Connected`);
	} catch (error) {
		console.error(`[SQL] MySQL Connection Error`, error);
	}
};

module.exports = { connectDB, sequelize };
