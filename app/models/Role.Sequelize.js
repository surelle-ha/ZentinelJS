const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Role extends Model {}

  Role.init({
      name: DataTypes.STRING,
  }, {
      sequelize,
      modelName: 'Role',
  });

  Role.associate = function(models) {
      Role.hasMany(models.User, { foreignKey: 'role_id' });
      Role.belongsToMany(models.Permission, { through: 'Role_Permissions' });
  };

  return Role;
};