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
        if(res.unauthorized) {
          // redirect to landing page if unauthorized
          Backbone.history.navigate("", {trigger: true, replace: true});
          return;
        }

        UserServerActionCreators.gotUserInfo(res.body);
      });
  },


  logout: function() {
    request
      .del(Constants.Endpoints.LOGOUT)
      .on('error', function(err) {
        console.error('API Logout Error', err);
      })
      .end(function() {
        Backbone.history.navigate("", {trigger: true, replace: true});
        UserServerActionCreators.loggedOutAPI();
      });
  }

};
