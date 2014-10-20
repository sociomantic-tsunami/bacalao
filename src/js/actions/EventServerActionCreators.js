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


  createdEvent : function(event) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CREATED_EVENT,
      event: event
    });

  }

};

