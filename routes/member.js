const express = require("express");
const router = express.Router();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { isSignedIn } = require("./middlewares");
const { verify } = require("../modules/jwt");

const { Member } = require("../models");

/**
 * 회원 정보 조회
 */
router.get("/info", isSignedIn, async (req, res) => {
  try {
    const signedInMember = await Member.findOne({
      where: { member_id: verify(res.locals.token).memberId },
    });

    const signedInMemberInfo = await Member.findByPk(signedInMember.member_id, {
      attributes: [
        "member_id",
        "nickname",
        "profile_image",
        "email",
        "gender",
        "age_range",
        "prefer_travel",
      ],
    });
    return res.status(StatusCodes.OK).json({
      data: signedInMemberInfo,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

/**
 * 회원 정보 수정
 */
router.patch("/info", isSignedIn, async (req, res) => {
  try {
    const modifyInfo = {
      prefer_travel: req.body.prefer_travel,
    };

    await Member.update(modifyInfo, {
      where: { member_id: verify(res.locals.token).memberId },
    });

    return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
  } catch {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
