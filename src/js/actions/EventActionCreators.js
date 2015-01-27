var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventAPIUtils = require('../utils/EventAPIUtils');
var UserStore = require('../stores/UserStore');
var EventsStore = require('../stores/EventsStore');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;

module.exports = {

  joinEvent : function(eventId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.JOIN_EVENT,
      eventId: eventId
    });
    EventAPIUtils.joinEvent(eventId, UserStore.getUserId());
  },

  leaveEvent : function(eventId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LEAVE_EVENT,
      eventId: eventId
    });
    EventAPIUtils.leaveEvent(eventId, UserStore.getUserId());
  },


  createEvent: function(event) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_EVENT,
      event: event
    });

    EventAPIUtils.createEvent(EventsStore.getLastCreatedForAPI());
  },

  deleteEvent: function(eventId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.DELETE_EVENT,
      eventId: eventId
    });

    EventAPIUtils.deleteEvent(eventId);
  }



};

