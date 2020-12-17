const express = require("express");
const indexController = require("../controllers/index");

const router = express.Router();

router.get("/", indexController.getLogin);

router.post("/",indexController.postLogin);

router.get("/verifyotp",indexController.getVerifyOtp);

router.post("/verifyotp",indexController.postVerifyOtp);

router.get("/vote",indexController.getVotePage);

router.get("/faceverify",indexController.getFaceVerify);

router.post("/faceverify",indexController.postFaceVerification);

module.exports = router;
