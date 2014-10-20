var Q = require('q'),
    config = require('../../config.json'),
    restify = require('restify'),
    _ = require('underscore');

var sessionValidator = {
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
            if(sessionId === 'debugSession') {
                deferred.resolve();
            } else {
                deferred.reject('Invalid session');
            }
        });

        return deferred.promise;
    }
};

_.bindAll(sessionValidator, 'checkSession')


module.exports = sessionValidator;
