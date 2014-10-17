var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

    createEvent: function(event) {
        AppDispatcher.handleViewAction({
          type: ActionTypes.CREATE_LUNCH,
          time: event.time,
          venue: event.venue,
          maxAttendees: event.maxAttendees
        });
    }


};

