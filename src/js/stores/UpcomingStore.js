var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var UserStore = require('./UserStore');

// Array of event ids
var _upcomingEvents = [];


var UpcomingStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  getUpcoming: function() {
    return _upcomingEvents;
  }


});


UpcomingStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_EVENTS:
      break;

    case ActionTypes.RECEIVE_UPCOMING_EVENTS:
      _upcomingEvents = action.upcomingEvents;
      UpcomingStore.emitChange();
      break;

    case ActionTypes.CREATED_EVENT:
      if(action.event.creator._id === UserStore.getUserId()) {
        if(!_.contains(_upcomingEvents, action.event._id)) {
          _upcomingEvents.push(action.event._id);
        }
        UpcomingStore.emitChange();
      }

      break;

    case ActionTypes.CREATE_EVENT:

      break;

    case ActionTypes.JOIN_EVENT:
      break;
    case ActionTypes.LEAVE_EVENT:
      break;

    case ActionTypes.JOINED_EVENT:
      _upcomingEvents.push(action.event.eventId);
      UpcomingStore.emitChange();
      break;


    case ActionTypes.LEFT_EVENT:
      _upcomingEvents = _.without(_upcomingEvents, action.event.eventId);
      UpcomingStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = UpcomingStore;
