// var UserServerActionCreators = require('../actions/UserServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');


module.exports = {


  createEvent: function(event) {
    request
      .post(Constants.Endpoints.EVENT)
      .type('json')
      // .set('Accept', 'application/json')
      .send(event)
      .on('error', function(err) {
        console.error('API Login Error', err);
      })
      .end(function(res) {
        console.log(res.body);
        // UserServerActionCreators.loggedInAPI(res.body)
      });
  }

};
