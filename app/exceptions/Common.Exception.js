module.exports = function (app) {
	class NotFoundError extends Error {
		constructor(message) {
			super(message);
			(this.success = false), (this.name = "NotFoundError");
			this.statusCode = 404;
		}
	}

	class ValidationError extends Error {
		constructor(message) {
			if (typeof message === "object") {
				message = JSON.stringify(message, null, 2);
			} else if (Array.isArray(message)) {
				message = message.join(", ");
			}

			super(message);
			this.success = false;
			this.name = "ValidationError";
			this.statusCode = 400;
		}
	}

	const Exception = {
		name: "Common",
		NotFoundError,
		ValidationError,
	};

	return Exception;
};
