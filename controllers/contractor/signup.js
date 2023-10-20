const { StatusCodes } = require("http-status-codes");
const Contractor = require("../../models/contractor");
const { BadRequestError } = require("../../errors");

const signUpContractor = async (req, res) => {
    const {
        username,
        name,
        email,
        password,
        phoneNumber,
        address,
        ethAddress,
    } = req.body;

    if (
        !username ||
        !name ||
        !email ||
        !password ||
        !phoneNumber ||
        !address ||
        !ethAddress
    ) {
        throw new BadRequestError("Please provide all required credentials.");
    }

    const existingContractor = await Contractor.findOne({
        $or: [{ email }, { username }],
    });

    if (existingContractor) {
        throw new BadRequestError(
            "User with the same email or username already exists."
        );
    }

    const contractor = await Contractor.create({ ...req.body });

    if (!contractor) {
        throw new InternalServerError("Unable to create a user.");
    }

    res.status(StatusCodes.OK).json({
        msg: `Contractor, ${username} signed up`,
    });
};

module.exports = signUpContractor;
