const { StatusCodes } = require("http-status-codes");
const Client = require("../../models/client");
const { BadRequestError } = require("../../errors");

/**
 * Sign up a client.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the sign up is complete.
 * @throws {BadRequestError} - If any required credentials are missing.
 * @throws {BadRequestError} - If a client with the same email or username already exists.
 * @throws {InternalServerError} - If unable to create a client.
 */
const signUpClient = async (req, res) => {
    // Destructure the required credentials from the request body
    const {
        username,
        name,
        email,
        password,
        phoneNumber,
        address,
        ethAddress,
    } = req.body;

    // Check if any required credential is missing
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

    // Check if a client with the same email or username already exists
    const existingClient = await Client.findOne({
        $or: [{ email }, { username }],
    });

    if (existingClient) {
        throw new BadRequestError(
            "Client with the same email or username already exists."
        );
    }

    // Create a new client with the given credentials
    const client = await Client.create({ ...req.body });

    // Check if client creation was successful
    if (!client) {
        throw new InternalServerError("Unable to create a client.");
    }

    // Send a response indicating successful sign up
    res.status(StatusCodes.OK).json({
        msg: `Client, ${client.name} signed up`,
        result: true,
    });
};

module.exports = signUpClient;
