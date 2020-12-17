const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/admin/register",adminController.getRegister);

router.post("/admin/register",adminController.postRegister);

module.exports = router;