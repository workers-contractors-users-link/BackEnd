const express = require("express");
const {
    loginContractor,
    signUpContractor,
    loginUser,
    signUpUser,
} = require("../controllers");
const router = express.Router();

router.route("/contractor/login").post(loginContractor);
router.route("/contractor/signup").post(signUpContractor);

router.route("/user/login").post(loginUser);
router.route("/user/signup").post(signUpUser);

module.exports = router;
