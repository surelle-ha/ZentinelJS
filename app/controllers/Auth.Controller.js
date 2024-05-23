const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { Keypair } = require('@solana/web3.js');

const saltRounds = 10;

module.exports = function (app) {
    const User = app.models.User; 
    const Session = app.models.Session;

    const Controller = {
        name: "Auth",

        // Authenticate User
        // @/api/auth/login
        loginUser: async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(
                      { 
                        status: 'error', 
                        message: errors.array(), 
                      }
                    );
                }

                const { email, password } = req.body;
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(401).json(
                      { 
                        status: 'error', 
                        message: "Invalid Email or Password" 
                      }
                    );
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json(
                      { 
                        status: 'error', 
                        message: "Invalid Email or Password"
                      }
                    );
                }

                const token = jwt.sign(
                    { userId: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                await Session.deleteMany({ userId: user._id });

                const newSession = new Session({
                    userId: user._id,
                    token,
                    expiresAt: new Date(Date.now() + 3600000) // 1 hour from now
                });
                await newSession.save();

                return res.status(200).json(
                  { 
                    status: 'success', 
                    message: "Successfully Authenticated.", 
                    userData: { user, token }  
                  }
                );
            } catch (error) {
                console.error(error);
                return res.status(500).send(
                  { 
                    status: "error",
                    message: error.message 
                  }
                );
            }
        },

        // Register User
        // @/api/auth/register
        registerUser: (req, res) => {
            User.findOne({ where: { email: req.body.email } })  // Check if email already exists
              .then(existingUser => {
                if (existingUser) {
                  return res.status(400).send(
                    { 
							        status: 'error', 
                      message: "Email already registered"
                    }
                  );  
                }
          
                bcrypt.hash(req.body.password, saltRounds, function(err, hashedPassword) {
                  if (err) {
                    return res.status(500).send(
                      { 
                        status: 'error', 
                        message: "Error hashing password", message: err.message 
                      }
                    );
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
                      res.status(201).send(
                        { 
                          status: 'success', 
                          message: "Successfully registered your account.", 
                          userData: result 
                        }
                      );
                    })
                    .catch((err) => {
                      res.status(201).send(
                        { 
                          status: 'error',
                          message: "User already exist." 
                        }
                      );
                    });
                });
              })
              .catch(err => {
                res.status(500).send({ error: "Database Error", message: err.message });
              });
          },          

        // Logout User
        // @/api/auth/logout
        logoutUser: async (req, res) => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const session = await Session.findOne({ token });
                if (session) {
                    await Session.deleteOne({ _id: session._id });
                    res.status(200).send({ message: "Logged out successfully" });
                } else {
                    res.status(404).send({ message: "Session not found" });
                }
            } catch (error) {
                console.error(error);
                res.status(500).send({ message: "Server error", error: error.message });
            }
        }

    };

    return Controller;
};
