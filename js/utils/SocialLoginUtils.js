var hello = require('../../bower_components/hello/dist/hello.all.min');
var UserServerActionCreators = require('../actions/UserServerActionCreators');
var _ = require('underscore');



module.exports = {

    init: function() {
        hello.init({
            facebook : 365680463596953
        });

        hello.on('auth.login', function(auth){

            //firstName lastName middleName gender email picture service accessToken tokenExpiration
            var user = {
                service: auth.network,
                accessToken: auth.authResponse.access_token,
                tokenExpiration: auth.authResponse.expires
            };
            // call user information, for the given network
            hello( auth.network ).api( '/me' ).then( function(r){
                _(user).extend({
                    serviceUserId: r.id,
                    email: r.email,
                    firstName: r.first_name,
                    middleName: r.middle_name,
                    lastName: r.last_name,
                    gender: r.gender,
                    picture: r.picture
                });
                UserServerActionCreators.loggedIn(user)
            });
        });
    },

    loginFB: function() {
        hello('facebook').login();
    }
};
