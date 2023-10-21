const { StatusCodes } = require("http-status-codes");
const Contract = require("../../models/contract");
const { BadRequestError, InternalServerError } = require("../../errors");

/**
 * Accepts a contract request.
 * 
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @throws {BadRequestError} - If required credentials are missing or if the user is not a contractor.
 * @throws {BadRequestError} - If contractor is not found.
 * @throws {InternalServerError} - If unable to accept the contract.
 */
const acceptContract = async (req, res) => {
    // Extract clientId and contractId from the request body
    const { clientId, contractId } = req.body;

    // Extract userId and userType from the user object in the request
    const { userId, userType } = req.user;

    // Check if required credentials are missing or if the user is not a contractor
    if (!clientId || !contractId || userType != "contractor") {
        throw new BadRequestError("Please provide all required credentials.");
    }

    // Find the contractor using the userId
    const contractor = await Contractor.findById(userId);

    // Throw error if contractor is not found
    if (!contractor) {
        throw new BadRequestError("Contractor not found.");
    }

    // Update the contract status to "Pending"
    const contract = await Contract.findOneAndUpdate(
        {
            contractId,
            contractorId: userId,
            clientId,
        },
        { status: "Pending" },
        {
            new: true,
        }
    );

    // Throw error if unable to accept the contract
    if (!contract) {
        throw new InternalServerError("Unable to accept contract.");
    }

    // Return success response
    res.status(StatusCodes.OK).json({
        msg: "Contract talks accepted successfully.",
        status: true,
    });
};

module.exports = acceptContract;
