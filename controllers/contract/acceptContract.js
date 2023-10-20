const { StatusCodes } = require("http-status-codes");
const Contract = require("../../models/contract");
const { BadRequestError, InternalServerError } = require("../../errors");

const acceptContract = async (req, res) => {
    const { clientId, contractId } = req.body;
    const { userId, userType } = req.user;

    if (!clientId || !contractId || userType != "contractor") {
        throw new BadRequestError("Please provide all required credentials.");
    }

    const contractor = await Contractor.findById(userId);
    if (!contractor) {
        throw new BadRequestError("Contractor not found.");
    }

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
    if (!contract) {
        throw new InternalServerError("Unable to accept contract.");
    }

    res.status(StatusCodes.OK).json({
        msg: "Contract talks accepted successfully.",
    });
};

module.exports = acceptContract;
