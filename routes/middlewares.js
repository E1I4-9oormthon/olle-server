const axios = require("axios");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

exports.getAccessTokenFromKakao = async (req, res, next) => {
  try {
    const code = req.query.code;

    const fetchedData = await axios.post(
      `${process.env.KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${process.env.KAKAO_OAUTH_GRANT_TYPE}&client_id=${process.env.KAKAO_OAUTH_CLIENT_ID}&redirect_uri=${process.env.KAKAO_OAUTH_REDIRECT_URL}&code=${code}`,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    res.locals.accessToken = fetchedData.data.access_token;
    next();
  } catch {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
