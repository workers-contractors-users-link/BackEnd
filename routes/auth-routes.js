const express = require("express");
const {
    loginContractor,
    signUpContractor,
    loginClient,
    signUpClient,
} = require("../controllers");
const router = express.Router();

router.route("/contractor/login").post(loginContractor);
router.route("/contractor/signup").post(signUpContractor);

router.route("/client/login").post(loginClient);
router.route("/client/signup").post(signUpClient);

module.exports = router;
