const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	class Permission extends Model {}

	Permission.init(
		{
			name: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Permission",
			timestamps: true,
		}
	);

	Permission.associate = function (models) {
        Permission.belongsToMany(models.Role, {
            through: 'Role_Permission',
            as: 'Roles',
            foreignKey: 'permission_id',
            otherKey: 'role_id'
        });
    };

	return Permission;
};
