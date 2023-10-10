const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require("../../errors");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password!");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError(`No user with email ${email}`);
    }

    const result = await user.checkPassword(password);

    if (!result) {
        throw new UnauthorizedError("Incorrect Password!");
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        msg: `${user.username} logged in`,
        user: {
            username:user.username,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            kycVerified: user.kycVerified,
        },
        token: token,
    });
};

module.exports = loginUser;
