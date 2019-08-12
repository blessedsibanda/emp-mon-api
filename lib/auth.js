const passport = require("passport");
const passportJwt = require("passport-jwt");

const User = require("../models/User");
const config = require("../config/config");

const params = {
  secretOrKey: config.JWT_SECRET,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
};

const strategy = new passportJwt.Strategy(params, (payload, done) => {
  User.findById(payload.id)
    .then(user => {
      if (user) {
        return done(null, {
          _id: user._id,
          email: user.email,
          name: user.name
        });
      }
      return done(null, false);
    })
    .catch(err => {
      return done(err, null);
    });
});

module.exports = () => passport.use(strategy);
