var User = require('../models/user.model');
var _ = require('underscore');
var Mongoose = require('mongoose');
var Q = require('q');

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
  }
};
