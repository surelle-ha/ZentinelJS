// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

module.exports = function (app) {
	const { User, Session } = app.models;

	const Controller = {
		name: "Auth",

		loginUser: async (req, res) => {
			try {
				const { email, password } = req.body;
				const user = await User.unscoped().findOne({ where: { email } });
				if (!user) {
					return res.status(401).json({ status: "error", message: "Invalid Email or Password" });
				}

				const isPasswordValid = await bcrypt.compare(password, user.password);
				if (!isPasswordValid) {
					return res.status(401).json({ status: "error", message: "Invalid Email or Password" });
				}

				const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

				await Session.destroy({ where: { userId: user.id } });

				const newSession = await Session.create({
					userId: user.id,
					token,
					expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
				});

				return res.status(200).json({
					status: "success",
					message: "Successfully Authenticated.",
					userData: { user, token },
				});
			} catch (error) {
				console.error(error);
				return res.status(500).send({ status: "error", message: error.message });
			}
		},

		registerUser: async (req, res) => {
			try {
				// const errors = validationResult(req);
				// if (!errors.isEmpty()) {
				// 	return res.status(400).json({ status: "error", message: errors.array() });
				// }

				const existingUser = await User.findOne({ where: { email: req.body.email } });
				if (existingUser) {
					return res.status(400).send({ status: "error", message: "Email already registered" });
				}

				bcrypt.hash(req.body.password, saltRounds, async function (err, hashedPassword) {
					if (err) {
						return res.status(500).send({ status: "error", message: "Error hashing password", message: err.message });
					}

					const userData = {
						...req.body,
						role_id: 1,
						email_verified: true,
						status: "Active",
						password: hashedPassword,
					};
					const result = await User.create(userData);
					res.status(201).send({ status: "success", message: "Successfully registered your account.", userData: result });
				});
			} catch (err) {
				console.error(error);
				return res.status(500).send({ status: "error", message: error.message });
			}
		},

		logoutUser: async (req, res) => {
			try {
				const token = req.headers.authorization.split(" ")[1];
				const session = await Session.findOne({ where: { token } });
				if (session) {
					await Session.destroy({ where: { id: session.id } });
					res.status(200).send({ message: "Logged out successfully" });
				} else {
					res.status(404).send({ message: "Session not found" });
				}
			} catch (error) {
				console.error(error);
				res.status(500).send({ message: "Server error", error: error.message });
			}
		},
	};

	return Controller;
};
