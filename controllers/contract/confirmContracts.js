const { StatusCodes } = require("http-status-codes");
const Contract = require("../../models/contract");
const { BadRequestError, InternalServerError } = require("../../errors");

/**
 * Confirm a contract by updating its status to "Working".
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.clientId - The client ID.
 * @param {string} req.body.contractId - The contract ID.
 * @param {Object} req.user - The user object.
 * @param {string} req.user.userId - The user ID.
 * @param {string} req.user.userType - The user type.
 * @param {Object} res - The response object.
 *
 * @throws {BadRequestError} - If required credentials are not provided.
 * @throws {BadRequestError} - If contractor is not found.
 * @throws {InternalServerError} - If contract cannot be accepted.
 */
const confirmContract = async (req, res) => {
    const { clientId, contractId } = req.body;
    const { userId, userType } = req.user;

    // Check if all required credentials are provided
    if (!clientId || !contractId || userType !== "contractor") {
        throw new BadRequestError("Please provide all required credentials.");
    }

    // Find the contractor by user ID
    const contractor = await Contractor.findById(userId);
    if (!contractor) {
        throw new BadRequestError("Contractor not found.");
    }

    // Update the contract status to "Working"
    const contract = await Contract.findOneAndUpdate(
        {
            contractId,
            contractorId: userId,
            clientId,
        },
        { status: "Working" },
        {
            new: true,
        }
    );
    if (!contract) {
        throw new InternalServerError("Unable to accept contract.");
    }

    // Return success response
    res.status(StatusCodes.OK).json({
        msg: "Contract talks accepted successfully.",
        result: true,
    });
};

module.exports = confirmContract;
