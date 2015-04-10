var User = require('../models/user.model');
var _ = require('underscore');
var Boom = require('boom');

module.exports = {


  getUser: function(request, reply) {
    var _id = request.auth.credentials._id;
    var fields = '_id firstName lastName gender picture email service serviceUserId';
    User.findOne({ _id : _id }, fields).lean().exec(function(err, user) {
      user._id = user._id.toString();
      return reply(user);
    });
  },

  updateUserLocation: function(request, reply) {
    var _id = request.auth.credentials._id;

    User.update(
      { _id: _id },
      { location: request.payload },
      function(err, numberAffected) {
        if(err || numberAffected === 0) {
          return reply(Boom.badImplementation(err));
        }

        return reply();
      });
  },


  logout: function(request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
  },

  oauthHandler: function(request, reply) {
    if (!request.auth.isAuthenticated) {
      reply.statusCode = 401;
      return reply('Login Failed');
    }

    var credentials = request.auth.credentials;

    var conditions = {
      service: credentials.provider,
      serviceUserId: credentials.profile.id
    };

    var toSave = {
      firstName: credentials.profile.name.first,
      lastName: credentials.profile.name.last,
      middleName: credentials.profile.name.middle,
      gender: credentials.profile.gender,
      email: credentials.profile.email,
      service: credentials.provider,
      serviceUserId: credentials.profile.id,
      accessToken: credentials.token,
      created: new Date()
    };

    if(conditions.service === 'facebook') {
      toSave.picture =  'http://graph.facebook.com/'+ credentials.profile.id + '/picture';
    } else if (conditions.service === 'yammer') {
      toSave.networkId =  credentials.profile.raw.network_id;
      toSave.picture =  credentials.profile.raw.mugshot_url_template
        .replace('{width}', '400').replace('{height}', '400');

    }


    User.findOne(conditions, function(err, oldUser) {
      if(err) {
        throw err;
      }

      if(oldUser) {
        // User has alredy registered
          request.auth.session.set({
              _id: oldUser._id
          });
        return reply.redirect('/app');
      } else {
        new User(toSave).save(function(err, newUser) {
          if(err) {
            throw err;
          }

            request.auth.session.set({
                _id: newUser._id
            });
          return reply.redirect('/app');
        });
      }
    });
    }
};
