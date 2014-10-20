var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

  createdEvent : function(event) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CREATED_EVENT,
      event: event
    });

  }

};

