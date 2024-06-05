const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RolePermission extends Model {}
  RolePermission.init({
    roleId: DataTypes.INTEGER,
    permissionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Role_Permission',
  });

  return RolePermission;
};