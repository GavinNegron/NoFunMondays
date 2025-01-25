const isTokenExpired = require('../utils/auth/isTokenExpired');

const setAuthHeader = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (accessToken || !isTokenExpired(accessToken)) {
      req.headers['authorization'] = `Bearer ${accessToken}`
    }
    next();
  } catch (error) {
    console.error("Error adding access token to header: ", error.message)
  }
}

module.exports = setAuthHeader;