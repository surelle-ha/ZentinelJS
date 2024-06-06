module.exports = function (app) {
    const Role = app.models.Role;
    var Controller = {
        name: "Role",
    };

    // Create a new role
    // POST @/api/roles
    Controller.createRole = function (req, res) {
        Role.create({
            name: req.body.name
        })
        .then(role => {
            res.status(201).send({ message: "Role created", role });
        })
        .catch(err => {
            res.status(500).send({ error: "Server Error", message: err.message });
        });
    };

    // Retrieve a single role by id
    // GET @/api/roles/:id
    Controller.getRole = function (req, res) {
        Role.findByPk(req.params.id)
            .then(role => {
                if (!role) {
                    return res.status(404).send({ message: "Role not found" });
                }
                res.status(200).send(role);
            })
            .catch(err => {
                res.status(500).send({ error: "Server Error", message: err.message });
            });
    };

    // Retrieve all roles
    // GET @/api/roles
    Controller.getAllRoles = function (req, res) {
        Role.findAll()
            .then(roles => {
                res.status(200).send(roles);
            })
            .catch(err => {
                res.status(500).send({ error: "Server Error", message: err.message });
            });
    };

    // Update a role
    // PATCH @/api/roles/:id
    Controller.updateRole = function (req, res) {
        Role.update({ name: req.body.name }, { 
            where: { id: req.params.id },
            returning: true,
            plain: true
        })
        .then(result => {
            const rowsUpdate = result[0];
            const updatedRole = result[1];

            if (rowsUpdate === 0) {
                return res.status(404).send({ message: "Role not found" });
            }

            res.status(200).send({ message: "Role updated", role: updatedRole });
        })
        .catch(err => {
            res.status(500).send({ error: "Server Error", message: err.message });
        });
    };

    // Delete a role
    // DELETE @/api/roles/:id
    Controller.deleteRole = function (req, res) {
        Role.destroy({ where: { id: req.params.id } })
            .then(deleted => {
                if (!deleted) {
                    return res.status(404).send({ message: "Role not found" });
                }
                res.status(200).send({ message: "Role deleted" });
            })
            .catch(err => {
                res.status(500).send({ error: "Server Error", message: err.message });
            });
    };

    // Delete all roles
    // DELETE @/api/roles
    Controller.deleteAllRoles = function (req, res) {
        Role.destroy({ where: {} })
            .then(() => {
                res.status(200).send({ message: "All roles deleted" });
            })
            .catch(err => {
                res.status(500).send({ error: "Server Error", message: err.message });
            });
    };

    return Controller;
};
