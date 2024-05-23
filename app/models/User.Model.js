var mongoose = require("mongoose");

var Schema = mongoose.Schema;
module.exports = function () {
	var UserSchema = new Schema(
		{
			first_name: {
				type: String,
				required: true,
			},
			middle_name: {
				type: String,
				required: true,
			},
			last_name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
				unique: true,
			},
			password: {
				type: String,
				required: true,
			},
			role: {
				type: String,
				required: true,
			},
			email_verified: {
				type: Boolean,
				required: true,
			},
			issuer_verified: {
				type: Boolean,
				required: true,
			},
			investor_verified: {
				type: Boolean,
				required: true,
			},
			tester_verified: {
				type: Boolean,
				required: true,
			},
			status: {
				type: String,
				required: true,
			},
			public_key: {
				type: String,
				required: true,
			},
			secret_key: {
				type: Object,
				required: true,
			}
		},
		{ timestamps: true }
	);
	return mongoose.model("User", UserSchema);
};
