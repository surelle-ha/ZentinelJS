module.exports = function (app) {
    const { Role, Permission, Role_Permission } = app.models;
    const Controller = {
        name: "Role_Permission",
    };

    // Assign permission to a role
    // POST @/api/role/permissions
    Controller.assignPermissionToRole = async function (req, res) {
        try {
            const role = await Role.findByPk(req.body.role_id);
            const permission = await Permission.findByPk(req.body.permission_id);
    
            if (!role) {
                return res.status(404).send({ message: "Role not found" });
            }
            if (!permission) {
                return res.status(404).send({ message: "Permission not found" });
            }
    
            const rolePermission = await Role_Permission.create({
                role_id: req.body.role_id,
                permission_id: req.body.permission_id
            });
    
            res.status(201).send({
                message: "Permission assigned to role successfully",
                rolePermission
            });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Server Error", message: err.message });
        }
    };
    

    // Retrieve all permissions for a role
    // GET @/api/role/permissions/:role_id
    Controller.getPermissionsByRole = function (req, res) {
        const roleId = req.params.role_id; 

        Role.findByPk(roleId, {
            include: [{
                model: Permission,
                as: 'Permissions',  
                through: {
                    attributes: []  
                }
            }]
        })
        .then(role => {
            if (!role) {
                return res.status(404).send({ message: "Role not found" });  
            }
            res.status(200).send({
                roleId: role.id,
                roleName: role.name,
                permissions: role.Permissions 
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ error: "Server Error", message: err.message });  
        });
    }

    // Delete a permission from a role
    // DELETE @/api/role/permissions
    Controller.removePermissionFromRole = function (req, res) {
        Role_Permission.destroy({
            where: {
                role_id: req.body.role_id,
                permission_id: req.body.permission_id
            }
        })
        .then(deleted => {
            if (deleted === 0) {
                return res.status(404).send({
                    message: "Permission not found for this role or already removed"
                });
            }
            res.status(200).send({
                message: "Permission removed from role successfully"
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ error: "Server Error", message: err.message });
        });
    };

    return Controller;
};
