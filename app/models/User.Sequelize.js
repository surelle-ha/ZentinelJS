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
			status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Roles",
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			timestamps: true,
			defaultScope: {
				attributes: { exclude: ['password'] }, 
			},
			scopes: {
				withPassword: {
					attributes: { include: ['password'] },
				}
			},
		}
	);

	User.associate = function (models) {
		User.belongsTo(models.Role, {
			foreignKey: "role_id",
			as: "Role",
		});
	};

	return User;
};
