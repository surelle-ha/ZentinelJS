const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
	class User extends Model {}

	User.init(
		{
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			middle_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email_verified: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			issuer_verified: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			investor_verified: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			tester_verified: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			public_key: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			secret_key: {
				type: DataTypes.JSON,
				allowNull: false,
			},
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Roles', // 'Roles' refers to the table name
                    key: 'id',
                },
            },
		},
		{
			sequelize,
			modelName: "User",
			timestamps: true,
		}
	);

	return User;
};
