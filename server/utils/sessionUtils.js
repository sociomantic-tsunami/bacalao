var Q = require('q'),
    config = require('../../config.json'),
    restify = require('restify'),
    _ = require('underscore');



var _sessions = {};

var sessionUtils = {

    // Create session for a given user object
    // @param user  object  user object
    //
    createSession: function(user) {
        if(!_.isObject(user)) {
            throw new Exception('Pass an object with user info to create a session');
        }

        if(!user._id) {
            throw new Exception('An _id property is required in the user object when creating a session');
        }

    },

    checkSession: function(req, res, next) {
        if(!req.headers.sessionid) {
            return next(new restify.errors.UnauthorizedError('no sessionid'));
        }

        this.validateSession(req.headers.sessionid)
            .then(function() {
                return next();
            },function(error) {
                return next(new restify.errors.UnauthorizedError(error));
            });
    },

    validateSession : function(sessionId) {
        var deferred = Q.defer();


        // simulate async request...
        process.nextTick(function() {
            // TODO remove this in PRODUCTION
            if(sessionId === 'debugSession') {
                deferred.resolve();
            } else {
                deferred.reject('Invalid session');
            }
        });

        return deferred.promise;
    }
};

_.bindAll(sessionUtils, 'checkSession')


module.exports = sessionUtils;
