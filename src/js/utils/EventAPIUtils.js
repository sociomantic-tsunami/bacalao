var EventServerActionCreators = require('../actions/EventServerActionCreators');
var Constants = require('../constants/Constants');
var request = require('superagent');


module.exports = {


  createEvent: function(event) {
    var sessionId = sessionStorage.getItem('sessionId') || 'debugSession';

    request
      .post(Constants.Endpoints.EVENT)
      .type('json')
      .set('sessionid', sessionId)
      .send(event)
      .on('error', function(err) {
        console.error('API Login Error', err);
      })
      .end(function(res) {
        EventServerActionCreators.createdEvent(res.body)
      });
  }

};
