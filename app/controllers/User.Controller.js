const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function (app) {
	const { User, Role } = app.models;
	var Controller = {
		name: "User",
	};

	// Create a new user
	// POST @/api/users
	Controller.createUser = function (req, res) {
		bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
			if (err) {
				return res
					.status(500)
					.send({ error: "Error hashing password", message: err.message });
			}

			const userData = {
				...req.body,
				role_id: 1,
				email_verified: true,
				status: "Active",
				password: hashedPassword,
			};
			User.create(userData)
				.then((result) => {
					res
						.status(201)
						.send({ message: "Account created", userData: result });
				})
				.catch((err) => {
					res.status(500).send({ error: "Server Error", message: err.message });
				});
		});
	};

	// Retrieve a single user by id
	// GET @/api/users/:id
	Controller.getUser = function (req, res) {
		User.findByPk(req.params.user_id, {
			include: [
				{
					model: Role,
					as: "Role",
				},
			],
		})
			.then((user) => {
				if (!user) {
					return res.status(404).send({ message: "User not found" });
				}
				const userData = user.get({ plain: true });
				userData.role = userData.Role;
				delete userData.Role;
				res.status(200).send(userData);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send({ error: "Server Error", message: err.message });
			});
	};

	// Retrieve all users
	// GET @/api/users
	Controller.getAllUsers = function (req, res) {
		User.findAll()
			.then((users) => {
				res.status(200).send(users);
			})
			.catch((err) => {
				res.status(500).send({ error: "Server Error", message: err.message });
			});
	};

	// Update a user
	// PATCH @/api/users/:id
	Controller.updateUser = function (req, res) {
		User.update(req.body, {
			where: { id: req.params.user_id },
			returning: true,
			plain: true,
		})
			.then((result) => {
				const rowsUpdate = result[0];
				const updatedUser = result[1];

				if (rowsUpdate === 0) {
					return res.status(404).send({ message: "User not found" });
				}

				res.status(200).send({ message: "User updated", user: updatedUser });
			})
			.catch((err) => {
				res.status(500).send({ error: "Server Error", message: err.message });
			});
	};

	// Delete a user
	// DELETE @/api/users/:id
	Controller.deleteUser = function (req, res) {
		User.destroy({ where: { id: req.params.user_id } })
			.then((deleted) => {
				if (!deleted) {
					return res.status(404).send({ message: "User not found" });
				}
				res.status(200).send({ message: "User deleted" });
			})
			.catch((err) => {
				res.status(500).send({ error: "Server Error", message: err.message });
			});
	};

	// Delete all users
	// DELETE @/api/users
	Controller.deleteAllUsers = function (req, res) {
		User.destroy({ where: {} })
			.then(() => {
				res.status(200).send({ message: "All users deleted" });
			})
			.catch((err) => {
				res.status(500).send({ error: "Server Error", message: err.message });
			});
	};

	return Controller;
};
