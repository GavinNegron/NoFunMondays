const User = require("../models//User");
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY
}

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload._id }).select('-password');
      if (user) return done(null, user);

      return done(null, false);
    } catch (error) {
        return done(err, false);
    }
}));