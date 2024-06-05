const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Permission extends Model {}

  Permission.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
  }, {
      sequelize,
      modelName: 'Permission',
  });

  Permission.associate = function(models) {
      Permission.belongsToMany(models.Role, { through: 'Role_Permissions' });
  };

  return Permission;
};