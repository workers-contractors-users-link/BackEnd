const { StatusCodes } = require("http-status-codes");
const Contract = require("../../models/contract");
const { BadRequestError } = require("../../errors");

const proceedWithContract = async (req, res) => {
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

    expectedStartDate = new Date(expectedStartDate);

    const newContract = await Contract.create({
        ...req.body,
    });

    if (!newContract) {
        throw new BadRequestError("Something went wrong.");
    }

    res.status(StatusCodes.CREATED).json({
        msg: "Contract talks proceeded successfully.",
        newContract,
    });
};

module.exports = proceedWithContract;
