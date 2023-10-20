const { StatusCodes } = require("http-status-codes");
const Contract = require("../../models/contract");
const { BadRequestError, InternalServerError } = require("../../errors");

const endTalks = async (req, res) => {
    const { contractorId, clientId, contractId } = req.body;
    const { userId, userType } = req.user;

    if ((!contractorId && !clientId) || !contractId) {
        throw new BadRequestError("Please provide all required credentials.");
    }

    if (userType === "client") {
        const client = await Client.findById(userId);
        if (!client) {
            throw new BadRequestError("Client not found.");
        }
        const contract = await Contract.findOneAndRemove({
            contractId,
            clientId: userId,
            contractorId,
        });

        if (!contract) {
            throw new InternalServerError("Unable to end contract.");
        }
    } else {
        const contractor = await Contractor.findById(userId);
        if (!contractor) {
            throw new BadRequestError("Contractor not found.");
        }

        const contract = await Contract.findOneAndRemove({
            contractId,
            contractorId: userId,
            clientId,
        });
        if (!contract) {
            throw new InternalServerError("Unable to end contract.");
        }
    }

    res.status(StatusCodes.OK).json({
        msg: "Contract talks ended successfully.",
    });
};

module.exports = endTalks;
