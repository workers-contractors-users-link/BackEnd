const { StatusCodes } = require("http-status-codes");
const Contractor = require("../../models/contractor");
const { BadRequestError } = require("../../errors");

/**
 * Sign up a contractor.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the signup is complete.
 * @throws {BadRequestError} - If any required credentials are missing.
 * @throws {BadRequestError} - If a user with the same email or username already exists.
 * @throws {InternalServerError} - If unable to create a user.
 */
const signUpContractor = async (req, res) => {
    // Extracting required data from the request body
    const {
        username,
        name,
        email,
        password,
        phoneNumber,
        address,
        ethAddress,
    } = req.body;

    // Checking if all required credentials are provided
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

    // Checking if a user with the same email or username already exists
    const existingContractor = await Contractor.findOne({
        $or: [{ email }, { username }],
    });

    if (existingContractor) {
        throw new BadRequestError(
            "User with the same email or username already exists."
        );
    }

    // Creating a new contractor
    const contractor = await Contractor.create({ ...req.body });

    if (!contractor) {
        throw new InternalServerError("Unable to create a user.");
    }

    // Sending success response
    res.status(StatusCodes.OK).json({
        msg: `Contractor, ${username} signed up`,
    });
};

module.exports = signUpContractor;
