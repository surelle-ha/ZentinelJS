const bcrypt = require('bcrypt');
const { Keypair } = require('@solana/web3.js');
const saltRounds = 10;

module.exports = function (app) {
    var User = app.models.User;
    var Controller = {
        name: "User",
    };

    // Create a new user
    // @/api/users/create
    Controller.createUser = function (req, res) {
        bcrypt.hash(req.body.password, saltRounds, function(err, hashedPassword) {
            if (err) {
                return res.status(500).send({ error: "Error hashing password", message: err.message });
            }
            
            const wallet = Keypair.generate();
            const publicKey = wallet.publicKey.toString();
            const secretKey = [...wallet.secretKey]; 

            const userData = {
                ...req.body,
                role: 'USER',
                email_verified: true,
                issuer_verified: true,
                investor_verified: true,
                tester_verified: true,
                status: 'Active',
                password: hashedPassword,
                public_key: publicKey,
                secret_key: secretKey
            };
            User.create(userData)
                .then((result) => {
                    res.status(201).send({ message: "Account created", userDate: result });
                })
                .catch((err) => {
                    res.status(500).send({ error: "Server Error", message: err.message });
                });
        });
    };

    // Retrieve a single user by id
    // @/api/users/fetch/:id
    Controller.getUser = function (req, res) {
        User.findById(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ message: "User not found" });
                }
                res.status(200).send(user);
            })
            .catch((err) => {
                res.status(500).send({ error: "Server Error", message: err.message });
            });
    };

    // Retrieve all users
    // @/api/users/fetch/all
    Controller.getAllUsers = function (req, res) {
        User.find()
            .then((users) => {
                res.status(200).send(users);
            })
            .catch((err) => {
                res.status(500).send({ error: "Server Error", message: err.message });
            });
    };

    // Update a user
    // @/api/users/update/:id
    Controller.updateUser = function (req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ message: "User not found" });
                }
                res.status(200).send({ message: "User updated", user: user });
            })
            .catch((err) => {
                res.status(500).send({ error: "Server Error", message: err.message });
            });
    };

    // Delete a user
    // @/api/users/delete/:id
    Controller.deleteUser = function (req, res) {
        User.deleteOne({ _id: req.params.id })
            .then((result) => {
                if (result.deletedCount === 0) {
                    return res.status(404).send({ message: "User not found" });
                }
                res.status(200).send({ message: "User deleted" });
            })
            .catch((err) => {
                res.status(500).send({ error: "Server Error", message: err.message });
            });
    };    

    // Delete all users
    // @/api/users/delete/all
    Controller.deleteAllUsers = function (req, res) {
        User.deleteMany({})
            .then(() => {
                res.status(200).send({ message: "All users deleted" });
            })
            .catch((err) => {
                res.status(500).send({ error: "Server Error", message: err.message });
            });
    };

    return Controller;
};
