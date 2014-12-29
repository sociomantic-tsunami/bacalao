var UserServerActionCreators = require('../actions/UserServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');
var Backbone = require('backbone');


module.exports = {

  getUserInfo: function() {
    request
      .get(Constants.Endpoints.ME)
      .on('error', function(err) {
        console.error('API Error', err);
      })
      .end(function(res) {
        UserServerActionCreators.gotUserInfo(res.body);
      });
  }
};
