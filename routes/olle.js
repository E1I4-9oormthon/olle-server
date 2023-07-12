const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { verify } = require("../modules/jwt");
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
      prefer_gender: req.body.prefer_gender,
      start_date: req.body.start_date,
      course: req.body.course,
      route: req.body.route,
      contact: req.body.contact,
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

/**
 * 제안서 목록 조회
 */
router.get("/", async (req, res) => {
  try {
    const { start, count } = req.query;
    const olleList = await Olle.findAll({
      order: [["createdAt", "DESC"]],
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("applies.apply_id")),
            "applies_count",
          ],
        ],
      },
      include: [
        {
          model: Member,
          as: "olle_writer",
          attributes: ["member_id", "nickname", "profile_image_url"],
        },
        {
          model: Apply,
          attributes: [],
        },
      ],
      offset: start ? Number(start) : null,
      limit: count ? Number(count) : null,
      subQuery: false,
      group: ["olle_id"],
    });
    return res.status(StatusCodes.OK).json({
      data: olleList,
    });
  } catch {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
