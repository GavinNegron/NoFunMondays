const User = require("../../models/User");
const bcrypt = require('bcrypt');
const generateTokens = require("../../utils/auth/generateTokens");
const setTokenCookies = require("../../utils/auth/setTokenCookies");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password ) return res.status(400).json({ status: "Failed", message: "All fields are required" });

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ status: "Failed", message: "Invalid email or password" });

    if (!user.is_verified) return res.status(401).json({ status: "Failed", message: "Your account is not verified" });

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(401).json({ status: "Failed", message: "Invalid email or password" });

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);

    try {
      setTokenCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp)
    } catch(error) {
      return res.status(500).json({ status: "Failed", message: "Error setting cookies" })
    }

    res.status(200).json({
      user: { id: user._id, email: user.email, username: user.username },
      roles: user.roles[0],
      status: "Success",
      message: "Login Successful",
      access_token: accessToken,
      refresh_token: refreshToken,
      access_token_exp: accessTokenExp,
      refresh_token_exp: refreshTokenExp,
      is_auth: true
    })

  } catch (error) {
    res.status(500).json({ status: "Failed", message: "Unable to login, please try again later" } );
  }
};

module.exports = { userLogin }