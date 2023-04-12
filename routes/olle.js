const express = require("express");
const router = express.Router();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const { Member, Olle, Apply } = require("../models");

/**
 * 제안서 생성
 */
router.post("/", async (req, res) => {});

module.exports = router;
