var User = require('../models/user.model');
var _ = require('underscore');
var Mongoose = require('mongoose');
var Q = require('q');

module.exports = {


  getUser: function(request, reply) {
    var _id = request.auth.credentials._id;
    var fields = '_id firstName lastName gender picture email service serviceUserId';
    User.findOne({ _id : _id }, fields).lean().exec(function(err, user) {
      return reply(user);
    });
  },

  logout: function(request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
  }


};
