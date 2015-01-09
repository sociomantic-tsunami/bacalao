var UserServerActionCreators = require('../actions/UserServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');


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
  },

  updateUserLocation: function(location) {

    request
      .put(Constants.Endpoints.UPDATE_LOCATION)
      .type('json')
      .send(location)
      .on('error', function(err) {
        console.error('API Error', err);
      })
      .end(function(res) {
        // probably not needed...
        // UserServerActionCreators.updatedUserLocation()
      });
  }
};
