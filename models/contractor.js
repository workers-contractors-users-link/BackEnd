const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const ContractorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Please provide Legal Name"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email",
        ],
        unique: true,
    },
    phoneNumber: {
        type: Number,
        requried: [true, "Contact number must be provided"],
        match: [
            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
            "Enter valid Phone Number",
        ],
    },
    address: {
        type: String,
        requried: [true, "Please provide address"],
        trim: true,
    },
    kycVerified: {
        type: Boolean,
        default: false,
    },
    score: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 1,
        max: 5,
    },
});

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.createJWT(function () {
    return jwt.sign(
        { userId: this._id, username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );
});

UserSchema.methods.checkPassword(async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
});

module.exports = mongoose.model("Contractor", ContractorSchema);
