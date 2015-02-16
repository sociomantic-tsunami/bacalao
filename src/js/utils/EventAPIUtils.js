var EventServerActionCreators = require('../actions/EventServerActionCreators');
var Constants = require('../constants/Constants');
var SocketUtils = require('./SocketUtils');
var Endpoints = Constants.Endpoints;
var request = require('superagent');
var _ = require('underscore');
var Q = require('q');



module.exports = {

  getAllEvents: function() {
    var deferred = Q.defer();
    request
      .get(Endpoints.EVENTS)
      .type('json')
      .send()
      .end(function(err, res) {
        err = err || res.error;
        if(err) {
          console.error('API Error', err);
          return deferred.reject(new Error(err));
        }
        deferred.resolve(res.body);
        _.defer(EventServerActionCreators.receiveAll, res.body);
      });
  },

  getUpcomingEvents: function() {
    var deferred = Q.defer();

    request
      .get(Endpoints.UPCOMING)
      .type('json')
      .send()
      .end(function(err, res) {
        err = err || res.error;
        if(err) {
          console.error('API Error', err);
          return deferred.reject(new Error(err));
        }
        deferred.resolve(res.body);
        _.defer(EventServerActionCreators.receiveUpcoming, res.body);
      });
  },


  createEvent: function(event) {
    var deferred = Q.defer();
    if(event.venue && event.venue.geometry) {
      event.venue.geometry.location = {
        lat: event.venue.geometry.location.lat(),
        long: event.venue.geometry.location.lng()
      };
    }

    request
      .post(Endpoints.EVENT)
      .type('json')
      .set('X-Socket-ID', SocketUtils.getSocketId())
      .send(event)
      .end(function(err, res) {
        err = err || res.error;
        if(err) {
          console.error('API Error', err);
          return deferred.reject(new Error(err));
        }
        deferred.resolve(res.body);
        EventServerActionCreators.createdEvent(res.body);
      });
  },


  deleteEvent: function(eventId) {
    var deferred = Q.defer();
    var url = Endpoints.DELETE_EVENT.replace('[eventId]', eventId);

    request
      .del(url)
      .set('X-Socket-ID', SocketUtils.getSocketId())
      .end(function(err, res) {
        err = err || res.error;
        if(err) {
          console.error('API Error', err);
          return deferred.reject(new Error(err));
        }
        deferred.resolve(res.body);
        EventServerActionCreators.deletedEvent(res.body);
      });
  },


  joinEvent: function(eventId, userId) {
    if(!eventId || !userId) {
      console.error('invalid eventId/userId');
    }
    var deferred = Q.defer();
    var url = Endpoints.JOIN_EVENT;
    url = url.replace('[eventId]', eventId);
    url = url.replace('[userId]', userId);

    request
      .put(url)
      .type('json')
      .set('X-Socket-ID', SocketUtils.getSocketId())
      .end(function(err, res) {
        err = err || res.error;
        if(err) {
          console.error('API Error', err);
          return deferred.reject(new Error(err));
        }
        deferred.resolve(res.body);
        EventServerActionCreators.joinedEvent(res.body);
      });
  },


  leaveEvent: function(eventId, userId) {
    if(!eventId || !userId) {
      console.error('invalid eventId/userId');
    }
    var deferred = Q.defer();
    var url = Endpoints.LEAVE_EVENT;

    url = url.replace('[eventId]', eventId);
    url = url.replace('[userId]', userId);

    request
      .del(url)
      .type('json')
      .set('X-Socket-ID', SocketUtils.getSocketId())
      .end(function(err, res) {
        err = err || res.error;
        if(err) {
          console.error('API Error', err);
          return deferred.reject(new Error(err));
        }
        deferred.resolve(res.body);
        EventServerActionCreators.leftEvent(res.body);
      });
  }

};
