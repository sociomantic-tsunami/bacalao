var EventServerActionCreators = require('../actions/EventServerActionCreators');
    Constants = require('../constants/Constants'),
    request = require('superagent'),
    _ = require('underscore');



module.exports = {

  getAllEvents: function() {
    request
      .get(Constants.Endpoints.EVENTS)
      .type('json')
      .send()
      .on('error', function(err) {
        console.error('API Login Error', err);
      })
      .end(function(res) {
        _.defer(EventServerActionCreators.receiveAll, res.body);
      });
  },


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
