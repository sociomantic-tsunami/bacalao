var Q = require('q'),
    config = require('../../config.json'),
    restify = require('restify'),
    _ = require('underscore');

var sessionUtils = {


    isUserMatchingSession: function(req, userId) {
        var user = this.getSessionUser(req);

        return user.userId === userId;
    },

    // Get session object from the req object
    //
    // @param req   object  request object from restify
    //
    // @return user session object
    getSessionUser: function(req) {
        return req[config.cookieKey] && req[config.cookieKey].user;
    },

    // Create session for a given user object
    //
    // @param req   object  request object from restify
    // @param user  object  user object
    createSession: function(req, user) {
        if(!_.isObject(user)) {
            throw new Exception('Pass an object with user info to create a session');
        }

        if(!user._id) {
            throw new Exception('An _id property is required in the user object when creating a session');
        }
        // req[config.cookieKey].user = _.clone(user);
        req[config.cookieKey].user = { userId : user._id };
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
