var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

  loggedInAPI : function(user) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGGED_IN_API,
      user : user
    });
  },


  loggedOutAPI : function() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGGED_OUT_API
    });
  }

};

