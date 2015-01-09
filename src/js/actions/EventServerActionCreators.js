var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

  receiveAll: function(rawEvents) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_EVENTS,
      rawEvents: rawEvents
    });
  },

  receiveUpcoming: function(upcomingEvents) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_UPCOMING_EVENTS,
      upcomingEvents : upcomingEvents
    });
  },


  createdEvent : function(event) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CREATED_EVENT,
      event: event
    });
  },

  joinedEvent : function(event) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.JOINED_EVENT,
      event: event
    });
  },

  leftEvent : function(event) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LEFT_EVENT,
      event: event
    });
  }

};

