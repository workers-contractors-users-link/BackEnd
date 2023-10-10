const { StatusCodes } = require("http-status-codes");
const Contractor = require("../../models/contractor");
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require("../../errors");

const loginContractor = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password!");
    }

    const contractor = await Contractor.findOne({ email });

    if (!contractor) {
        throw new NotFoundError(`No user with email ${email}`);
    }

    const result = await contractor.checkPassword(password);

    if (!result) {
        throw new UnauthorizedError("Incorrect Password!");
    }

    const token = contractor.createJWT();

    res.status(StatusCodes.OK).json({
        msg: `${contractor.username} logged in`,
        user: {
            username: contractor.username,
            name: contractor.name,
            email: contractor.email,
            phoneNumber: contractor.phoneNumber,
            address: contractor.address,
            kycVerified: contractor.kycVerified,
            score: contractor.score,
            level: contractor.level,
        },
        token: token,
    });
};

module.exports = loginContractor;
