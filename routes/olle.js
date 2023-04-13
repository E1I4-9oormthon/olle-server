const express = require("express");
const router = express.Router();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { isSignedIn } = require("./middlewares");
const { Member, Olle, Apply } = require("../models");

/**
 * 제안서 생성
 */
router.post("/", isSignedIn, async (req, res) => {
  try {
    const signedinId = verify(res.locals.token).memberId;

    const ollePostWriter = await Member.findOne({
      where: { member_id: signedinId },
    });

    const ollePost = {
      title: req.body.title,
      prefer_gender: req.body.contents,
      start_date: postWriter.member_idx,
      course: postWriter.member_idx,
      contact: postWriter.member_idx,
      member_id: ollePostWriter.member_id,
    };

    await Olle.create(ollePost);
    return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
  } catch {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
