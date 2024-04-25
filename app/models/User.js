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
		},
		{ timestamps: true }
	);
	return mongoose.model("User", UserSchema);
};
