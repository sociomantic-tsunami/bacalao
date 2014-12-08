var EventServerActionCreators = require('../actions/EventServerActionCreators');
var Constants = require('../constants/Constants');
var Endpoints = Constants.Endpoints;
var request = require('superagent');
var _ = require('underscore');



module.exports = {

  getAllEvents: function() {
    request
      .get(Endpoints.EVENTS)
      .type('json')
      .send()
      .on('error', function(err) {
        console.error('API Error', err);
      })
      .end(function(res) {
        _.defer(EventServerActionCreators.receiveAll, res.body);
      });
  },


  createEvent: function(event) {

    request
      .post(Endpoints.EVENT)
      .type('json')
      .send(event)
      .on('error', function(err) {
        console.error('API Error', err);
      })
      .end(function(res) {
        EventServerActionCreators.createdEvent(res.body);
      });
  },


  joinEvent: function(eventId, userId) {
    var url = Endpoints.JOIN_EVENT.replace('[eventId]', eventId);

    request
      .put(url)
      .type('json')
      .send({userId : userId})
      .on('error', function(err) {
        console.error('API Error', err);
      })
      .end(function(res) {
        // EventServerActionCreators.createdEvent(res.body)
      });
  },


  leaveEvent: function(eventId, userId) {
    var url = Endpoints.JOIN_EVENT.replace('[eventId]', eventId);

    request
      .del(url)
      .type('json')
      .send({userId : userId})
      .on('error', function(err) {
        console.error('API Error', err);
      })
      .end(function(res) {
        // EventServerActionCreators.createdEvent(res.body)
      });
  }

};
