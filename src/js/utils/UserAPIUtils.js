var UserServerActionCreators = require('../actions/UserServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');


module.exports = {


  login: function(user) {

    request
      .post(Constants.Endpoints.LOGIN)
      .type('json')
      .set('Accept', 'application/json')
      .send(user)
      .on('error', function(err) {
        console.error('API Login Error', err);
      })
      .end(function(res) {
        UserServerActionCreators.loggedInAPI(res.body)
      });
  },


  logout: function() {
    request
      .del(Constants.Endpoints.LOGOUT)
      .on('error', function(err) {
        console.error('API Logout Error', err);
      })
      .end(function() {
        UserServerActionCreators.loggedOutAPI()
      });
  }

};
