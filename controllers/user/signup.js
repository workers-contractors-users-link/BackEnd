const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const { BadRequestError } = require("../../errors");

const signUpUser = async (req, res) => {
    const { username, name, email, password, phoneNumber, address } = req.body;

    if (!username || !name || !email || !password || !phoneNumber || !address) {
        throw new BadRequestError("Please provide all required credentials.");
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
        throw new BadRequestError(
            "User with the same email or username already exists."
        );
    }

    const user = await User.create({ ...req.body });

    if (!user) {
        throw new InternalServerError("Unable to create a user.");
    }

    res.status(StatusCodes.OK).json({
        msg: `User, ${username} signed up`,
    });
};

module.exports = signUpUser;
