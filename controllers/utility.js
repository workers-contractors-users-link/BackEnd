const { StatusCodes } = require("http-status-codes");
const Client = require("../models/client");
const Constructor = require("../models/contractor");
const { InternalServerError } = require("../errors");

/**
 * Set KYC verified for a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when KYC verification is set.
 */
const setKycVerified = async (req, res) => {
    const { userId, userType } = req.user;

    let user;

    // Find and update user based on userType
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

    // Throw an error if user is not found
    if (!user) {
        throw new InternalServerError("Unable to set kycVerified");
    }

    // Return success response
    res.status(StatusCodes.OK).json({
        msg: "Kyc verified successfully",
        result: true,
    });
};

module.exports = { setKycVerified };
