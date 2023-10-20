const { StatusCodes } = require("http-status-codes");
const Client = require("../../models/client");
const { BadRequestError } = require("../../errors");

const signUpClient = async (req, res) => {
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

    const existingClient = await Client.findOne({
        $or: [{ email }, { username }],
    });

    if (existingClient) {
        throw new BadRequestError(
            "Client with the same email or username already exists."
        );
    }

    const client = await Client.create({ ...req.body });

    if (!client) {
        throw new InternalServerError("Unable to create a client.");
    }

    res.status(StatusCodes.OK).json({
        msg: `Client, ${clientname} signed up`,
    });
};

module.exports = signUpClient;
