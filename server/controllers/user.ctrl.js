var User = require('../models/user.model');
var _ = require('underscore');
var Mongoose = require('mongoose');
var errors = require('restify').errors;
var authValidator = require('../utils/authValidator');
var sessionUtils = require('../utils/sessionUtils');
var Q = require('q');

module.exports = {

  facebookCallback: function(accessToken, refreshToken, profile, done) {
    console.log('--- facebookCallback ---');
    var conditions = {
      service: 'facebook',
      serviceUserId: profile.id
    };

    var toSave = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      middleName: profile.name.middleName,
      gender: profile.gender,
      email: profile.emails[0].value,
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
  },

  // login handler
  //
  // picks the fields from the
  login : function (req, res, next) {
    var fields = '_id firstName lastName middleName gender email picture service serviceUserId accessToken tokenExpiration'.split(' ');
    var paramsToSave = _.pick(req.params, fields);
    paramsToSave.tokenExpiration = new Date(paramsToSave.tokenExpiration * 1000);
    paramsToSave.updated = new Date();

    authValidator.validateToken(paramsToSave.accessToken)
      .then(function() {
        if(!paramsToSave._id && !paramsToSave.serviceUserId ) {
          req.log.error('A serviceUserId or _id must be supplied');
          return next(new errors.BadRequestError('A serviceUserId or _id must be supplied'));

        }
        // TODO - does it make sense to use _id - a user could spoof someone else's _id with a valid token
        var conditions = (paramsToSave._id) ? { _id : paramsToSave._id } : { serviceUserId : paramsToSave.serviceUserId };
        paramsToSave.updated = new Date();
        return User.findOneAndUpdate(conditions, _.omit(paramsToSave,'_id'), { upsert : true }).exec();
        // same as Q.nfcall(User.update,...) with context binding
        // https://github.com/kriskowal/q#adapting-node
        // return Q.ninvoke(User, 'update', conditions, paramsToSave, { upsert : true });
      }, function(err) {
        req.log.error(err);
        return next(new errors.NotAuthorizedError('invalid accessToken'));
      })
      .then(function(user) {
        if(user) {
          req.log.info('Created/Updated User _id:' + user._id );
          sessionUtils.createSession(req, user);
          res.send({ _id: user._id, serviceUserId: user.serviceUserId });
        }
        return next();
      }, function(err) {
        req.log.error(err);
        return next(new errors.InternalError);
      });

  },

  // delete the session cookie
  logout: function(req, res, next) {
    sessionUtils.removeSession(req);
    res.send(200);
    next();
  },

  addReference: function(req, res, next) {
    //user to add referance to: req.params.eventId
    //user adding referance(in session) : req.session.SOMETHING

  }


}
