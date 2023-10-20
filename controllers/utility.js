const { StatusCodes } = require("http-status-codes");
const Client = require("../models/client");
const Constructor = require("../models/contractor");
const { InternalServerError } = require("../errors");

const setKycVerified = async (req, res) => {
    const { userId, userType } = req.user;

    let user;
    if (userType === "client") {
        user = await Client.findByIdAndUpdate(
            userId,
            {
                kycVerified: true,
            },
            {
                new: true,
            }
        );
    } else {
        user = await Constructor.findByIdAndUpdate(
            userId,
            {
                kycVerified: true,
            },
            {
                new: true,
            }
        );
    }

    if (!user) {
        throw new InternalServerError("Unable to set kycVerified");
    }

    res.status(StatusCodes.OK).json({
        msg: "Kyc verified successfully",
    });
};

module.exports = { setKycVerified };
