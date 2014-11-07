var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes,
    OutlineStore = require('../stores/OutlineStore'),
    EventAPIUtils = require('../utils/EventAPIUtils');

module.exports = {

    createEvent: function(event) {
        AppDispatcher.handleViewAction({
          type: ActionTypes.CREATE_EVENT,
          time: event.time,
          details: event.details,
          venue: event.venue,
          maxAttendees: event.maxAttendees
        });

        EventAPIUtils.createEvent(OutlineStore.getFirstForSaving());
    }


};

