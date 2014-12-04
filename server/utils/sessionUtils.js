var config = require('../../config.json');
var restify = require('restify');
var _ = require('underscore');

var sessionUtils = {


    isUserMatchingSession: function(req, userId) {
        var user = this.getSessionUser(req);

        return user._id === userId;
    },

    // Get session object from the req object
    //
    // @param req   object  request object from restify
    //
    // @return user session object
    getSessionUser: function(req) {
        return req.session &&
                req.session.passport &&
                req.session.passport.user;
    },

    // Delete the session cookie
    removeSession: function(req) {
      req[config.cookieKey].reset();
    },

    checkSession: function(req, res, next) {
        if(req[config.cookieKey] && req[config.cookieKey].user && req[config.cookieKey].user.userId) {
            return next();
        }

        return next(new restify.errors.UnauthorizedError('no session'));
    }

};

_.bindAll(sessionUtils, 'isUserMatchingSession');


module.exports = sessionUtils;
