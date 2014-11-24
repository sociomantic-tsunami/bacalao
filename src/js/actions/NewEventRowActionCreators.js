var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes,
    EventsStore = require('../stores/EventsStore'),
    EventAPIUtils = require('../utils/EventAPIUtils');

module.exports = {

    createEvent: function(event) {
        AppDispatcher.handleViewAction({
          type: ActionTypes.CREATE_EVENT,
          event: event
        });

        EventAPIUtils.createEvent(EventsStore.getFirstForSaving());
    }


};

