var Q = require('q'),
    request = require('superagent'),
    config = require('../../config.json');

module.exports = {
    validateToken : function(userToken) {
        var deferred = Q.defer();

        request
            .get('https://graph.facebook.com/debug_token')
            .query({ access_token: config.facebookAppToken })
            .query({ input_token:  userToken })
            .accept('json')
            .end(function(res) {
                if(res.ok && res.body && res.body.data.is_valid) {
                    deferred.resolve(res.body)
                } else {
                    console.log(res);
                    deferred.reject(new Error('Cannot validate token'));
                }
            });

        return deferred.promise;
    }
};
