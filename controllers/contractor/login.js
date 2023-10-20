const { StatusCodes } = require("http-status-codes");
const Contractor = require("../../models/contractor");
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require("../../errors");

/**
 * Logs in a contractor.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {BadRequestError} If email or password is missing.
 * @throws {NotFoundError} If no user with the provided email is found.
 * @throws {UnauthorizedError} If the provided password is incorrect.
 */
const loginContractor = async (req, res) => {
    // Retrieve the username, email, and password from the request body
    const { username, email, password } = req.body;

    // Check if either username or email and password are missing
    if ((!username && !email) || !password) {
        // Throw a BadRequestError if they are missing
        throw new BadRequestError(
            "Please provide username/email and password!"
        );
    }

    let contractor;
    // Find the contractor by either username or email
    if (username) {
        contractor = await Contractor.findOne({ username });
    } else {
        contractor = await Contractor.findOne({ email });
    }

    // Throw a NotFoundError if no contractor is found
    if (!contractor) {
        throw new NotFoundError(`No user with email ${email} / ${username}`);
    }

    // Check if the provided password is valid
    const isPasswordValid = await contractor.checkPassword(password);

    // Throw an UnauthorizedError if the password is incorrect
    if (!isPasswordValid) {
        throw new UnauthorizedError("Incorrect Password!");
    }

    // Create a JSON Web Token (JWT) for the contractor
    const token = contractor.createJWT();

    // Extract the necessary contractor information
    const contractorInfo = {
        username: contractor.username,
        name: contractor.name,
        email: contractor.email,
        phoneNumber: contractor.phoneNumber,
        address: contractor.address,
        kycVerified: contractor.kycVerified,
        score: contractor.score,
        level: contractor.level,
        collateralDeposited: contractor.collateralDeposited,
    };

    // Send a response with the contractor information and the token
    res.status(StatusCodes.OK).json({
        msg: `${contractor.username} logged in`,
        user: contractorInfo,
        token,
    });
};

module.exports = loginContractor;
