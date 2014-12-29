var mongoose = require('mongoose');
var Bell = require('bell');
var config = require('../../config.json');
var User = mongoose.model('User');
var AuthCookie = require('hapi-auth-cookie');
var _ = require('underscore');

module.exports = function(server) {
  // inspired by https://github.com/jaw187/hapi-auth/blob/master/bell.js
  server.register([AuthCookie, Bell], function(err) {
    server.auth.strategy('facebook', 'bell', {
      provider: 'facebook',
      password: config.cookieSecret,
      clientId: config.facebookAppId,
      clientSecret: config.facebookAppSecret,
      isSecure: false
    });

    server.auth.strategy('session', 'cookie', {
      password: config.cookieSecret,
      cookie: config.cookieKey,
      redirectTo: '/',
      isSecure: false
    });

  });


  server.route({
    method: ['GET'],
    path: '/auth/facebook',
    config: {
      auth: 'facebook',
      handler: function(request, reply) {
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
          picture: 'http://graph.facebook.com/'+ credentials.profile.id + '/picture',
          accessToken: credentials.token,
          created: new Date()
        };


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
            var newUser = new User(toSave).save(function(err, newUser) {
            if(err) {
              throw err;
              }

            // User has alredy registered
              request.auth.session.set({
                  _id: newUser._id
              });
            return reply.redirect('/app');
          });
          }
        });


      }
    }
  });
};
