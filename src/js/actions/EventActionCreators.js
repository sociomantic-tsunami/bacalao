var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventAPIUtils = require('../utils/EventAPIUtils');
var UserStore = require('../stores/UserStore');

module.exports = {

  joinEvent : function(eventId) {
    AppDispatcher.handleViewAction({
      type: "JOIN_EVENT",
      eventId: eventId
    });
    EventAPIUtils.joinEvent(eventId, UserStore.getUserId());
  },

  leaveEvent : function(eventId) {
    AppDispatcher.handleViewAction({
      type: "LEAVE_EVENT",
      eventId: eventId
    });
    // TODO - send to API with EventAPIUtils
    EventAPIUtils.leaveEvent(eventId, UserStore.getUserId());
  },
};

