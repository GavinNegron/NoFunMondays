const { refreshAccessToken } = require("../../utils/auth/refreshAccessToken");
const setTokenCookies = require("../../utils/auth/setTokenCookies");

const refreshToken = async (req, res) => {
  try {
    const { newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp } = await refreshAccessToken(req, res);

    setTokenCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp)

     res.status(200).send({
        status: "success",
        message: "New tokens generated",
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        access_token_exp: newAccessTokenExp,
        refresh_token_exp: newRefreshTokenExp
      });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Failed", message: "Unable to generate new token. Please try again later" })
    }
};

module.exports = { refreshToken }
