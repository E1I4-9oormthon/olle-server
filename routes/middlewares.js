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

exports.getUserDataFromKakao = async (req, res, next) => {
  try {
    const fetchedData = await axios.get(
      `${process.env.KAKAO_API_URL}/v2/user/me`,
      {
        headers: {
          Authorization: `Bearer ${res.locals.accessToken}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    res.locals.userDataFromKakao = {
      id: fetchedData.data.id,
      nickname: fetchedData.data.kakao_account.profile.nickname,
      profile_image: fetchedData.data.kakao_account.profile.profile_image_url,
      email: fetchedData.data.kakao_account.email,
      gender: fetchedData.data.kakao_account.gender || null,
      age_range: fetchedData.data.kakao_account.age_range || null,
    };
    next();
  } catch {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
