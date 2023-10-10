const { UnauthorizedError } = require("../errors");
const User = require("../models/user");
const Contractor = require("../models/contractor");

const isKYCVerifiedUser = async (req, res, next) => {
    const userId = req.user.userId;

    const verified = await User.findById(userId, "kycVerified");

    if (!verified.kycVerified) {
        throw new UnauthorizedError("User is not KYC Verified");
    }
    next();
};

const isKYCVerifiedContractor = async (req, res, next) => {
    const userId = req.user.userId;

    const verified = await Contractor.findById(userId, "kycVerified");

    if (!verified.kycVerified) {
        throw new UnauthorizedError("User is not KYC Verified");
    }
    next();
};

module.exports = { isKYCVerifiedContractor, isKYCVerifiedUser };
