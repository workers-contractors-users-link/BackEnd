const loginContractor = require("./contractor/login");
const signUpContractor = require("./contractor/signup");
const loginClient = require("./client/login");
const signUpClient = require("./client/signup");
const { setKycVerified } = require("./utility");
const acceptContract = require("./contract/acceptContract");
const confirmContract = require("./contract/confirmContracts");
const endTalks = require("./contract/endTalks");
const finalizeContract = require("./contract/finalizeContract");
const getContract = require("./contract/getContract");
const proceedWithContract = require("./contract/proceed");

module.exports = {
    loginContractor,
    signUpContractor,
    loginClient,
    signUpClient,
    setKycVerified,
    acceptContract,
    confirmContract,
    endTalks,
    finalizeContract,
    getContract,
    proceedWithContract,
};
