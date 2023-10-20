const express = require("express");
const {
    setKycVerified,
    acceptContract,
    confirmContract,
    endTalks,
    finalizeContract,
    getContract,
    proceedWithContract,
} = require("../controllers");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.route("/setKycVerified").post(authMiddleware, setKycVerified);
router.route("/acceptContract").post(authMiddleware, acceptContract);
router.route("/confirmContract").post(authMiddleware, confirmContract);
router.route("/endTalks").post(authMiddleware, endTalks);
router.route("/finalizeContract").post(authMiddleware, finalizeContract);
router.route("/getContract").post(authMiddleware, getContract);
router.route("/proceedWithContract").post(authMiddleware, proceedWithContract);

module.exports = router;
