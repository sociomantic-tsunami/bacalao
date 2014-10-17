var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

  loggedInAPI : function(user) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGGED_IN_API,
      user : user
    });

  }

};

