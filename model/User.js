const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    phoneNumber: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    name: {
        type: String
    },
    username: {
        unique: true,
        type: String
    },
    dob: {
        type: String
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}