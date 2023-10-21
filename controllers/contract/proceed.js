const { StatusCodes } = require("http-status-codes");
const Contract = require("../../models/contract");
const { BadRequestError } = require("../../errors");

/**
 * Proceeds with the contract by creating a new contract entry in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the contract is created.
 * @throws {BadRequestError} - If any required credential is missing.
 * @throws {BadRequestError} - If something goes wrong during contract creation.
 */
const proceedWithContract = async (req, res) => {
    // Extract required data from request body
    const {
        clientId,
        contractorId,
        contractId,
        level,
        title,
        category,
        description,
        locality,
        budget,
        expectedStartDate,
    } = req.body;

    // Check if any required credential is missing
    if (
        !clientId ||
        !contractorId ||
        !contractId ||
        !level ||
        !title ||
        !category ||
        !description ||
        !locality ||
        !budget ||
        !expectedStartDate
    ) {
        throw new BadRequestError("Please provide all required credentials.");
    }

    // Convert expected start date to Date object
    expectedStartDate = new Date(expectedStartDate);

    // Create new contract entry in the database
    const newContract = await Contract.create({
        ...req.body,
    });

    // Check if contract creation was successful
    if (!newContract) {
        throw new BadRequestError("Something went wrong.");
    }

    // Send response with success message and new contract details
    res.status(StatusCodes.CREATED).json({
        msg: "Contract talks proceeded successfully.",
        newContract,
        status: true,
    });
};

module.exports = proceedWithContract;
