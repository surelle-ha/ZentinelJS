module.exports = function (app) {
    const Role = app.models.Role;
    const Permission = app.models.Permission;
    const RolePermission = app.models.RolePermission;
    var Controller = {
        name: "RolePermission",
    };

    // Assign permission to a role
    // POST @/api/role-permissions
    Controller.assignPermissionToRole = function (req, res) {
        RolePermission.create({
            role_id: req.body.role_id,
            permission_id: req.body.permission_id
        })
        .then(rolePermission => {
            res.status(201).send({ message: "Permission assigned to role successfully", rolePermission });
        })
        .catch(err => {
            res.status(500).send({ error: "Server Error", message: err.message });
        });
    };

    // Retrieve all permissions for a role
    // GET @/api/role-permissions/:role_id
    Controller.getPermissionsByRole = function (req, res) {
        RolePermission.findAll({
            where: { role_id: req.params.role_id }, 
            include: [{
                model: Permission,
                as: 'permission', 
                required: true
            }]
        })
        .then(permissions => {
            if (permissions.length === 0) {
                return res.status(404).send({ message: "No permissions found for this role" });
            }
            res.status(200).send(permissions);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ error: "Server Error", message: err.message });
        });
    };

    // Delete a permission from a role
    // DELETE @/api/role-permissions
    Controller.removePermissionFromRole = function (req, res) {
        RolePermission.destroy({
            where: {
                role_id: req.body.role_id,
                permission_id: req.body.permission_id
            }
        })
        .then(deleted => {
            if (deleted === 0) {
                return res.status(404).send({ message: "Permission not found for this role or already removed" });
            }
            res.status(200).send({ message: "Permission removed from role successfully" });
        })
        .catch(err => {
            res.status(500).send({ error: "Server Error", message: err.message });
        });
    };

    return Controller;
};
