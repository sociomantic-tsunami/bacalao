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


  deleteEvent: function(eventId) {
    var url = Endpoints.DELETE_EVENT.replace('[eventId]', eventId);

    request
      .del(url)
      .on('error', function(err) {
        console.error('API Error', err);
      })
      .end(function(res) {
        // EventServerActionCreators.deletedEvent(res.body);
      });
  },


  joinEvent: function(eventId, userId) {
    if(!eventId || !userId) {
      console.error('invalid eventId/userId');
    }
    var url = Endpoints.JOIN_EVENT.replace('[eventId]', eventId);

    request
      .put(url)
      .type('json')
      .send({userId : userId})
      .on('error', function(err) {
        console.error('API Error', err);
      })
      .end(function(res) {
        EventServerActionCreators.joinedEvent(res.body);
      });
  },


  leaveEvent: function(eventId, userId) {
    if(!eventId || !userId) {
      console.error('invalid eventId/userId');
    }
    var url = Endpoints.JOIN_EVENT.replace('[eventId]', eventId);


    request
      .del(url)
      .type('json')
      .send({userId : userId})
      .on('error', function(err) {
        console.error('API Error', err);
      })
      .end(function(res) {
        EventServerActionCreators.leftEvent(res.body);
      });
  }

};
