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

  getUpcomingEvents: function(){
    request
      .get(Endpoints.UPCOMING)
      .type('json')
      .send()
      .on('error', function(err) {
        console.error('API error', err);
      })
      .end(function(res) {
        _.defer(EventServerActionCreators.receiveUpcoming, res.body);
      });
  },


  createEvent: function(event) {
    if(event.venue && event.venue.geometry) {
      event.venue.geometry.location = {
        lat: event.venue.geometry.location.lat(),
        long: event.venue.geometry.location.lng()
      };
    }

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
    var url = Endpoints.JOIN_EVENT;

    url = url.replace('[eventId]', eventId);
    url = url.replace('[userId]', userId);

    request
      .put(url)
      .type('json')
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

    var url = Endpoints.LEAVE_EVENT;

    url = url.replace('[eventId]', eventId);
    url = url.replace('[userId]', userId);

    request
      .del(url)
      .type('json')
      .on('error', function(err) {
        console.error('API Error', err);
      })
      .end(function(res) {
        EventServerActionCreators.leftEvent(res.body);
      });
  }

};
