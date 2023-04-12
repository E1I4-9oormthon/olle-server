const axios = require("axios");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { verify } = require("../modules/jwt");

exports.getAccessTokenFromKakao = async (req, res, next) => {
  try {
    const code = req.query.code;

    const fetchedData = await axios.post(
      `${process.env.KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${process.env.KAKAO_OAUTH_GRANT_TYPE}&client_id=${process.env.KAKAO_OAUTH_CLIENT_ID}&redirect_uri=${process.env.KAKAO_OAUTH_REDIRECT_URL}&code=${code}`,
      {},
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    res.locals.accessToken = fetchedData.data.access_token;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "카카오 API로부터 엑세스 토큰을 가져오는 중 오류가 발생하였습니다."
      );
  }
};

exports.getUserDataFromKakao = async (req, res, next) => {
  const convertGender = (fetchedGender) => {
    switch (fetchedGender) {
      case "female":
        return 1;
      case "male":
        return 2;
      default:
        return 0;
    }
  };

  const convertAgeRange = (fetchedAgeRange) => {
    return fetchedAgeRange.split("~")[0];
  };

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
      member_id: fetchedData.data.id,
      nickname: fetchedData.data.kakao_account.profile.nickname,
      profile_image: fetchedData.data.kakao_account.profile.profile_image_url,
      email: fetchedData.data.kakao_account.email,
      gender: 0,
      age_range: 0,
    };

    if (fetchedData.data.kakao_account.gender) {
      res.locals.userDataFromKakao.gender = convertGender(
        fetchedData.data.kakao_account.gender
      );
    }

    if (fetchedData.data.kakao_account.age_range) {
      res.locals.userDataFromKakao.age_range = convertAgeRange(
        fetchedData.data.kakao_account.age_range
      );
    }

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(
        "카카오 API로부터 사용자 정보를 가져오는 중 오류가 발생하였습니다."
      );
  }
};

exports.isSignedIn = async (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1];
    try {
      verify(token, process.env.JWT_SECRET_KEY);
      res.locals.token = token;
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED);
    }
  } catch {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
