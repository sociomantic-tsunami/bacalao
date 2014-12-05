var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = mongoose.model('User');


module.exports = function (passport, config) {


  var facebookCallback = function facebookCallback(accessToken, refreshToken, profile, done) {
    var conditions = {
      service: 'facebook',
      serviceUserId: profile.id
    };

    var toSave = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      middleName: profile.name.middleName,
      gender: profile.gender,
      email: profile && profile.emails && profile.emails[0].value,
      service: 'facebook',
      serviceUserId: profile.id,
      accessToken: accessToken,
      updated: new Date()
    };


    User.findOne(conditions, function(err, oldUser) {
      if(oldUser) {
        // User has alredy registered
        done(null, oldUser);
      } else {
        var newUser = new User(toSave).save(function(err, newUser) {
          if(err) {
            // TODO who's gonna catch this guy?
            throw err;
          }
          done(null, newUser);
        });
      }
    });
  };


  passport.serializeUser(function(user, done) {
    done(null, { _id : user._id });
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new FacebookStrategy({
      clientID: config.facebookAppId,
      clientSecret: config.facebookAppSecret,
      callbackURL: "http://bacalao.io:" + config.port + "/auth/facebook/callback"
    }, facebookCallback));


};
