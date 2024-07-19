const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	class Role_Permission extends Model {}

	Role_Permission.init(
		{
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Roles",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			permission_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Permissions",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		},
		{
			sequelize,
			modelName: "Role_Permission",
			tableName: "Role_Permissions",
			timestamps: true,
		}
	);

	Role_Permission.associate = function (models) {
		this.belongsTo(models.Role, { foreignKey: "role_id", as: "Role" });
		this.belongsTo(models.Permission, {
			foreignKey: "permission_id",
			as: "Permission",
		});
	};

	return Role_Permission;
};
