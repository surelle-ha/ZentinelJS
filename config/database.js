const { Sequelize } = require("sequelize");

module.exports = async (app) => {
	app.sequelize = new Sequelize(
		app.env.DATABASE_NAME,
		app.env.DATABASE_USER,
		app.env.DATABASE_PASS,
		{
			host: app.env.DATABASE_HOST,
			port: app.env.DATABASE_PORT,
			dialect: app.env.DATABASE_TYPE,
			logging: false,
		}
	);
	try {
		await app.sequelize.authenticate();
		console.log(`[SQL] MySQL Connected`);
	} catch (error) {
		console.error(`[SQL] MySQL Connection Error`, error);
	}
};
