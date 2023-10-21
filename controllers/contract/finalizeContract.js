const { StatusCodes } = require("http-status-codes");
const Contract = require("../../models/contract");
const { BadRequestError, InternalServerError } = require("../../errors");

/**
 * Finalizes a contract by updating its status to "Accepted".
 * Throws an error if any required credentials are missing or if the client is not found.
 * Throws an error if the contract cannot be updated.
 * Returns a JSON response indicating the success of the operation.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the contractorId and contractId.
 * @param {Object} req.user - The user object containing the userId and userType.
 * @param {Object} res - The response object.
 * @returns {Object} - The JSON response.
 */
const finalizeContract = async (req, res) => {
    // Extract the contractorId and contractId from the request body
    const { contractorId, contractId } = req.body;
    // Extract the userId and userType from the user object in the request
    const { userId, userType } = req.user;

    // Check if any required credentials are missing or if the user is not a client
    if (!contractorId || !contractId || userType != "client") {
        throw new BadRequestError("Please provide all required credentials.");
    }

    // Find the client by their userId
    const client = await Client.findById(userId);
    // Throw an error if the client is not found
    if (!client) {
        throw new BadRequestError("Client not found.");
    }

    // Find and update the contract with the specified contractId, clientId, and contractorId
    // Set the status to "Accepted" and return the updated contract
    const contract = await Contract.findByIdAndUpdate(
        {
            contractId,
            clientId: userId,
            contractorId,
        },
        { status: "Accepted" },
        {
            new: true,
        }
    );

    // Throw an error if the contract cannot be updated
    if (!contract) {
        throw new InternalServerError("Unable to finalize contract.");
    }

    // Return a JSON response indicating the success of the operation
    res.status(StatusCodes.OK).json({
        msg: "Contract talks finalized successfully.",
        result: true,
    });
};

module.exports = finalizeContract;
