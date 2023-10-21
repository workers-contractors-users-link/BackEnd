const { StatusCodes } = require("http-status-codes");
const Client = require("../../models/client");
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require("../../errors");

/**
 * Logs in a client.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {BadRequestError} - If username or email and password are not provided.
 * @throws {NotFoundError} - If no client is found with the provided email.
 * @throws {UnauthorizedError} - If the password is incorrect.
 */
const loginClient = async (req, res) => {
    // Destructure the username, email, and password from the request body
    const { username, email, password } = req.body;

    // Check if either username or email and password are not provided
    if ((!username && !email) || !password) {
        throw new BadRequestError(
            "Please provide email/username and password!"
        );
    }

    let client;
    // Find the client by email if provided, otherwise find by username
    if (email) {
        client = await Client.findOne({ email });
    } else {
        client = await Client.findOne({ username });
    }

    // If no client is found with the provided email, throw a NotFoundError
    if (!client) {
        throw new NotFoundError(`No client with email ${email}`);
    }

    // Check if the provided password is correct
    const result = await client.checkPassword(password);

    // If the password is incorrect, throw an UnauthorizedError
    if (!result) {
        throw new UnauthorizedError("Incorrect Password!");
    }

    // Create a JWT token for the client
    const token = client.createJWT();

    // Send the response with the logged in user information and token
    res.status(StatusCodes.OK).json({
        msg: `${client.username} logged in`,
        user: {
            username: client.username,
            name: client.name,
            email: client.email,
            phoneNumber: client.phoneNumber,
            address: client.address,
            kycVerified: client.kycVerified,
            type: "Client",
        },
        token: token,
        status: true,
    });
};

module.exports = loginClient;
