const express = require("express");
const router = express.Router();
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { sign } = require("../modules/jwt");
const {
  getAccessTokenFromKakao,
  getUserDataFromKakao,
} = require("./middlewares");

const { Member, Olle, Apply } = require("../models");

router.get(
  "/kakao/signin/callback",
  getAccessTokenFromKakao,
  getUserDataFromKakao,
  async (req, res) => {
    try {
      const accordMember = await Member.findOne({
        where: { member_id: res.locals.userDataFromKakao.member_id },
      });

      const memberId = {
        memberId: res.locals.userDataFromKakao.member_id,
      };

      const token = sign(memberId);

      res.setHeader(
        "Set-Cookie",
        `token=${token}; Path=/; HttpOnly; SameSite=none; secure=true;`
      );

      if (accordMember && accordMember.prefer_travel > 0) {
        return res
          .status(StatusCodes.OK)
          .redirect(process.env.KAKAO_OAUTH_AFTER_SIGN_IN_URL);
      }

      if (!accordMember) {
        const newMember = {
          ...res.locals.userDataFromKakao,
          prefer_travel: 0,
        };
        await Member.create(newMember);
      }
      return res
        .status(StatusCodes.OK)
        .redirect(process.env.KAKAO_OAUTH_AFTER_SIGN_IN_URL_NO_PREFER_TRAVEL);
    } catch {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .redirect(process.env.FRONT_URL);
    }
  }
);

module.exports = router;
