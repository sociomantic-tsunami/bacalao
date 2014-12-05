var UserServerActionCreators = require('../actions/UserServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');


module.exports = {

  logout: function() {
    request
      .del(Constants.Endpoints.LOGOUT)
      .on('error', function(err) {
        console.error('API Logout Error', err);
      })
      .end(function() {
        UserServerActionCreators.loggedOutAPI();
      });
  }

};
