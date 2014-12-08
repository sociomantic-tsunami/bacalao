var User = require('../models/user.model');
var _ = require('underscore');
var Mongoose = require('mongoose');
var errors = require('restify').errors;
var Q = require('q');

module.exports = {


  getUser: function(req, res, next) {
    var _id = req.session && req.session.passport && req.session.passport.user && req.session.passport.user._id;
    if(!_id) {
        return next(new errors.UnauthorizedError('Please Login'));
    }
    var fields = '_id firstName lastName gender email service serviceUserId';
    User.findOne({ _id : _id }, fields, function(err, user) {
      res.json(user);
      next();
    });
  },

  // delete the session cookie
  logout: function(req, res, next) {
    req.logout();
    res.send(200);
  }


};
