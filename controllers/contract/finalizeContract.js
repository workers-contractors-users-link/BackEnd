const { StatusCodes } = require("http-status-codes");
const Contract = require("../../models/contract");
const { BadRequestError, InternalServerError } = require("../../errors");

const finalizeContract = async (req, res) => {
    const { contractorId, contractId } = req.body;
    const { userId, userType } = req.user;

    if (!contractorId || !contractId || userType != "client") {
        throw new BadRequestError("Please provide all required credentials.");
    }

    const client = await Client.findById(userId);
    if (!client) {
        throw new BadRequestError("Client not found.");
    }
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

    if (!contract) {
        throw new InternalServerError("Unable to finalized contract.");
    }

    res.status(StatusCodes.OK).json({
        msg: "Contract talks finalized successfully.",
    });
};

module.exports = finalizeContract;
