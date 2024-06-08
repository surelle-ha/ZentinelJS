const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    
	class Session extends Model {}

	Session.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			token: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			expiresAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Session",
			timestamps: true,
		}
	);

	return Session;
};
