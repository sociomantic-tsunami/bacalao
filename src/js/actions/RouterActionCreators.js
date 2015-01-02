var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;

module.exports = {

  routeChange : function(routerState) {
    // console.log(routerState);

    AppDispatcher.handleViewAction({
      type: ActionTypes.ROUTE_CHANGE,
      routerState: routerState
    });

  }
};

