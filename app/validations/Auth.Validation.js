const { body, validationResult } = require("express-validator");

module.exports = function (app) {
	const Validation = {
		name: "Auth",
	};

	const loginRules = [
		body("email")
			.isEmail()
			.withMessage("Invalid email address")
			.normalizeEmail(),
		body("password")
			.exists()
			.withMessage("Password is required")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long"),
	];
    
    const registerRules = [
        body("first_name")
            .exists()
            .withMessage("First Name is required")
			.isLength({ min: 2 })
			.withMessage("First Name must be at least 2 characters long"),
        body("middle_name")
            .exists()
            .withMessage("Middle Name is required")
			.isLength({ min: 2 })
			.withMessage("Middle Name must be at least 2 characters long"),
        body("last_name")
            .exists()
            .withMessage("Last Name is required")
			.isLength({ min: 2 })
			.withMessage("Last Name must be at least 2 characters long"),
        body("email")
            .isEmail()
            .withMessage("Invalid email address")
            .normalizeEmail(),
        body("password")
            .exists()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long")
    ];

    const handleValidationErrors = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', message: errors.array() });
        }
        next();
    };
    
    Validation.check = {
        login: [
            loginRules,
            handleValidationErrors
        ],
        register: [
            registerRules,
            handleValidationErrors
        ]
    };

	return Validation;
};
