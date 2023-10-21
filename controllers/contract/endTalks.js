const { StatusCodes } = require("http-status-codes");
const Contract = require("../../models/contract");
const { BadRequestError, InternalServerError } = require("../../errors");

/**
 * Ends the contract talks between a contractor and a client.
 * Throws an error if the required credentials are not provided or if the client or contractor is not found.
 * Throws an error if the contract cannot be ended.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message and status.
 */
const endTalks = async (req, res) => {
    const { contractorId, clientId, contractId } = req.body;
    const { userId, userType } = req.user;

    // Check if the required credentials are provided
    if ((!contractorId && !clientId) || !contractId) {
        throw new BadRequestError("Please provide all required credentials.");
    }

    // Check if the user is a client
    if (userType === "client") {
        // Find the client
        const client = await Client.findById(userId);
        if (!client) {
            throw new BadRequestError("Client not found.");
        }

        // End the contract
        const contract = await Contract.findOneAndRemove({
            contractId,
            clientId: userId,
            contractorId,
        });

        // Check if the contract was found and ended
        if (!contract) {
            throw new InternalServerError("Unable to end contract.");
        }
    } else {
        // Find the contractor
        const contractor = await Contractor.findById(userId);
        if (!contractor) {
            throw new BadRequestError("Contractor not found.");
        }

        // End the contract
        const contract = await Contract.findOneAndRemove({
            contractId,
            contractorId: userId,
            clientId,
        });

        // Check if the contract was found and ended
        if (!contract) {
            throw new InternalServerError("Unable to end contract.");
        }
    }

    // Return success response
    res.status(StatusCodes.OK).json({
        msg: "Contract talks ended successfully.",
        status: true,
    });
};

module.exports = endTalks;
