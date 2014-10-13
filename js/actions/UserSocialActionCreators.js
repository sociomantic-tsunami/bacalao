var AppDispatcher = require('../dispatcher/AppDispatcher'),
    UserApiUtils = require('../utils/UserApiUtils'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

  loggedInFB : function(user) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGGED_IN_FB,
      user : user
    });

    UserApiUtils.login(user);
  }

};

