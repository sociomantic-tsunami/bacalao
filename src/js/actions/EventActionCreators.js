var AppDispatcher = require('../dispatcher/AppDispatcher');
    EventAPIUtils = require('../utils/EventAPIUtils');

module.exports = {

  joinEvent : function(eventId) {
    AppDispatcher.handleViewAction({
      type: "JOIN_EVENT",
      eventId: eventId
    });
    // TODO - send to API with EventAPIUtils
  },

  leaveEvent : function(eventId) {
    AppDispatcher.handleViewAction({
      type: "LEAVE_EVENT",
      eventId: eventId
    });
    // TODO - send to API with EventAPIUtils
  },
};

