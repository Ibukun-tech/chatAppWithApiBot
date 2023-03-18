const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const {
  getAllText,
  getCode,
  assistAi,
} = require("../controller/OpenAiController");
const { Router } = require("express");

dotenv.config();

const router = Router();

router.route("/text").post(getAllText);
router.route("/code").post(getCode);
router.route("/assist").post(assistAi);
module.exports = router;
