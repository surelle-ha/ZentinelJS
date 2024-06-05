var mongoose = require("mongoose");

var Schema = mongoose.Schema;
module.exports = function () {
    var SessionSchema = new Schema(
        {
            userId: { type: String, required: true },
            token: { type: String, required: true },
            expiresAt: { type: Date, required: true }
        },
        { timestamps: true }
    );
    return mongoose.model("Session", SessionSchema);
};
