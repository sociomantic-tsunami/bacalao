var config = require('../../config.json');
var restify = require('restify');
var _ = require('underscore');

var sessionUtils = {

  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    return next(new errors.UnauthorizedError('Please Login'));
  },

  isUserMatchingSession: function(req, userId) {
      var loggedInId = req.user && req.user._id;

      return loggedInId === userId;
  }

};


module.exports = sessionUtils;
