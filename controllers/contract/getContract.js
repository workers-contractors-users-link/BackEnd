const { StatusCodes } = require("http-status-codes");
const Contract = require("../../models/contract");
const Client = require("../../models/client");
const Contractor = require("../../models/contractor");
const { BadRequestError } = require("../../errors");

/**
 * Retrieves contracts based on user type and user ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {BadRequestError} If the user is not found or no contracts are found.
 */
const getContract = async (req, res) => {
    const { userId, userType } = req.user;

    let contracts;

    // Check if user is a client
    if (userType === "client") {
        const client = await Client.findById(userId);
        if (!client) {
            throw new BadRequestError("Client not found.");
        }

        // Retrieve contracts for the client
        contracts = await Contract.find(
            { clientId: userId },
            "contractId, level, title, category, description, locality, budget, expectedStartDate, status"
        );

        // Throw an error if no contracts are found
        if (contracts.length === 0) {
            throw new BadRequestError("No contracts found.");
        }

        // Update each contract with contractor details
        for (const contract of contracts) {
            const contractorInTalks = await Contractor.findById(
                contract.contractorId
            );
            contract.contractorAddress = contractorInTalks.address;
            contract.contractorPhoneNumber = contractorInTalks.phoneNumber;
            contract.contractorEmail = contractorInTalks.email;
            contract.contractorLevel = contractorInTalks.level;
            contract.contractorScore = contractorInTalks.score;
        }
    } else {
        const contractor = await Contractor.findById(userId);
        if (!contractor) {
            throw new BadRequestError("Contractor not found.");
        }

        // Retrieve contracts for the contractor
        contracts = await Contract.find(
            { contractorId: userId },
            "clientId, level, title, category, description, locality, budget, expectedStartDate, status"
        );

        // Throw an error if no contracts are found
        if (contracts.length === 0) {
            throw new BadRequestError("No contracts found.");
        }

        // Update each contract with client details
        for (const contract of contracts) {
            const clientInTalks = await Client.findById(contract.clientId);
            contract.clientAddress = clientInTalks.address;
            contract.clientPhoneNumber = clientInTalks.phoneNumber;
            contract.clientEmail = clientInTalks.email;
        }
    }

    // Return the contracts
    res.status(StatusCodes.OK).json({
        msg: "Contracts fetched successfully",
        contracts,
    });
};

module.exports = getContract;
