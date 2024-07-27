const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function (app) {
	const { User, Role } = app.models;
	const { NotFoundError } = app.exceptions.Common;
	const Controller = {
		name: "User",
	};

	// Create a new user
	// POST @/api/users
	Controller.createUser = (req, res) => {
		bcrypt.hash(req.body.password, saltRounds, async (err, hashedPassword) => {
			if (err) {
				return res
					.status(500)
					.send({ error: "Error hashing password", message: err.message });
			}
			User.create({
				...req.body,
				role_id: 1,
				email_verified: true,
				status: "Active",
				password: hashedPassword,
			})
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
	Controller.getUser = async (req, res) => {
		const user = await User.findByPk(req.params.user_id, {
			include: [
				{
					model: Role,
					as: "Role",
				},
			],
		});
		if (!user) {
			throw new NotFoundError("User not found");
		}
		const userData = user.get({ plain: true });
		userData.role = userData.Role;
		delete userData.Role;
		res.status(200).send(userData);
	};

	// Retrieve all users
	// GET @/api/users
	Controller.getAllUsers = async (req, res) => {
		const users = await User.findAll();
		res.status(200).send(users);
	};

	// Update a user
	// PATCH @/api/users/:id
	Controller.updateUser = (req, res) => {
		User.update(req.body, {
			where: { id: req.params.user_id },
			returning: true,
			plain: true,
		});
		res.status(200).send({ message: "User updated" });
	};

	// Delete a user
	// DELETE @/api/users/:id
	Controller.deleteUser = (req, res) => {
		User.destroy({ where: { id: req.params.user_id } });
		if (!deleted) {
			return res.status(404).send({ message: "User not found" });
		}
		res.status(200).send({ message: "User deleted" });
	};

	// Delete all users
	// DELETE @/api/users
	Controller.deleteAllUsers = function (req, res) {
		User.destroy({ where: {} });
		res.status(200).send({ message: "All users deleted" });
	};

	return Controller;
};
