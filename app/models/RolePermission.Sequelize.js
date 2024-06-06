const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RolePermission extends Model {}
  RolePermission.init({
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Role_Permission',
  });

  return RolePermission;
};