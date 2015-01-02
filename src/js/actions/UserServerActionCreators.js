var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/Constants'),
    ActionTypes = Constants.ActionTypes;


module.exports = {

  gotUserInfo : function(user) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.GOT_USER_INFO,
      user : user
    });
  }

};

